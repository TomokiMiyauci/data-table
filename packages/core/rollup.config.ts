import typescript from 'rollup-plugin-typescript2'
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
  plugins: [typescript()]
}

export default options
