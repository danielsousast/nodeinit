const i18next = require("i18next");
const i18nextFsBackend = require("i18next-fs-backend");
const i18nextMiddleware = require("i18next-http-middleware");

const setupI18n = (app) => {
  i18next
    .use(i18nextFsBackend)
    .use(i18nextMiddleware.LanguageDetector)
    .init({
      backend: {
        loadPath: "./locales/{{lng}}.json",
      },
      fallbackLng: "en",
      preload: ["en", "pt"],
    });

  app.use(i18nextMiddleware.handle(i18next));
};

module.exports = { setupI18n };
