import fs from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import fg from 'fast-glob'

const packageFiles = (await fg('*/src/package.json', {
  onlyFiles: true,
})).sort()

const bases = (await Promise.all(
  packageFiles.map(async file => {
    const talkRoot = dirname(dirname(file))
    const json = JSON.parse(await fs.readFile(file, 'utf-8'))
    const pdfFile = (await fg('*.pdf', {
      cwd: resolve(process.cwd(), talkRoot),
      onlyFiles: true,
    }))[0]

    const command = json.scripts?.build
    if (!command) return

    const base = command.match(/ (\S*)$/)?.[1]
    if (!base) return

    return {
      dir: talkRoot,
      base,
      pdfFile,
    }
  }),
)).filter(Boolean) as {
  dir: string
  base: string
  pdfFile?: string
}[]

const vercelJson = {
  $schema: 'https://openapi.vercel.sh/vercel.json',
  rewrites: [] as Record<string, any>[],
  redirects: [] as Record<string, any>[],
}

bases.forEach(({ base, pdfFile, dir }) => {
  if (pdfFile) {
    vercelJson.redirects.push({
      source: `${base}pdf`,
      destination: `https://github.com/ycs77/talks/blob/main/${dir}/${pdfFile}?raw=true`,
      permanent: false,
    })
    vercelJson.redirects.push({
      source: `/${dir}/pdf`,
      destination: `https://github.com/ycs77/talks/blob/main/${dir}/${pdfFile}?raw=true`,
      permanent: false,
    })
  }

  vercelJson.redirects.push({
    source: `${base}src`,
    destination: `https://github.com/ycs77/talks/tree/main/${dir}`,
    permanent: false,
  })

  vercelJson.rewrites.push({
    source: `${base}(.*)`,
    destination: `${base}index.html`,
  })
})

vercelJson.redirects.push({
  source: '/',
  destination: 'https://star-note-lucas.me/talks',
  permanent: false,
})

const content = JSON.stringify(vercelJson, null, 2)

await fs.writeFile('vercel.json', `${content}\n`, 'utf-8')
