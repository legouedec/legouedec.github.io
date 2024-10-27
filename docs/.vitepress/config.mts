import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  description: "Tutorials",
  lastUpdated: true,

  locales: {
    root: {
      label: "English",
      lang: "en",
      themeConfig: {
        siteTitle: false,
        logo: "/logo.svg",
        // https://vitepress.dev/reference/default-theme-config
        // nav: [{ text: "Home", link: "/" }],
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
            items: [
              {
                text: "Deployment",
                collapsed: true,
                items: [
                  {
                    text: "Deploy Laravel on LAMP",
                    link: "/laravel/deployment/deploy-laravel-on-lamp",
                  },
                  {
                    text: "Deploy on push with Github Webhooks",
                    link: "/laravel/deployment/deploy-on-push-with-github-webhooks",
                  },
                ],
              },
              {
                text: "Websocket",
                collapsed: true,
                items: [
                  {
                    text: "Reverb Websocket on LAMP",
                    link: "/laravel/websocket/reverb-websocket-on-lamp",
                  },
                ],
              },
              {
                text: "Tips",
                collapsed: true,
                items: [
                  {
                    text: "Laravel Tips",
                    link: "/laravel/tips/laravel-tips",
                  },
                ],
              },
            ],
          },
          {
            text: "Server",
            items: [
              {
                text: "Install PhpMyAdmin",
                link: "/server/install-phpmyadmin.md",
              },
              { text: "Run Supervisors", link: "/server/run-supervisors.md" },
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
          {
            icon: "github",
            link: "https://github.com/legouedec/legouedec.github.io",
          },
        ],
      },
    },
    fr: {
      label: "Français",
      lang: "fr",
      themeConfig: {
        siteTitle: false,
        logo: "/logo.svg",
        // nav: [{ text: "Accueil", link: "/" }],
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
            items: [
              {
                text: "Deploiement",
                collapsed: true,
                items: [
                  {
                    text: "Deployer Laravel sur LAMP",
                    link: "/fr/laravel/deployment/deploy-laravel-on-lamp",
                  },
                  {
                    text: "Deployer automatiquement au push avec Github Webhooks",
                    link: "/fr/laravel/deployment/deploy-on-push-with-github-webhooks",
                  },
                ],
              },
              {
                text: "Websocket",
                collapsed: true,
                items: [
                  {
                    text: "Reverb Websocket sur LAMP",
                    link: "/fr/laravel/websocket/reverb-websocket-on-lamp",
                  },
                ],
              },
              {
                text: "Conseils",
                collapsed: true,
                items: [
                  {
                    text: "Conseils",
                    link: "/fr/laravel/tips/laravel-tips",
                  },
                ],
              },
            ],
          },
          {
            text: "Serveur",
            items: [
              {
                text: "Installer PhpMyAdmin",
                link: "/fr/server/install-phpmyadmin.md",
              },
              {
                text: "Executer des Supervisors",
                link: "/fr/server/run-supervisors.md",
              },
            ],
          },
          {
            text: "Vue",
            items: [
              { text: "Conseils PrimeVue", link: "/fr/vue/primevue-tips" },
              { text: "Conseils Vue", link: "/fr/vue/vue-tips" },
            ],
          },
        ],

        socialLinks: [
          {
            icon: "github",
            link: "https://github.com/legouedec/legouedec.github.io",
          },
        ],
      }, // optional, will be added  as `lang` attribute on `html` tag
    },
  },
});
