import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationEN from './pages/translation/en/translation.json';
import translationUR from './pages/translation/ur/translation.json';

// the translations
const resources = {
  en: {
    translation: translationEN
  },
  ur: {
    translation: translationUR
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    keySeparator: false,
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;
