interface LightGoUtil {
    setNavigationStyle: (type: number) => void;
    setNavigationBarColor: (color: string) => void;
    setNavigationBarTitle: (title: string) => void;
    showLongToast: (content: string) => void;
    showShortToast: (content: string) => void;
    showLoading: (content: string) => void;
    hideLoading: () => void;
    setStorage: (key: string, data: string) => void;
    removeStorage: (key: string) => void;
    getStorage: (key: string) => Promise<any>;
    clearStorage: () => void;
    getDeviceInfo: () => Promise<any>;
    scanCode: () => Promise<any>;
    getLocation: () => Promise<any>;
    [key: string]: any;
}

declare global {
    interface Window {
        lightGo: {
            [key: string]: any;
        };
        lightGoCallBack: (requestId: string, data: string) => void;
    }
}

const syncFn = [
    'setNavigationStyle',
    'setNavigationBarColor',
    'setNavigationBarTitle',
    'showLongToast',
    'showShortToast',
    'showLoading',
    'hideLoading',
    'setStorage',
    'removeStorage',
    'clearStorage',
];
const asyncFn = ['getStorage', 'getDeviceInfo', 'scanCode', 'getLocation'];

function createRequestId() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = (Math.random() * 16) | 0,
            v = c == 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}
const lightGoCallbacks = {} as any;
const lightGo = {} as LightGoUtil;

syncFn.forEach(name => {
    lightGo[name] = window.lightGo[name];
});
asyncFn.forEach(name => {
    lightGo[name] = function(...args: any) {
        return new Promise((resolve, reject) => {
            const reqId = createRequestId();
            lightGoCallbacks[reqId] = { resolve, reject };
            window.lightGo[name](reqId, ...args);
        });
    };
});

window.lightGoCallBack = function(id: string, data: string) {
    const callback = lightGoCallbacks[id];
    if (!callback) return;
    try {
        const parseData = JSON.parse(data);
        if (parseData.type == 0) {
            callback.resolve(parseData.data);
        } else {
            callback.reject({
                ...parseData,
                code: parseData.type,
            });
        }
    } catch (e) {
        callback.reject({
            code: -1,
            data: e,
        });
    } finally {
        callback[id] = undefined;
        delete callback[id];
    }
};

export default lightGo;
