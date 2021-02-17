import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import Backend from 'i18next-xhr-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
// not like to use this?
// have a look at the Quick start guide
// for passing in lng and translations on init

i18n
  // load translation using xhr -> see /public/locales (i.e. https://github.com/i18next/react-i18next/tree/master/example/react/public/locales)
  // learn more: https://github.com/i18next/i18next-xhr-backend
  .use(Backend)
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    fallbackLng: 'en',
    lng: 'en',
    whitelist: ['en'],
    ns: 'common',
    backend: {
      loadPath: '/translations/{{lng}}/{{ns}}.json',
    },
    react: {
      wait: true,
      useSuspense: false, // using the react suspense functionality causes issues with the material ui components like tabs and drawers see related issues for reference:
    },
    cache: {
      enabled: true,
      expirationTime: 24 * 60 * 60 * 1000,
    },
  });

export const getCurrentLanguage = () => {
  return i18n.language;
};

export const changeLanguage = (lang) => {
  return i18n.changeLanguage(lang);
};

export default i18n;
