import { defineConfig } from '@lingui/conf'
import { formatter } from '@lingui/format-po'
import { createBabelExtractor } from '@lingui/cli/api/extractors/babel'

export default defineConfig({
  locales: ['en', 'de', 'fr', 'es', 'it'],
  sourceLocale: 'en',
  catalogs: [
    {
      path: '<rootDir>/src/locales/{locale}/messages',
      include: ['<rootDir>/src'],
    },
  ],
  format: formatter({ lineNumbers: false }),
  extractors: [createBabelExtractor()],
})
