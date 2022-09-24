const fs = require('fs')
const mime = require('mime-types')
const {resolve, dirname} = require("path");
const fetch = require('node-fetch');
const { Transformer } = require('@parcel/plugin');
const { inlineSource } = require('inline-source');

var sourceDir = '';

async function request(url, opts = {method: 'GET'}) {
    const response = await fetch(url);
    return await response.buffer();
}

async function include(url) {
    if (url.match(/(:\/\/)/)) {
        return await request(url);
    }

    return fs.readFileSync(resolve(sourceDir, url));
}

async function replaceAsync(str, regex, asyncFn) {
    const promises = [];
    str.replace(regex, (match, ...args) => {
        const promise = asyncFn(match, ...args);
        promises.push(promise);
    });
    const data = await Promise.all(promises);
    return str.replace(regex, () => data.shift());
}

module.exports = new Transformer({
    async transform({ asset, config, logger, options }) {
        let html = await asset.getCode();
        sourceDir = dirname(asset.filePath);

        html = await replaceAsync(html, /\/\*=>(.+?)\*\//gs, async (match, code) => {
            return eval(code);
        });

        html = await replaceAsync(html, /<!--=>(.+?)-->/gs, async (match, code) => {
            return eval(code);
        });

        asset.setCode(html);

        return [asset];
    }
});