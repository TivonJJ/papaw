/**
 * 全局系统配置
 */
module.exports = {
    // 应用标题
    title: 'Papaw',
    // 资源根地址 构建环境传入变量basePath时会被覆盖
    basePath: '/',
    // 是否启用pwa，开发模式无效
    pwa: false,
    // 主题
    theme: require('./themes/default'),
    // 路由模式 'hash' | 'history' | 'abstract'
    router_mode: 'hash'
};
