module.exports = {
  title: '个人博客',
  base: '/myblog/',
  head: [
    // ['link', { rel: 'icon', href: '/' }]
  ],
  themeConfig: {
    logo: '',
    repo: 'jinjingxuan',
    docsDir: 'docs',
    editLinks: true,
    editLinkText: '在 Github 上帮助我们编辑此页',
    nav: [
      {text: '首页', link: '/'},
    ],
    lastUpdated: '最后更新时间',
    sidebar: [
      {
        title: 'css基础',
        collapsable: true,
        children: [
          '/css/bfc',
          '/css/box',
          '/css/flex',
          '/css/layout',
        ]
      },
      {
        title: 'javascript基础',
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
        title: 'vue框架',
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
        title: 'san框架',
        collapsable: true,
        children: [
          '/san/san',
        ]
      },
      {
        title: 'react框架',
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
          '/ts/ts',
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
    ],
    nextLinks: true,
    prevLinks: true,
  },
  markdown: {
    lineNumbers: false,
  }
}
