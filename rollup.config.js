import babel from 'rollup-plugin-babel'

export default {
  input: "./src/index.tsx",
  output: {
    file: "./lib/bundle.js",
    format: "esm"
  },
  plugins:[
    babel(),
  ]
}