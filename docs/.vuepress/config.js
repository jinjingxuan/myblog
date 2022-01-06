const nav = require('./nav.js');
const sidebar = require('./sidebar.js');
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
    nav,
    lastUpdated: '最后更新时间',
    sidebarDepth: 3,
    sidebar,
    nextLinks: true,
    prevLinks: true,
  },
  markdown: {
    lineNumbers: false,
  },
  plugins: ['fulltext-search'],
}
