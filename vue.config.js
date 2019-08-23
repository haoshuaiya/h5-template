module.exports = {
  devServer: {
    // proxy: 'https://www.xiaobuhome.cn'
    // proxy: 'https://xiaobutset.qjmy.cn/'
  },
  css: {
    loaderOptions: {
      sass: {
        data: "@import 'src/style/var.scss';"
      }
    },
    sourceMap: true,
    extract: false
  },
  indexPath: "index.twig",
  baseUrl: "/catalog/view/theme/retail_h5/dist"
};
