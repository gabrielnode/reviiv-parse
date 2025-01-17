import { build } from 'esbuild'
import path from 'path'
import { readFileSync } from 'fs'

const getDependencies = () => {
  const packageJsonPath = path.resolve('./package.json')
  const packageJson = readFileSync(packageJsonPath, 'utf-8')
  const parsedPackageJson = JSON.parse(packageJson)
  return Object.keys(parsedPackageJson.dependencies || {})
}

const options = {
  entryPoints: ['./src/index.ts'],
  outdir: 'dist',
  platform: 'node',
  target: 'node20',
  sourcemap: true,
  bundle: true,
  minify: false,
  logLevel: 'info',
  keepNames: true,
  external: getDependencies(),
}

await build(options).catch(error => {
  console.error('esbuild error', error)
  process.exit(1)
})