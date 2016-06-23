import {WebpackConfig, get} from '@easy-webpack/core'
import * as path from 'path'

/**
 * Instruments JS files with Istanbul for subsequent code coverage reporting.
 * Instrument only testing sources.
 *
 * See: https://github.com/deepsweet/istanbul-instrumenter-loader
 */
// NOTE: Currently breaks with Webpack >=2
export = function istanbul(exclude: Array<string> = null) {
  return function istanbul(this: WebpackConfig): WebpackConfig {
    return {
      module: {
        postLoaders: get(this, 'module.postLoaders', []).concat([{
          test: /\.(js|ts)$/,
          loader: 'istanbul-instrumenter',
          include: this.metadata.src,
          exclude: exclude || this.metadata.root ? [path.join(this.metadata.root, 'node_modules'), /\.(e2e|spec)\.(js|ts)x?$/] : [],
        }])
      }
    }
  }
}