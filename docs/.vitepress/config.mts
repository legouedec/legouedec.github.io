import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Youenn Le Gouedec",
  description: "Tutorials",
  lastUpdated: true,

  locales: {
    root: {
      label: "English",
      lang: "en",
      themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        nav: [{ text: "Home", link: "/" }],
        editLink: {
          pattern:
            "https://github.com/legouedec/legouedec.github.io/main/docs/:path",
          text: "Edit on GitHub",
        },
        lastUpdated: {
          formatOptions: {
            dateStyle: "short",
            timeStyle: "medium",
          },
        },

        sidebar: [
          {
            text: "Laravel",
            collapsed: true,
            items: [
              {
                text: "Deployement",
                collapsed: true,
                items: [
                  {
                    text: "Deploy Laravel on LAMP",
                    link: "/laravel/deployment/deploy-laravel-on-lamp",
                  },
                ],
              },
              {
                text: "Tips",
                collapsed: true,
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
            collapsed: true,
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
    },
    fr: {
      label: "Français",
      lang: "fr",
      themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        nav: [{ text: "Accueil", link: "/" }],
        lastUpdated: {
          text: "Actualisé le",
          formatOptions: {
            dateStyle: "short",
            timeStyle: "medium",
          },
        },
        docFooter: {
          prev: "Precedent",
          next: "Suivant",
        },
        editLink: {
          pattern:
            "https://github.com/legouedec/legouedec.github.io/tree/main/docs/:path",
          text: "Editer sur GitHub",
        },
        outline: {
          label: "Sommaire",
        },
        langMenuLabel: "Changer de langue",
        returnToTopLabel: "Remonter",
        sidebarMenuLabel: "Menu Lateral",
        darkModeSwitchLabel: "Mode Sombre",
        lightModeSwitchTitle: "Mode Clair",
        darkModeSwitchTitle: "Changer le Mode Sombre",
        sidebar: [
          {
            text: "Laravel",
            collapsed: true,
            items: [
              {
                text: "Deploiement",
                items: [
                  {
                    text: "Déployer Laravel sur LAMP",
                    link: "/fr/laravel/deployment/deploy-laravel-on-lamp",
                  },
                ],
              },
              {
                text: "Conseils",
                collapsed: true,
                items: [
                  { text: "Laravel Tips", link: "/laravel/tips/laravel-tips" },
                  {
                    text: "Reverb Websocket sur LAMP",
                    link: "/fr/laravel/tips/reverb-websocket-on-lamp",
                  },
                ],
              },
            ],
          },
          {
            text: "Vue",
            collapsed: true,
            items: [
              { text: "Conseils PrimeVue", link: "/fr/vue/primevue-tips" },
              { text: "Conseils Vue", link: "/fr/vue/vue-tips" },
            ],
          },
        ],

        socialLinks: [
          { icon: "github", link: "https://github.com/vuejs/vitepress" },
        ],
      }, // optional, will be added  as `lang` attribute on `html` tag
    },
  },
});
