const state = {
    count: 1,
};

const mutations = {
    updateCount: (currentState, step = 1) => {
        currentState.count += step;
    },
};

const actions = {
    async increment({ commit }, step) {
        commit('updateCount', +step);
    },

    decrement({ commit }, step) {
        commit('updateCount', -step);
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
