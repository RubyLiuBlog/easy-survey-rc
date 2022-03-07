import babel from 'rollup-plugin-babel'
import typescript from '@rollup/plugin-typescript'
import sass from 'rollup-plugin-sass'
import autoprefixer from 'autoprefixer'
import postcss from 'postcss'
import fs from 'fs'

export default {
  input: "./src/index.tsx",
  output: {
    file: "./dist/bundle.js",
    format: "esm"
  },
  external: ["react"],
  plugins:[
    typescript(),
    babel({
      exclude: "node_modules/**"
    }),
    sass({
      output: './dist/bundle.css',
    })
  ]
}