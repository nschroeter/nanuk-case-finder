import { i18n } from '@lingui/core'

export type Locale = 'en' | 'de' | 'fr' | 'es' | 'it'

export const localeLabels: Record<Locale, string> = {
  en: 'English',
  de: 'Deutsch',
  fr: 'Français',
  es: 'Español',
  it: 'Italiano',
}

export async function loadCatalog(locale: Locale): Promise<void> {
  const { messages } = await import(`./locales/${locale}/messages`)
  i18n.load(locale, messages)
  i18n.activate(locale)
}

export { i18n }
