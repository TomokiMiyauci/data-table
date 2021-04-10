import typescript from 'rollup-plugin-typescript2'
import nodeResolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import { main, module } from './package.json'

/** @type {import('rollup').RollupOptions} */
const options = {
  input: 'src/index.ts',
  output: [
    {
      file: main,
      format: 'umd',
      sourcemap: true,
      name: 'DataTableCore'
    },
    {
      file: module,
      format: 'es',
      sourcemap: true
    }
  ],
  plugins: [
    typescript({
      tsconfigOverride: {
        compilerOptions: {
          declaration: false
        }
      }
    }),
    nodeResolve(),
    commonjs()
  ]
}
export default options
