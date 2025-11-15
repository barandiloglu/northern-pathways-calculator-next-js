import { Locale } from './i18n-config'
import enMessages from '@/messages/en.json'
import trMessages from '@/messages/tr.json'

const messages = {
  en: enMessages,
  tr: trMessages,
}

export function getTranslations(locale: Locale) {
  return function t(key: string): string {
    const keys = key.split('.')
    let value: any = messages[locale]
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k]
      } else {
        // Fallback to English if key not found
        value = messages['en']
        for (const fallbackKey of keys) {
          if (value && typeof value === 'object' && fallbackKey in value) {
            value = value[fallbackKey]
          } else {
            return key // Return key if not found in fallback
          }
        }
        return key
      }
    }
    
    return typeof value === 'string' ? value : key
  }
}

export type Translations = ReturnType<typeof getTranslations>
