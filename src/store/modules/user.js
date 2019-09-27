import {login} from '@/service/user';
import { resetRouter } from '@/router';

// 用户存储cookie区域， 用户实际信息存储在localStorage内，在cookie内保存一个key来对应storage里面的内容
class UserCookieStore {
    storePrefix = '';
    userMarkPrefix = '@user_';
    Storage = localStorage;
    cookieKey = 'user-key';

    constructor(storePrefix) {
        this.storePrefix = storePrefix
    }

    set(data) {
        this.clear();
        if (!data) return;
        const storeKey = this.getRealKey() + Date.now();
        this.Storage.setItem(storeKey, window.JSON.stringify(data));
        Cookies.set(this.cookieKey, storeKey, {path: '/'})
    }

    get() {
        const storeKey = Cookies.get(this.cookieKey);
        if (!storeKey) return null;
        const user = this.Storage.getItem(storeKey);
        if (!user) return null;
        return window.JSON.parse(user)
    }

    getRealKey() {
        return this.storePrefix + this.userMarkPrefix
    }

    clear() {
        const regx = new RegExp('^(' + this.getRealKey() + ')');
        for (let i = 0; i < this.Storage.length; i++) {
            const key = this.Storage.key(i);
            if (regx.test(key)) {
                this.Storage.removeItem(key)
            }
        }
    }
}

const userCookieStore = new UserCookieStore('rgoa');

export const getLocalUser = ()=>{
    return userCookieStore.get();
};

const state = {
    currentUser: getLocalUser()
};

const mutations = {
    SET_CURRENT_USER: (state, user) => {
        if(user){
            userCookieStore.set(user);
        }else {
            userCookieStore.clear();
        }
        state.currentUser = user
    }
};

const actions = {
    // user login
    async login({commit,dispatch}, userInfo) {
        return login(userInfo).then(async response => {
            const user = response.user;
            user.token = response.token;
            if (!user.avatar) {
                user.avatar = '/img/avatar.png';
            }
            user.roles = user.type.split(',');
            if(user.type === 'MERCHANT'){
                return Promise.reject(new Error('权限不足'));
            }
            commit('SET_CURRENT_USER', user);
            await dispatch('applyRoles',user.roles);
            return user
        })
    },

    // user logout
    logout({commit}) {
        resetRouter();
        commit('SET_CURRENT_USER', null);
    },

    async applyRoles({commit,dispatch},roles){
        await dispatch('permission/generateRoutes', roles, { root: true });
    }

};

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
