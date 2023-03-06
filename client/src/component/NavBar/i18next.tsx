import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import translationEn from '../../../public/assets/locales/en/translationEN.json';
import translationFr from '../../../public/assets/locales/fr/translationFr.json';
import translationCh from '../../../public/assets/locales/ch/translationCh.json';
const resources = {
  en: {
    translation: translationEn
  },
  fr: {
    translation: translationFr
  },
  ch:{
    translation: translationCh
  }
};

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    debug: true,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false // not needed for react as it escapes by default
    },
    detection: {
      order: ['querystring', 'cookie', 'localStorage', 'sessionStorage', 'navigator', 'htmlTag', 'path', 'subdomain'],
      caches: ['cookie']
    },
    react: {
      useSuspense: false
    }
  });

export default i18n;