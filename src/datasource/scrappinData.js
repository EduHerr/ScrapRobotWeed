const puppeteer = require('puppeteer')
const { getRandom } = require('random-useragent');

//@exports
module.exports.getContenidoPaginaWeb = async(Uri) => {
    try{
        //Obtenemos usuario/agente virtual [robot]
        const header = iniciarUsuario();
        
        //Puppeteer initialization and configuration
        const browser = await puppeteer.launch({ headless: false, defaultViewport: { width:1920, height:1080 } });
        const page = await browser.newPage();

        //Simulamos la visita de usuario a pagina, mandando el UserAgent
        await page.setUserAgent(header);

        //Iniciamos visita web - en pagina principal
        await page.goto(Uri);

        //Brincamos el validador de edad
        const result = await brincarAgeVerification(page);

        //
        if(result === true){
            //Nos dirigimos a la seccion - listado de las especies
            await page.goto(Uri + 'strains');

            //
            await getWeedCollection(page);
        }
        
        //
        await browser.close();
    } 
    catch(e){
        console.error(e);
    }
}

//@static
const getWeedCollection = async(page) => {
    try{
        //
        await page.waitForSelector('#strain-list');

        //Obtener enlaces de cada contenedor
        const _weedEnlaces = await page.evaluate(() => {
            const _WeedContainers = document.querySelectorAll('[data-testid="strain-list__strain-card"] a.p-md');

            const _LinksDetails = [];
            for(let WContainer of _WeedContainers)
            {
                _LinksDetails.push(WContainer.href);
            }
            return _LinksDetails;
        });

        //Iterar los enlaces para igresar y extraer data
        for(let enlace of _weedEnlaces)
        {
            //Abrir -details- de cada elemento
            await page.goto(enlace);

            //
            await page.waitForSelector('section.container.mt-xxl');

            //Extraer data-details-weed
            await page.evaluate(() => {
                const name = document.querySelector('div.StrainPage_leftHalfSpacing__ClDsd.w-full h1.heading--l.mb-xs').innerText;
                const type = document.querySelector('div.StrainPage_leftHalfSpacing__ClDsd.w-full a.mt-sm.mb-md.block').innerText;
                const qualification = document.querySelector('div.StrainPage_leftHalfSpacing__ClDsd.w-full div.flex.justify-between.mt-sm.items-center span.pr-xs').innerText;
                const substance = document.querySelector('div.w-full.lg div.w-full.mt-lg [aria-label="Terpene Information"] span.ml-sm');

                /* _Cannabinodies */
                const _CannabinoideControl = document.querySelectorAll('div.w-full.lg div.w-full.mt-lg span.text-xs.rounded.flex.items-center.mr-xl');

                const _Cannabinoides = [];
                //Iterrar _CannabinoideControl
                for(let Cannabinoide of _CannabinoideControl)
                {
                    _Cannabinoides.push(Cannabinoide.innerText);
                }

                /* TopEffect && Aroma */
                

                /* _Sensations */
                const _FeelingsControl = document.querySelectorAll('[id="strain-sensations-section"] div.row.mt-lg [id="Feelings-tab"] [data-testid="icon-tile-link"]');
                const _NegativeControl = document.querySelectorAll('[id="strain-sensations-section"] div.row.mt-lg [id="Negatives-tab"] [data-testid="icon-tile-link"]');

                const _Feelings = [], _Negatives = [];
                //Iterar _FeelingsControl
                for(let i=0; i<_FeelingsControl.length; i++)
                {
                    _Feelings.push(_FeelingsControl[i].innerText);
                    _Negatives.push(_NegativesControl[i].innerText);
                }

                /* _Flavors */
            });
        }
    }
    catch(e){
        console.error(e);
    }
}

const iniciarUsuario = () => {
    try{
        return getRandom((ub) => { // ub => user-browser
            return ub.browserName === 'Chrome';
        });
    }
    catch(e){
        console.error(e);
    }
}

const brincarAgeVerification = async (page, next) => {
    try{
        //Validamos si nos dirigio al AgeVerification
        await page.waitForSelector('.jsx-99cbbd46e2b47dc9.age-gate-background');

        //
        await page.click('#age-gate-remember');

        //Click to the -Next- button
        await page.click('.button.button--primary.text-sm');
        return true;
    }
    catch(error){
        //Si no nos mando al verificador, seguimos...
        console.log(error);
        next();
    }
}