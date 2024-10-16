// rollup.config.js
const babel = require("@rollup/plugin-babel").default;
const resolve = require("@rollup/plugin-node-resolve").default;
const commonjs = require("@rollup/plugin-commonjs");
const terser = require("@rollup/plugin-terser");
const postcss = require("rollup-plugin-postcss");
const pkg = require("./package.json");

console.log(pkg.main, pkg.module);

const plugins = [
  postcss({
    inject: true,
    sourceMap: true,
    minimize: true,
  }),
  babel({
    babelHelpers: "bundled",
    exclude: "node_modules/**",
    extensions: [".js", ".jsx", ".ts", ".tsx"],
    presets: [
      "@babel/preset-env",
      "@babel/preset-react",
      "@babel/preset-typescript",
    ],
  }),
  resolve({
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  }),
  commonjs(),
  terser(),
];

const external = [
  ...Object.keys(pkg.peerDependencies || {}),
  "react",
  "react-dom",
];

module.exports = [
  {
    input: "src/index.tsx",
    output: {
      file: pkg.main,
      format: "cjs",
      sourcemap: true,
      exports: "auto",
    },
    plugins,
    external,
  },
  {
    input: "src/index.tsx",
    output: {
      file: pkg.module,
      format: "esm",
      sourcemap: true,
    },
    plugins,
    external,
  },
];
