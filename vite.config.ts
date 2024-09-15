import dayjs, { locale } from "dayjs";
import { defineConfig } from "vite";
import monkey from "vite-plugin-monkey";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    {
      name: "set-headers",
      apply: "serve",
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          res.setHeader("Access-Control-Allow-Private-Network", "true");
          next();
        });
      },
    },
    monkey({
      entry: "src/main.ts",
      userscript: {
        name: "Display posting time in absolute",
        namespace: "M424",
        version: "0.0.1",
        description: {
          ja: "ポストされた投稿時間を絶対時間(24/01/01(月) 00:00)で表示する",
        },
        author: "M424",
        match: ["*://x.com/*", "*://*.com/i/tweetdeck", "*://misskey.io/*"],
        "run-at": "document-idle",
        grant: "none",
        icon: "https://www.google.com/s2/favicons?sz=64&domain=twitter.com",
        license: "MIT",
        require: [
          "https://cdn.jsdelivr.net/npm/dayjs@1/dayjs.min.js",
          "https://cdn.jsdelivr.net/npm/dayjs@1/locale/ja.js",
        ],
      },
      build: {
        externalGlobals: {
          dayjs: "dayjs",
        },
      },
    }),
  ],
});
