import { createI18n } from 'vue-i18n'
import { ch } from '@/lang/ch'
import { en } from '@/lang/en'
import { fr } from '@/lang/fr'
import { gr } from '@/lang/gr'
import { it } from '@/lang/it'
import { ru } from '@/lang/ru'
import { sp } from '@/lang/sp'
import { getItem } from '@/utils/storage.js'
import { LANGUAGE } from '@/utils/constants'

const setDateTimeFormats = {
  short: {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  },
  long: {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
    hour: 'numeric',
    minute: 'numeric'
  }
}

const dateTimeFormats = {
  en: setDateTimeFormats,
  es: setDateTimeFormats,
  de: setDateTimeFormats,
  'en-GB': setDateTimeFormats
}

export default createI18n({
  locale: getItem(LANGUAGE) ? getItem(LANGUAGE).lang : 'ch',
  fallbackLocale: import.meta.env.VITE_VUE_APP_I18N_FALLBACK_LOCALE || 'en',
  messages: { ch, en, fr, gr, it, ru, sp },
  dateTimeFormats
})
