import fs from 'node:fs/promises'
import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { select } from '@clack/prompts'
import { execa } from 'execa'
import fg from 'fast-glob'

async function startPicker(args: string[]) {
  const packageFiles = (await fg('*/src/package.json', {
    onlyFiles: true,
  })).sort().reverse()

  const folders = await Promise.all(
    packageFiles.map(async file => {
      const folder = dirname(dirname(file))
      const md = await fs.readFile(new URL(`../${folder}/README.md`, import.meta.url), 'utf-8')
      const title = md.match(/^# (.*)/)?.[1].trim() || ''
      return {
        label: title ? `${folder} | ${title}` : folder,
        value: folder,
      } as const
    }),
  )

  const folder: string | symbol | undefined = args.includes('-y')
    ? folders[0]?.value
    : await select({
        message: 'Pick a folder.',
        options: folders,
      })

  args = args.filter(arg => arg !== '-y')

  if (typeof folder === 'string') {
    if (args[0] === 'dev')
      execa('code', [fileURLToPath(new URL(`../${folder}/src/slides.md`, import.meta.url))])
    await execa('pnpm', ['run', ...args], {
      cwd: new URL(`../${folder}/src`, import.meta.url),
      stdio: 'inherit',
    })
  }
}

await startPicker(process.argv.slice(2))
