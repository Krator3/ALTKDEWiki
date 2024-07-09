import { defineConfigWithTheme } from 'vitepress'
import { fileURLToPath, URL } from 'node:url'

import { tabsMarkdownPlugin } from 'vitepress-plugin-tabs'
import markdownItKdb from 'markdown-it-kbd'
import markdownItImplicitFigures from 'markdown-it-implicit-figures'

import { nav, sidebar } from './data/navigations'
import { telegram, gitflic, vk } from './data/icons'

import * as config from './config.json'

/* GitLog */
import UnoCSS from 'unocss/vite'
import {
  GitChangelog,
  GitChangelogMarkdownSection
} from '@nolebase/vitepress-plugin-git-changelog/vite'

import {
  gitRepository,
  gitMaxCommits,
  gitDisplay,
  gitRewritePath,
  gitHeadersLocale
} from './data/gitlog'

export default defineConfigWithTheme({
  vite: {
    plugins: [
      UnoCSS(),
      GitChangelog({
        maxGitLogCount: gitMaxCommits,
        repoURL: () => gitRepository,
        rewritePathsBy: gitRewritePath,
      }),
      GitChangelogMarkdownSection({
        getChangelogTitle: (_, __, { helpers }): string => {
          return gitHeadersLocale.history_title
        },
        getContributorsTitle: (_, __, { helpers }): string => {
          return gitHeadersLocale.author_title
        },
        excludes: [],
        exclude: (_, { helpers }): boolean => {
          for (var page of config.nolebase_exclude) {
            if (helpers.idStartsWith(page))
              return true
          }
          return false
        },
        sections: gitDisplay,
      }),
    ],
    ssr: {
      noExternal: [
        '@nolebase/vitepress-plugin-enhanced-readabilities',
        '@nolebase/vitepress-plugin-page-properties',
      ],
    },
    resolve: {
      alias: { '@vitepress/theme': fileURLToPath(new URL('../node_modules/vitepress/dist/client/theme-default', import.meta.url)) }
    }
  },
  title: config.title,
  description: "открытое сообщество пользователей операционной системы ALT Regular KDE",
  titleTemplate: ':title' + config.head.titleSeponator + config.title,
  head: [
    ['link', { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    ['link', { rel: 'icon', type: 'image/png', href: '/favicon.png' }],
    ['meta', { name: 'theme-color', content: config.head.themeColor }],
    ['meta', { name: 'og:type', content: config.head.type }],
    ['meta', { name: 'og:locale', content: config.lang }],
    ['meta', { name: 'og:site_name', content: config.title }],
    ['meta', { name: 'og:image', content: config.host + config.head.ogImage }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:image', content: config.host + config.head.ogImage }],
    ['meta', { name: 'yandex-verification', content: config.yaWebmasterId }]
  ],
  srcDir: './docs',
  cleanUrls: true,
  lang: config.lang,
  sitemap: {
    hostname: 'https://alt-kde.wiki'
  },
  themeConfig: {
    logo: { src: '/logo.png', width: 36, height: 36, alt: "ALT KDE Wiki" },
    socialLinks: [
      {
        icon: {
          svg: telegram
        },
        link: 'https://t.me/alt_kde'
      },
      { icon: 'github', link: 'https://github.com/OlegShchavelev/ALTRegularKDEWiki' }
    ],
    nav: nav,
    sidebar: sidebar,
    search: {
      provider: 'local',
      options: {
        locales: {
          root: {
            translations: {
              button: {
                buttonText: 'Поиск',
                buttonAriaLabel: 'Поиск'
              },
              modal: {
                noResultsText: 'Нет результатов по запросу',
                resetButtonTitle: 'Сбросить',
                footer: {
                  selectText: 'для выбора',
                  navigateText: 'для навигации',
                  closeText: 'закрыть'
                }
              }
            }
          }
        }
      }
    },
    editLink: {
      pattern: 'https://github.com/OlegShchavelev/ALTRegularKDEWiki/edit/main/docs/:path',
      text: 'Предложить изменения на этой странице'
    },
    lastUpdated: {
      text: 'Последнее обновление',
      formatOptions: {
        dateStyle: 'medium',
        timeStyle: 'medium'
      }
    },
    returnToTopLabel: 'Наверх',
    sidebarMenuLabel: 'Меню',
    docFooter: {
      prev: 'Предыдущая страница',
      next: 'Следующая страница'
    },
    darkModeSwitchLabel: 'Тема',
    outlineTitle: 'Оглавление',
    outline: {
      level: [2, 3],
    },
    footer: {
      message: 'Содержание доступно <a href="/licence">по лицензии MIT</a>',
      copyright: `${new Date().getFullYear()} ALT KDE Wiki, разработано на платформе <a href="//vitepress.dev/">VitePress 1.1.4</a>`
    },
    notFound: {
      title: 'Страница не найдена',
      quote: 'Похоже, что вы перешли по неверной или устаревшей ссылке. Вы можете воспользоваться поиском.',
      linkText: 'Вернуться на главную'
    },
    asideMeta: {
      keywords: {
        proprietary: {
          name: 'Проприетарное',
          type: 'danger'
        },
        restrictions: {
          name: 'Региональные ограничения',
          type: 'danger'
        },
        kdedeveloped: {
          name: 'Разработано KDE',
          type: 'tip'
        }
      },
      labels: {
        metadata_license: 'Лицензия',
        homepage: 'Сайт проекта',
        help: 'Помощь',
        translate: 'Помощь в переводе',
        bugtracker: 'Сообщить о проблеме'
      },
      links: {
        sisyphus: {
          anchor: 'Сизиф',
          target: '_blank',
          baseUrl: '//packages.altlinux.org/ru/sisyphus/srpms/',
          style: '--agw-btn-bg: var(--vp-c-yellow-dimm-1); --agw-btn-color: var(--vp-c-yellow-darker); --agw-btn-hover-bg:var(--vp-c-yellow-dark); --agw-btn-hover-color: var(--vp-c-white);'
        },
        flatpak: {
          anchor: 'Flatpak',
          target: '_blank',
          baseUrl: '//flathub.org/apps/',
          style: '--agw-btn-bg: var(--vp-c-blue-dimm-1); --agw-btn-color: var(--vp-c-blue-darker); --agw-btn-hover-bg:var(--vp-c-blue-dark); --agw-btn-hover-color: var(--vp-c-white);'
        },
        snap: {
          anchor: 'Snapcraft',
          target: '_blank',
          baseUrl: '//snapcraft.io/',
          style: '--agw-btn-bg: var(--vp-c-orange-dimm-1); --agw-btn-color: var(--vp-c-orange-darker); --agw-btn-hover-bg:var(--vp-c-orange-dark); --agw-btn-hover-color: var(--vp-c-white);'
        }
      }
    }
  },
  markdown: {
    container: {
      tipLabel: 'Подсказка',
      warningLabel: 'Внимание',
      dangerLabel: 'Осторожно',
      infoLabel: 'Информация',
      detailsLabel: 'Подробнее',
    },
    config(md) {
      md.use(tabsMarkdownPlugin)
      md.use(markdownItKdb)
      md.use(markdownItImplicitFigures, {
        figcaption: 'title',
        copyAttrs: '^class$'
      })
    }
  },
  transformPageData: (pageData) => {

    const canonicalUrl = `https://alt-kde.wiki/${pageData.relativePath}`
      .replace(/index\.md$/, '')
      .replace(/\.md$/, '.html')

    pageData.frontmatter.head ??= []

    pageData.frontmatter.head.push(
      ['link', { rel: 'canonical', href: canonicalUrl }],
      ['meta', { name: 'og:title', content: pageData.title + config.head.titleSeponator + config.title }],
    )
    if (pageData.frontmatter.layout !== 'home') {
      pageData.description = `Cтатья написанная простым языком: «${pageData.title}» для ${config.title}. Последнее обновление ${config.title}: ${ new Date( pageData.lastUpdated ?? new Date()).toLocaleString(config.lang)}`
    }
  }
})
