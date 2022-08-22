const puppeteer = require('puppeteer')
const { getRandom } = require('random-useragent');

//@export
const getContenidoPaginaWeb = async(Uri) => {
    try{    
        //Obtenemos usuario/agente virtual [robot]
        const header = iniciarUsuario();
        
        //Puppeteer initialization and configuration
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.setViewport({ width:1920, height:1080 });

        //Simulamos la visita de usuario a pagina, mandando el UserAgent
        await page.setUserAgent(header);

        //Iniciamos visita web 
        await page.goto(Uri);

        //
        await getPaginado(page);

        //
        await browser.close();
    }
    catch(error){
        console.log(error);
    }
}

//@static
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

const getPaginado = async (page) => {
    try{
        await page.waitForSelector('.col');

        const divContent = await page.$$('.jsx-72b23e4c6be41632.row');

        for(const div of divContent){
            const weedNameControl = await div.$('.font-bold.text-sm.mb-xs.underline > span');
            const weedName = await page.evaluate(weedNameControl => weedNameControl.innerText, weedNameControl);

            console.log('WeedName: ' +weedName);
        }
    } 
    catch(error){
        console.error(error);
    }
}

//
module.exports = {
    getContenidoPaginaWeb
};