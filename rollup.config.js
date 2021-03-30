import babel from "@rollup/plugin-babel";
import { terser } from "rollup-plugin-terser";

export default {
  input: "src/index.js",
  output: [
    {
      file: "lib/bundle.js",
      format: "umd",
      name: "canvasPoster",
      sourcemap: true,
    },
    {
      file: "lib/bundle.min.js",
      format: "umd",
      name: "canvasPoster",
      plugins: [terser()],
    },
  ],
  plugins: [babel({ babelHelpers: "bundled" })],
};
