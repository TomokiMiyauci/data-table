import { readFileSync, writeFileSync } from 'fs-extra'

const filePath = 'dist/index.d.ts'
const content = readFileSync(filePath, {
  encoding: 'utf-8'
})

const re = /.vue/
const index = content.replace(re, '')
writeFileSync(filePath, index, {
  encoding: 'utf-8'
})
