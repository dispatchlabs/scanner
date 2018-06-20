require('zone.js/dist/zone-node');
require('reflect-metadata');
const core = require('@angular/core');
const express = require('express');
const fs = require('fs');
const {ngExpressEngine} = require('@nguniversal/express-engine');
const {provideModuleMap} = require('@nguniversal/module-map-ngfactory-loader');
const {AppServerModuleNgFactory, LAZY_MODULE_MAP, AppServerModule} = require('./dist/server/main');
const server = express();
const schedule = require('node-schedule');
const winston = require('winston');
const request = require('request');
const environment = AppServerModule.environment;

// Enable production mode?
if (environment.name === 'qa' || environment.name === 'aws') {
    core.enableProdMode();
}

// Booting.
console.log(`Booting ${environment.m2AppName} [configuration=${environment.name}, version=${environment.m2AppVersion}, port=${environment.m2WebProxyPort}]`)

// Setup logging.
if (!fs.existsSync('./logs')) {
    fs.mkdirSync('./logs');
}
const logger = winston.createLogger({
    level: 'info',
    transports: [
        new (winston.transports.Console)(),
        new (winston.transports.File)({filename: './logs/m2.log'})
    ]
});
logger.level = 'info';

// Setup sitemapJob.
const sitemapJob = schedule.scheduleJob('0 */30 * * * *', function () {
    generateSiteMap();
});
generateSiteMap();

// Setup express server.
server.engine('html', ngExpressEngine({
    bootstrap: AppServerModuleNgFactory,
    providers: [
        provideModuleMap(LAZY_MODULE_MAP)
    ]
}));
server.set('views', '.');
server.set('view engine', 'html');
server.use(express.static('./dist/browser', {index: false}));
server.use('*', (req, res) => {
    res.render('./dist/browser/index.html', {req, res});
});
server.listen(environment.m2WebProxyPort, () => {
    console.log('Listening on port ' + environment.m2WebProxyPort);
});

/**
 *
 * @param className
 * @returns {string}
 */
function getUrl(className) {
    var url = environment.m2Url.endsWith('/') ? environment.m2Url : environment.m2Url + '/';
    return url + 'Action?className=' + className + '&appId=' + environment.m2AppId + '&version=' + environment.m2AppVersion;
}

/**
 *
 */
function getWebsiteUrl() {
    return environment.m2WebsiteUrl.endsWith('/') ? environment.m2WebsiteUrl.slice(0, -1) : environment.m2WebsiteUrl;
}

/**
 *
 */
function generateSiteMap() {
    request.post(
        getUrl('m2.action.meta.FindByAppAction'),
        {json: {}},
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                if (body.status !== 'OK') {
                    logger.error(body.humanReadableStatus);
                } else {
                    var urls = [];
                    var sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n';
                    sitemap += '<urlset xmlns="httpClient://www.sitemaps.org/schemas/sitemap/0.9">\n';
                    for (var i = 0; i < body.metas.length; i++) {
                        var url = getWebsiteUrl() + body.metas[i].url;
                        if (url.endsWith('/')) {
                            url = url.slice(0, -1);
                        }
                        if (urls.indexOf(url) != -1) {
                            continue;
                        }
                        urls.push(url);
                        sitemap += '    <url>\n';
                        sitemap += '        <loc>' + url + '</loc>\n';
                        sitemap += '    </url>\n';
                    }
                    sitemap += '</urlset>\n';

                    // Write sitemap.xml.
                    fs.writeFile("./dist/browser/sitemap.xml", sitemap, function (err) {
                        if (err) {
                            logger.error(err);
                            return;
                        }
                        logger.info("sitemap.xml generated.");
                    });
                }
            } else {
                logger.info(environment.m2AppName + ' server is down for maintenance.');
            }
        }
    );
}
