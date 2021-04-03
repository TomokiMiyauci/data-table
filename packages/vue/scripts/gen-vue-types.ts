import { execSync } from 'child_process'
import { mkdirpSync } from 'fs-extra'

mkdirpSync('dist/components')
execSync('yarn vue-dts-gen src/components/*.vue --outDir dist')
