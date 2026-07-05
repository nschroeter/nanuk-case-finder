import { i18n } from '@lingui/core'
import { messages as en } from './locales/en/messages'
import { messages as de } from './locales/de/messages'
import { messages as fr } from './locales/fr/messages'
import { messages as es } from './locales/es/messages'
import { messages as it } from './locales/it/messages'

export type Locale = 'en' | 'de' | 'fr' | 'es' | 'it'

export const localeLabels: Record<Locale, string> = {
  en: 'English',
  de: 'Deutsch',
  fr: 'Français',
  es: 'Español',
  it: 'Italiano',
}

const catalogs = { en, de, fr, es, it }

export function loadCatalog(locale: Locale): void {
  i18n.load(locale, catalogs[locale])
  i18n.activate(locale)
}

export { i18n }
