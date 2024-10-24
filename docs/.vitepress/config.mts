import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Youenn Le Gouedec",
  description: "Tutorials",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      { text: "Examples", link: "/markdown-examples" },
    ],

    sidebar: [
      {
        text: "Examples",
        items: [
          { text: "Markdown Examples", link: "/markdown-examples" },
          { text: "Runtime API Examples", link: "/api-examples" },
        ],
      },
      {
        text: "Laravel",
        items: [
          {
            text: "Deployement",
            items: [
              {
                text: "Deploy Laravel on LAMP",
                link: "/laravel/deployement/deploy-laravel-on-lamp",
              },
            ],
          },
          {
            text: "Tips",
            items: [
              { text: "Laravel Tips", link: "/laravel/tips/laravel-tips" },
              {
                text: "Reverb Websocket on LAMP",
                link: "/laravel/tips/reverb-websocket-on-lamp",
              },
            ],
          },
        ],
      },
      {
        text: "Vue",
        items: [
          { text: "PrimeVue Tips", link: "/vue/primevue-tips" },
          { text: "Vue Tips", link: "/vue/vue-tips" },
        ],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/vuejs/vitepress" },
    ],
  },
});
