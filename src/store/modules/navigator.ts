export default {
    namespaced: true,
    state: {
        isForward: true,
        keepAliveRoutes: [],
    },
    mutations: {
        pushKeepAliveRoutes: (currentState: any, route: any) => {
            currentState.keepAliveRoutes.push(route);
            currentState.isForward = true;
        },
        popKeepAliveRoutes: (currentState: any, route: any) => {
            currentState.keepAliveRoutes.pop();
            currentState.isForward = false;
        },
    },
};
