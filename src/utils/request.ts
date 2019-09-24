import axios from 'axios';
import joinPath from 'join-path';

const baseURL = process.env.VUE_APP_REQUEST_BASE_URL || '';

/**
 * 创建一个默认的axios实例
 */
function createDefaultRequest() {
    const instance = axios.create({
        baseURL,
        timeout: 1000 * 30,
    });
    // instance.interceptors.request.use(config=>{
    //     set your request config
    //     return config;
    // });
    instance.interceptors.response.use((response) => {
        const data = response.data;
        if (data && +data.code !== 0) {
            if (data.code === 'SYS010') {// 未登录或登录超时
                window.app.$store.dispatch('user/logout', {onlyLocal: true});
            }
            const error = {
                code: data.code,
                message: data.msg,
                response,
                type: 'NetError',
            };
            return Promise.reject(error);
        }
        return data;
    }, (r) => {
        if (r instanceof Error) { return Promise.reject(r); }
        const response = r.response;
        const status = response.status;
        const error = new Error(`[${status}]${response.statusText}`) as any;
        error.code = status;
        error.response = response;
        return Promise.reject(error);
    });
    return instance;
}

// 获取网络请求的实际绝对位置（自动拼接baseUrl）
export const getAbsUrl = (url: string) => {
    return joinPath(baseURL, url);
};

export default createDefaultRequest();
