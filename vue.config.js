"use strict";
const tsImportPluginFactory = require('ts-import-plugin');
const merge = require('webpack-merge');
const theme = require('./themes/default');

const BUILD_ENV = process.env.BUILD_ENV || process.env.NODE_ENV;
console.log('run env', BUILD_ENV);
const startParams = getStartParams();

process.env.VUE_APP_START_PARAMS = JSON.stringify(startParams);

module.exports = {
    baseUrl: startParams.basePath,
    devServer: {
        disableHostCheck: true,
        proxy: {
            '/api': {
                target: 'http://your.api.com',
                ws: true,
                changeOrigin: true,
            }
        }
    },
    css: {
        loaderOptions: {
            less: {
                modifyVars: theme
            }
        }
    },
    chainWebpack: config => {
        config.module
            .rule('ts')
            .use('ts-loader')
            .tap(options => {
                options = merge(options, {
                    transpileOnly: true,
                    getCustomTransformers: () => ({
                        before: [
                            tsImportPluginFactory({
                                libraryName: 'vant',
                                libraryDirectory: 'es',
                                style: true
                            })
                        ]
                    }),
                    compilerOptions: {
                        module: 'es2015'
                    }
                });
                return options;
            });
    },
    pwa: {
        name: 'My App',
        themeColor: '#4DBA87',
        msTileColor: '#000000',
        appleMobileWebAppCapable: 'yes',
        appleMobileWebAppStatusBarStyle: 'black',

        // configure the workbox plugin
        workboxPluginMode: 'InjectManifest',
        workboxOptions: {
            // swSrc is required in InjectManifest mode.
            swSrc: 'dev/sw.js',
            // ...other Workbox options...
        }
    }
};

function getStartParams() {
    return process.argv
        .slice(2)
        .map(arg => arg.split('='))
        .reduce((args, [value, key]) => {
            if (/^--/.test(value)) {
                args[value.replace(/^--/, '')] = key;
            }
            return args;
        }, {basePath: '/', BUILD_ENV});
}
