module.exports = {
  title: 'Breeze blog',
  base: '/myblog/',
  head: [
    // ['link', { rel: 'icon', href: '/' }]
  ],
  themeConfig: {
    logo: '',
    repo: 'jinjingxuan',
    docsDir: 'docs',
    editLinks: false,
    editLinkText: '在 Github 上帮助我们编辑此页',
    nav: [
      {text: '首页', link: '/'},
      {
        text: '文章分类',
        items: [
          { text: 'css', link: '/css/bfc'},
          { text: 'javascript', link: '/javascript/asynchronous'},
          { text: 'vue', link: '/vue/code-1'},
          { text: 'react', link: '/react/react-1'},
          { text: 'san', link: '/san/san'},
          { text: 'virtual dom', link: '/virtual-dom/virtualdom'},
          { text: 'webpack', link: '/webpack/webpack1'},
          { text: 'typescript', link: '/ts/ts'},
          { text: 'nodejs', link: '/node/node-1'},
          { text: '正则表达式', link: '/regular/regular'},
          { text: '移动端问题', link: '/mobile/adaptation'},
          { text: '算法', link: '/algorithm/array'},
          { text: '设计模式', link: '/design-pattern/design-pattern'},
          { text: '前端路由', link: '/route/route'},
          { text: '前端工程化', link: '/engineering/engineering'},
          { text: '前端安全', link: '/safe/safe'},
          { text: '模块化', link: '/module/module'},
          { text: '面试题', link: '/interview/interview'},
          { text: '浏览器', link: '/chrome/gc'},
          { text: '计算机基础', link: '/computer/computer'},
          { text: '代码规范', link: '/code-style/code-style'},
          { text: '常用工具', link: '/tool/tool'},
        ]
      }
    ],
    lastUpdated: '最后更新时间',
    sidebarDepth: 3,
    sidebar: [
      {
        title: 'css',
        collapsable: true,
        children: [
          '/css/bfc',
          '/css/box',
          '/css/flex',
          '/css/layout',
        ]
      },
      {
        title: 'javascript',
        collapsable: true,
        children: [
          '/javascript/asynchronous',
          '/javascript/clone',
          '/javascript/closure',
          '/javascript/datatype',
          '/javascript/date',
          '/javascript/ES6',
          '/javascript/number',
          '/javascript/parse-order',
          '/javascript/prototype',
          '/javascript/scope',
          '/javascript/stringify',
          '/javascript/this',
          '/javascript/function',
        ]
      },
      {
        title: 'vue',
        collapsable: true,
        children: [
          '/vue/code-1',
          '/vue/code-2',
          '/vue/code-3',
          '/vue/vue3.0-1',
          '/vue/vue3.0-2',
          '/vue/vue3.0-3',
          '/vue/vuex',
          '/vue/communication',
          '/vue/responsive',
        ]
      },
      {
        title: 'san',
        collapsable: true,
        children: [
          '/san/san',
          '/san/eslint-plugin-san',
          '/san/composition',
        ]
      },
      {
        title: 'react',
        collapsable: true,
        children: [
          '/react/react-1',
          '/react/react-2',
        ]
      },
      {
        title: 'virtual dom',
        collapsable: true,
        children: [
          '/virtual-dom/virtualdom',
          '/virtual-dom/example',
        ]
      },
      {
        title: 'webpack',
        collapsable: true,
        children: [
          '/webpack/webpack1',
          '/webpack/webpack2',
          '/webpack/webpack3',
          '/webpack/webpack4',
          '/webpack/webpack5',
          '/webpack/config',
          '/webpack/hmr',
        ]
      },
      {
        title: 'typescript',
        collapsable: true,
        children: [
          '/ts/ts-base',
          '/ts/ts-advance',
        ]
      },
      {
        title: 'ssr',
        collapsable: true,
        children: [
          '/ssr/ssr',
        ]
      },
      {
        title: 'node',
        collapsable: true,
        children: [
          '/node/node-1',
          '/node/node-2',
          '/node/node-3',
          '/node/node-4',
          '/node/node-5',
          '/node/node-6',
        ]
      },
      {
        title: '正则表达式',
        collapsable: true,
        children: [
          '/regular/regular',
        ]
      },
      {
        title: '移动端问题',
        collapsable: true,
        children: [
          '/mobile/adaptation',
          '/mobile/long-list',
        ]
      },
      {
        title: '算法',
        collapsable: true,
        children: [
          '/algorithm/array',
          '/algorithm/dfs-bfs',
          '/algorithm/dynamic',
          '/algorithm/greedy',
          '/algorithm/list',
          '/algorithm/scene',
          '/algorithm/sort',
          '/algorithm/stack',
          '/algorithm/string',
          '/algorithm/trace',
          '/algorithm/tree',
          '/algorithm/two-pointer',
        ]
      },
      {
        title: '设计模式',
        collapsable: true,
        children: [
          '/design-pattern/design-pattern',
          '/design-pattern/object',
        ]
      },
      {
        title: '前端路由',
        collapsable: true,
        children: [
          '/route/route',
        ]
      },
      {
        title: '前端工程化',
        collapsable: true,
        children: [
          '/engineering/engineering',
          '/engineering/eslint',
          '/engineering/grunt',
          '/engineering/gulp',
          '/engineering/rollup',
        ]
      },
      {
        title: '前端安全',
        collapsable: true,
        children: [
          '/safe/safe',
        ]
      },
      {
        title: '模块化',
        collapsable: true,
        children: [
          '/module/module',
        ]
      },
      {
        title: '面试题',
        collapsable: true,
        children: [
          '/interview/interview',
          '/interview/algorithm',
          '/interview/code-1',
          '/interview/code-2',
          '/interview/interview-1',
          '/interview/interview-2',
          '/interview/interview-3',
          '/interview/interview-4',
          '/interview/interview-5',
          '/interview/interview-6',
          '/interview/interview-7',
          '/interview/interview-8',
          '/interview/interview-9',
          '/interview/interview-10',
          '/interview/interview-11',
          '/interview/iq',
        ]
      },
      {
        title: '浏览器',
        collapsable: true,
        children: [
          '/chrome/gc',
          '/chrome/render',
        ]
      },
      {
        title: '计算机基础',
        collapsable: true,
        children: [
          '/computer/computer',
        ]
      },
      {
        title: 'git',
        collapsable: true,
        children: [
          '/git/git',
        ]
      },
      {
        title: '代码规范',
        collapsable: true,
        children: [
          '/code-style/code-style',
        ]
      },
      {
        title: '常用工具',
        collapsable: true,
        children: [
          '/tool/tool',
        ]
      },
      {
        title: '扩展阅读',
        collapsable: true,
        children: [
          '/read/read',
        ]
      },
    ],
    nextLinks: true,
    prevLinks: true,
  },
  markdown: {
    lineNumbers: false,
  },
  plugins: ['fulltext-search'],
}
