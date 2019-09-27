const getters = {
    sidebar: state => state.app.sidebar,
    size: state => state.app.size,
    device: state => state.app.device,
    currentUser: state => state.user.currentUser,
    token: state=> state.user.currentUser?state.user.currentUser.token:null,
    roles: state => state.user.currentUser?state.user.currentUser.roles:null,
    permission_routes: state => state.permission.routes,
};
export default getters
