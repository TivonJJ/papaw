import {login} from '@/service/user';

export interface UserModel {
    id: number | string;
    name: string;
    token: string;
}

export interface UserState {
    currentUser: UserModel;
}

const Storage = sessionStorage;

const state = {
    currentUser: getLocalUser(),
};

const mutations = {
    SET_CURRENT_USER: (currentState: UserState, user: UserModel) => {
        currentState.currentUser = user;
        setLocalUser(user);
    },
};

const actions = {
    // user login
    async login({commit, dispatch}: any, userInfo: any) {
        return login(userInfo).then(async (response: any) => {
            const user = response.data;
            commit('SET_CURRENT_USER', user);
            return user;
        });
    },

    // user logout
    logout({commit}: any) {
        commit('SET_CURRENT_USER', null);
    },

};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
};

function getLocalUser() {
    const suser = Storage.getItem('user');
    if (!suser) {
        return null;
    }
    try {
        return JSON.parse(suser);
    } catch (e) {
        console.warn('Local user parse error', e);
    }
}

function setLocalUser(user: UserModel | string) {
    if (typeof user === 'object') {
        user = JSON.stringify(user);
    }
    Storage.setItem('user', user);
}
