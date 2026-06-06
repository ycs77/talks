import ycs77 from '@ycs77/eslint-config'

export default ycs77({
  vue: true,
  react: false,
  markdown: false,
  ignores: [
    '**/dist-stale/**',
  ],
})
