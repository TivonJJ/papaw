import { login } from '@/service/user';

const Storage = sessionStorage;

const state = {
    currentUser: getLocalUser(),
};

const mutations = {
    SET_CURRENT_USER: (currentState, user) => {
        currentState.currentUser = user;
        setLocalUser(user);
    },
};

const actions = {
    // user login
    async login({ commit, dispatch }, userInfo) {
        return login(userInfo).then(async response => {
            const user = response.data;
            commit('SET_CURRENT_USER', user);
            return user;
        });
    },

    // user logout
    logout({ commit }) {
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

function setLocalUser(user) {
    if (typeof user === 'object') {
        user = JSON.stringify(user);
    }
    Storage.setItem('user', user);
}
