const fs = require('fs')
const mime = require('mime-types')
const {resolve} = require("path");
const fetch = require('node-fetch');

async function request(url, opts = {method: 'GET'}) {
    const response = await fetch(url);
    return await response.buffer();
}

function getContent(url, sourceDir) {
    // load url
    if (url.match(/(:\/\/)/)) {
        return request(url);
    }

    url = resolve(sourceDir, url);

    return fs.readFileSync(url);
}


const { Transformer } = require('@parcel/plugin');
const { inlineSource } = require('inline-source');


module.exports = new Transformer({
    async transform({ asset, config, logger, options }) {
        let html = await asset.getCode();
        console.log(asset.filePath);

        var sourceDir = require('path').dirname(asset.filePath);//console.log(sourceDir);

        if (asset.type == 'html') {
            html = await inlineSource(asset.filePath, {
                rootpath: sourceDir,
                htmlpath: asset.filePath
            });
        }

        html = html.replace(/include\(\"(.+?)\"\);/g, (match, url) => {
            return getContent(url, sourceDir);
        });

        asset.setCode(html);

        return [asset];
    }
});