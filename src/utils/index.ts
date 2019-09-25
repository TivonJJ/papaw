// tslint:disable-next-line:no-var-requires
// const crypto = require('crypto');

/**
 * 数组去重
 * @param arr
 */
export function unique(arr: any[]) {
    arr.sort();
    const res = [arr[0]];
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] !== res[res.length - 1]) {
            res.push(arr[i]);
        }
    }
    return res;
}

/**
 * removeEmptyProperty 的配置参数
 */
interface RemoveEmptyPropertyOptions {
    // 忽略项
    ignores?: string[];
    // 是否trim有所值
    trim?: boolean;
}

/**
 * 移除对象内包含无效值的属性，无效值指的是（null,undefined,''）
 * @param obj 处理对象
 * @param options:RemoveEmptyPropertyOptions 配置参数
 */
export const removeEmptyProperty = (obj: any|{}, options: RemoveEmptyPropertyOptions= {}) => {
    // tslint:disable-next-line:forin
    for (const key in obj) {
        let val = obj[key];
        if (options.ignores && options.ignores.indexOf(key) !== -1) {
            continue;
        }
        if (options.trim !== false && typeof val === 'string') {
            val = val.trim();
        }
        if (null == val || '' === val) {
            delete obj[key];
        }
    }
    return obj;
};

/**
 * 对字符串进行MD5
 * @param str
 * @param digestType='hex'
 */
export const md5 = (str: string, digestType: string = 'hex') => {
    // const hash = crypto.createHash('md5');
    // hash.update(str);
    // return hash.digest(digestType);
};

/**
 * 移除对象中的属性
 * @param obj 操作的目标对象
 * @param properties 要移除的属性数组
 */
export const removeProperties = (obj: any, properties: any[]) => {
    if (Array.isArray(properties)) {
        properties.forEach((key: string) => {
            obj[key] = undefined;
            delete obj[key];
        });
    } else {
        obj[properties] = undefined;
        delete obj[properties];
    }
};

/**
 * 检测是否是Promise实例
 * @param obj
 */
export const isPromise = (obj: any) => {
    return (
        !!obj &&
        (typeof obj === 'object' || typeof obj === 'function') &&
        typeof obj.then === 'function'
    );
};

/**
 * 将参数转换为 boolean
 * @param val
 */
export const toBoolean = (val: any) => {
    if (typeof val === 'boolean') {
        return val;
    }
    switch (val) {
        case 1:
        case '1':
        case 'true':
        case 'on':
            return true;
        case 0:
        case '0':
        case 'false':
        case 'off':
            return false;
        default:
            return !!val;
    }
};
