const fs = require('fs');
const { join } = require('path');
const settings = require('./settings');
const _ = require('lodash');
const envReader = require('node-env-file');

const { env = {} } = process;
const BUILD_ENV = env.BUILD_ENV || env.NODE_ENV;
console.log('run env', BUILD_ENV);
const startParams = getStartParams();
if ('basePath' in startParams) {
    settings.basePath = startParams.basePath;
}
console.log('run basePath', settings.basePath);
env.VUE_APP_TITLE = settings.title;
env.VUE_APP_BUILD_ENV = BUILD_ENV;
env.VUE_APP_BASE_PATH = settings.basePath;
settings.envconf = getEnvConf(BUILD_ENV);
const theme = settings.theme ? require('./themes/' + settings.theme) : {};

module.exports = {
    parallel: false,
    publicPath: settings.basePath,
    devServer: {
        disableHostCheck: true,
        proxy: {
            '/api': {
                target: 'http://your.api.com',
                ws: true,
                changeOrigin: true,
            },
        },
    },
    css: {
        loaderOptions: {
            less: {
                modifyVars: theme,
                javascriptEnabled: true,
            },
            postcss: {
                autoprefixer: {
                    browsers: ['Android >= 4.0', 'iOS >= 8'],
                },
            },
        },
    },
    pwa: getPWASetting(),
    productionSourceMap: false,
    chainWebpack: config => {
        config.plugin('define').tap(definitions => {
            definitions[0] = Object.assign(definitions[0], {
                Settings: JSON.stringify(settings),
                StartParams: JSON.stringify(startParams),
            });
            return definitions;
        });
    },
    configureWebpack: {
        optimization: {
            splitChunks: {
                minSize: 200 * 1000,
                maxSize: 200 * 1000,
            },
        },
    },
};

function getStartParams() {
    return process.argv
        .slice(2)
        .map(arg => arg.split('='))
        .reduce(
            (args, [value, key]) => {
                if (/^--/.test(value)) {
                    args[value.replace(/^--/, '')] = key;
                }
                return args;
            },
            { basePath: '/', BUILD_ENV },
        );
}

function getEnvConf(env) {
    let conf = {};
    const confDir = join(__dirname, 'envconf');
    const baseConf = join(confDir, 'base.env');
    if (fs.existsSync(baseConf)) {
        _.merge(conf, envReader(baseConf));
    }
    const envConf = join(confDir, env + '.env');
    if (fs.existsSync(envConf)) {
        _.merge(conf, envReader(envConf, { overwrite: true }));
    }
    return conf;
}

function getPWASetting() {
    if (!settings.pwa) return undefined;
    if (settings.pwa === true) {
        return {
            // 配置 workbox 插件
            workboxPluginMode: 'InjectManifest',
            workboxOptions: {
                // InjectManifest 模式下 swSrc 是必填的。
                swSrc: 'src/service-worker.js',
                // ...其它 Workbox 选项...
            },
        };
    }
    return settings.pwa;
}
