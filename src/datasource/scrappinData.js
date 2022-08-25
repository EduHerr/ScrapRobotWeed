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
            await page.goto(Uri + 'strains?page=3');

            //Obtener detalles de todas las weedz => [1 pagina]
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
    const _Weeds = [];
    let Details = {};

    try{
        //
        const obtenerWeedz = async(page) =>{
            let actualUri = await page.evaluate(() => { return window.location.href });

            console.log('Uri visitada: ' +actualUri);

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

            //Iterar los enlaces [weedz] para igresar y extraer data
            for(let enlace of _weedEnlaces)
            {
                //Abrir -details- de cada elemento
                await page.goto(enlace);

                //
                await page.waitForSelector('section.container.mt-xxl');

                page.on("error", function (err) {  
                    theTempValue = err.toString();
                    console.log("Error: " + theTempValue);
                });

                //Extraer data-details-weed
                Details = await page.evaluate(() => {
                    let name = null, type = null, qualification = null, substance = null, topEffect = null, aroma = null, _cannabinoides = null, _Flavors = null, _Feelings = null, _Negatives = null;
                    
                    //Name
                    name = document.querySelector('div.StrainPage_leftHalfSpacing__ClDsd.w-full h1.heading--l.mb-xs');
                    if(name != null){
                        name = name.innerText;
                    }

                    //Type
                    type = document.querySelector('div.StrainPage_leftHalfSpacing__ClDsd.w-full a.mt-sm.mb-md.block');
                    if(type != null){
                        type = type.innerText;
                    }

                    //Qualification
                    qualification = document.querySelector('div.StrainPage_leftHalfSpacing__ClDsd.w-full div.flex.justify-between.mt-sm.items-center span.pr-xs');
                    if(qualification != null){
                        qualification = qualification.innerText;
                    }

                    //Substance
                    substance = document.querySelector('div.text-xs.mb-md.flex.items-center span.ml-sm');
                    if(substance != null){
                        substance = substance.innerText;
                    }


                    /* TopEffect && Aroma */
                    const _TopEffectAndAromaControl = document.querySelectorAll('div.w-full.mt-lg .jsx-482093d89a00ffe3.row.mb-xl a.flex.items-center.p-sm.elevation-low.rounded div.text-xs.font-bold span.block.underline');
                    if(_TopEffectAndAromaControl != null){
                        topEffect = _TopEffectAndAromaControl[0].innerText;
                        aroma = _TopEffectAndAromaControl[1].innerText;
                    }

                    // /* _Cannabinodies */
                    const _CannabinoideControl = document.querySelectorAll('div.text-xs.mb-md.flex.items-center span.text-xs.rounded.flex.items-center.mr-xl');
                    if(_CannabinoideControl != null){
                        //Iterrar CannabinoideControl
                        for(let Cannabinoide of _CannabinoideControl)
                        {
                            _cannabinoides.push(Cannabinoide.innerText);
                        }
                    }

                    /* _Flavors, _Feelings, _Negatives */
                    const _StrainEffectsFlavors = document.querySelectorAll('[id="strain-sensations-section"] div.row.mt-lg div.row [data-testid="icon-tile-link"] [data-testid="item-name"]') || null;

                    if(_StrainEffectsFlavors != null){
                        _Flavors = [], _Feelings = [], _Negatives = [];
                        //Iterar
                        let i=1;
                        for(let Strain of _StrainEffectsFlavors)
                        {
                            //_Feelings
                            if(i >= 1 && i <= 3){
                                _Feelings.push(Strain.innerText);
                            }

                            //_Negatives
                            if(i >= 4 && i <= 6){
                                _Negatives.push(Strain.innerText);
                            }

                            //_Flavors
                            if(i >= 7 && i <= 9){
                                _Flavors.push(Strain.innerText);
                            }

                            i++;
                        }
                    }

                    return { name, type, qualification, substance, topEffect, aroma, _cannabinoides, _Flavors, Effects: { _Feelings, _Negatives } };
                });

                //
                console.log(Details);

                //Guardar objeto en coleccion
                _Weeds.push(Details);
                
                //
                await page.waitForTimeout(5000);
            }

            //Redirigir a la pagina principal-anterior para poder dar siguiente al paginador
            await page.goto(actualUri);
            await page.waitForSelector('.flex.justify-between.my-xl.w-100');

            //Obtener el boton de [Next] del paginador
            const NextButtonPaginator = await page.evaluate(() => { return document.querySelector('[data-testid="next"]').href; });

            //
            if(NextButtonPaginator){
                //Navegar en el paginador hasta que se acabe
                await page.goto(NextButtonPaginator);
                
                //recursividad
                return await obtenerWeedz(page);
            }
        };

        const WeedCollection = await obtenerWeedz(page); 
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