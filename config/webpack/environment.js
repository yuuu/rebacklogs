const { environment } = require('@rails/webpacker')
const { VueLoaderPlugin } = require('vue-loader')
const webpack = require('webpack')
const vue = require('./loaders/vue')

// enable SplitChunks
environment.splitChunks()

environment.plugins.append('Provide', new webpack.ProvidePlugin({
  $: 'jquery',
  jQuery: 'jquery',
  Popper: ['popper.js', 'default']
}))

environment.plugins.prepend('VueLoaderPlugin', new VueLoaderPlugin())
environment.loaders.prepend('vue', vue)
environment.plugins.append('ContextReplacement',
  new webpack.ContextReplacementPlugin(
    /moment[\/\\]locale$/,
    /ja|en-SG|en-au|en-ca|en-gb|en-ie|en-il|en-nz|de|fr|fu|zh-tw|zh-cn|zh-hk/
  )
)

module.exports = environment