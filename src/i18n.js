import { createI18n } from 'vue-i18n'
import { ch } from '@/lang/ch'
import { en } from '@/lang/en'
import { fr } from '@/lang/fr'
import { gr } from '@/lang/gr'
import { it } from '@/lang/it'
import { ru } from '@/lang/ru'
import { sp } from '@/lang/sp'

/**
 * Load locale messages
 *
 * The loaded `JSON` locale messages is pre-compiled by `@intlify/vue-i18n-loader`, which is integrated into `vue-cli-plugin-i18n`.
 * See: https://github.com/intlify/vue-i18n-loader#rocket-i18n-resource-pre-compilation
 */
// async function loadLocaleMessages() {
//   // const locales = require.context('./lang', true, /[A-Za-z0-9-_,\s]+\.json$/i);
//   const locales = import.meta.glob(['./lang/**/*.json'])
//   const messages = {}
//   for (const path in locales) {
//     const matched = path.match(/([A-Za-z0-9-_]+)\./i)
//     if (matched && matched.length > 1) {
//       const locale = matched[1]
//       const a = await locales[path]()
//       messages[locale] = a.default
//     }
//   }
//   // locales.keys().forEach((key) => {
//   //   const matched = key.match(/([A-Za-z0-9-_]+)\./i);
//   //   if (matched && matched.length > 1) {
//   //     const locale = matched[1];
//   //     messages[locale] = locales(key);
//   //   }
//   // });
//   return messages
// }

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
  locale: import.meta.env.VITE_VUE_APP_I18N_LOCALE || 'ch',
  fallbackLocale: import.meta.env.VITE_VUE_APP_I18N_FALLBACK_LOCALE || 'en',
  messages: { ch, en, fr, gr, it, ru, sp },
  dateTimeFormats
})
