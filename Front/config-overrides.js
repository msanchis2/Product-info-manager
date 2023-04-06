const SassRuleRewire = require('react-app-rewire-sass-rule')
const path = require('path')
const rewireAliases = require('react-app-rewire-aliases')
const { paths } = require('react-app-rewired')

module.exports = function override(config, env) {
  require('react-app-rewire-postcss')(config, {
    plugins: loader => [require('postcss-rtl')()]
  })

  config = rewireAliases.aliasesOptions({
    '@src': path.resolve(__dirname, `${paths.appSrc}`),
    '@assets': path.resolve(__dirname, `${paths.appSrc}/@core/assets`),
    '@components': path.resolve(__dirname, `${paths.appSrc}/@core/components`),
    '@layouts': path.resolve(__dirname, `${paths.appSrc}/@core/layouts`),
    '@store': path.resolve(__dirname, `${paths.appSrc}/redux`),
    '@styles': path.resolve(__dirname, `${paths.appSrc}/@core/scss`),
    '@configs': path.resolve(__dirname, `${paths.appSrc}/configs`),
    '@src/utility/Utils': path.resolve(__dirname, `${paths.appSrc}/utility/utils`),
    '@hooks': path.resolve(__dirname, `${paths.appSrc}/utility/hooks`),
    '@api': path.resolve(__dirname, `${paths.appSrc}/@api`)
  })(config, env)

  config = new SassRuleRewire()
    .withRuleOptions({
      test: /\.s[ac]ss$/i,
      use: [
        {
          loader: 'sass-loader',
          options: {
            sassOptions: {
              includePaths: ['node_modules', 'src/assets']
            }
          }
        }
      ]
    })
    .rewire(config, env)
  return config
}
