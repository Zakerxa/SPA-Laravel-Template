import authorize from '../../authorize';
export default {
    actions: {
        gettingAuthUser({ commit, state, rootState }) {
            // console.log("Checking User");
            if (!rootState.auth) return;

            return new Promise((resolve, reject) => {
                authorize('api/user')
                    .then(res => resolve(rootState.authUser = res.data))
                    .catch(err => reject(err))
            })
        }
    }
}
