
import corePlugins from 'tailwindcss/lib/corePlugins.js'
import corePluginList from 'tailwindcss/lib/corePluginList.js'
import { getUtilities, replaceCommasWithSemicolons, outputFile } from "./utils.js"
import fs from "fs"
import { consola } from "consola";

const isDev = process.env.NODE_ENV === "dev"
const isSkip = process.env.Skip === "true"
console.log('isSkip: ', isSkip);
const isProd = !isDev
const outputFileName = `dist/${isDev ? "dev-" : ''}utilities.css`
const outFileIsExit = fs.existsSync(outputFileName)
if (outFileIsExit) {
    consola.info(`${outputFileName} is exit, need to del`)
    fs.rmSync(outputFileName)
} else {

}
consola.box("Generate simple tailwindcss utilities");

consola.info(`Build for ${process.env.NODE_ENV}, css file will be generated at ${outputFileName}`)

consola.start("Building css file...");

let outputContent = ''
const list = isDev ? ["translate", "accessibility", "backdropFilter", "flex"] : corePluginList.default
console.log('list: ', list);

if (isSkip) {
    list.forEach(item => {
        let plugin = corePlugins.corePlugins[item]
        const res = getUtilities(plugin)
        for (let key in res) {
            const cssValue = JSON.stringify(res[key])
            outputContent += `${key} ${cssValue.replace(/"/g, ' ').replace(/,/g, ';')};\n`
        }
    })
} else {
    list.forEach(item => {
        let plugin = corePlugins.corePlugins[item]
        const res = getUtilities(plugin)
        for (let key in res) {
            const cssValue = JSON.stringify(res[key])
            outputContent += `${key} ${cssValue.replace(/"/g, ' ').replace(/,/g, ';')};\n`
            // const cssValue = JSON.stringify(res[key])
            // const value = cssValue?.replace(/"/g, ' ')
            // outputContent += `${key} ${replaceCommasWithSemicolons(value)}\n`
        }
    })
}



// fs.writeFileSync(outputFileName, outputContent)
outputFile(outputFileName, outputContent)
consola.success("Done!");

consola.info(`The file location is ${outputFileName}`);