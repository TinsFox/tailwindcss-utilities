import dlv from 'dlv'
import resolveConfig from 'tailwindcss/resolveConfig.js'
import nameClass from 'tailwindcss/lib/util/nameClass.js'
import tailwindDefaultConfig from 'tailwindcss/defaultConfig.js'
import * as fs from "fs"
import path from "path"

const defaultConfig = resolveConfig(tailwindDefaultConfig)

export function getUtilities(plugin, { includeNegativeValues = false } = {}) {

  if (!plugin) return {}
  const utilities = {}
  console.log('utilities: ', utilities);

  function addUtilities(utils) {
    utils = Array.isArray(utils) ? utils : [utils]
    for (let i = 0; i < utils.length; i++) {
      for (let prop in utils[i]) {
        for (let p in utils[i][prop]) {
          if (p.startsWith('@defaults')) {
            delete utils[i][prop][p]
          }
        }
        // console.log('res: ', normalizeProperties(utils[i][prop]));
        utilities[prop] = normalizeProperties(utils[i][prop])
      }
    }
  }

  plugin({
    addBase: () => { },
    addDefaults: () => { },
    addComponents: () => { },
    corePlugins: () => true,
    prefix: (x) => x,
    config: (option, defaultValue) => (option ? defaultValue : { future: {} }),
    addUtilities,
    // theme: () => { },
    theme: (key, defaultValue) => dlv(defaultConfig.theme, key, defaultValue),
    matchUtilities: (matches, { values, supportsNegativeValues } = {}) => {
      console.log('values: ', values);
      if (!values) return

      let modifierValues = Object.entries(values)

      if (includeNegativeValues && supportsNegativeValues) {
        let negativeValues = []
        for (let [key, value] of modifierValues) {
          let negatedValue = negateValue.default(value)
          if (negatedValue) {
            negativeValues.push([`-${key}`, negatedValue])
          }
        }
        modifierValues.push(...negativeValues)
      }

      let result = Object.entries(matches).flatMap(([name, utilityFunction]) => {
        return modifierValues
          .map(([modifier, value]) => {
            let declarations = utilityFunction(value, {
              includeRules(rules) {
                addUtilities(rules)
              },
            })

            if (!declarations) {
              return null
            }

            return {
              [nameClass.default(name, modifier)]: declarations,
            }
          })
          .filter(Boolean)
      })

      for (let obj of result) {
        for (let key in obj) {
          let deleteKey = false
          for (let subkey in obj[key]) {
            if (subkey.startsWith('@defaults')) {
              delete obj[key][subkey]
              continue
            }
            if (subkey.includes('&')) {
              result.push({
                [subkey.replace(/&/g, key)]: obj[key][subkey],
              })
              deleteKey = true
            }
          }

          if (deleteKey) delete obj[key]
        }
      }
      console.log('result: ', result);
      addUtilities(result)

    },
  })
  console.log('end utilities: ', utilities);
  return utilities

}

export function normalizeProperties(input) {
  // console.log('normalizeProperties input: ', input);
  if (typeof input !== 'object') return input
  if (Array.isArray(input)) return input.map(normalizeProperties)
  return Object.keys(input).reduce((newObj, key) => {
    let val = input[key]
    let newVal = typeof val === 'object' ? normalizeProperties(val) : val
    newObj[key.replace(/([a-z])([A-Z])/g, (m, p1, p2) => `${p1}-${p2.toLowerCase()}`)] = newVal
    return newObj
  }, {})
}

export function replaceCommasWithSemicolons(str) {
  let result = '';
  let inParentheses = false;

  for (let i = 0; i < str.length; i++) {
    if (str[i] === '(') {
      inParentheses = true;
    } else if (str[i] === ')') {
      inParentheses = false;
    } else if (str[i] === ',' && !inParentheses) {
      result += ';';
    } else {
      result += str[i];
    }
  }

  return result;
}


export async function outputFile(file, newContents) {
  try {
    let currentContents = await fs.promises.readFile(file, 'utf8')
    if (currentContents === newContents) {
      return // Skip writing the file
    }
  } catch { }

  // Write the file
  await fs.promises.mkdir(path.dirname(file), { recursive: true })
  await fs.promises.writeFile(file, newContents, 'utf8')
}