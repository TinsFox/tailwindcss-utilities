const fs = require('fs');
const postcss = require('postcss');
const path = require("path")
import plugin from "tailwindcss/plugin"
const plugin = require('tailwindcss/plugin');

const styleObject = {
  '.backdrop-filter': {
    'backdrop-filter': 'var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia)'
  },
  '.backdrop-filter-none': { 'backdrop-filter': 'none' }
};

// let plugins = [
//   ...beforePlugins,
//   tailwindPlugin,
//   !args['--minify'] && formatNodes,
//   ...afterPlugins,
//   !args['--no-autoprefixer'] && loadAutoprefixer(),
//   args['--minify'] && loadCssNano(),
// ].filter(Boolean)

// let processor = postcss(plugins)

async function main() {
  const input = await fs.promises.readFile(path.resolve("./input.css"), 'utf8')
  console.log('input: ', input);
  console.log('plugin: ', plugin);
}

main()