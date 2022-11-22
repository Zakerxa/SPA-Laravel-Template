import authorize from '../../authorize';

export default {
    actions: {
        logout({ commit, state, rootState }) {
            return new Promise((resolve, reject) => {
                authorize('api/user/logout').then(res => {
                    if (res.data.response == 'logout') {
                        localStorage.removeItem('auth');
                        rootState.auth = null;
                        rootState.authUser = null;
                        commit('globalMessage', 'Good Bye', { root: true })
                        resolve();
                    } else reject('Unauthorize');
                })
            })
        }
    }
}
