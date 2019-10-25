const state = {
    count: 1,
};

const mutations = {
    updateCount: (currentState: any, step: number = 1) => {
        currentState.count += step;
    },
};

const actions = {
    async increment({ commit }: any, step: number) {
        commit('updateCount', +step);
    },

    decrement({ commit }: any, step: number) {
        commit('updateCount', -step);
    },

    // user logout
    logout({ commit }: any) {
        commit('SET_CURRENT_USER', null);
    },
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
};
