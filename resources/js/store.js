import { createStore } from 'vuex';
import authorize from './authorize';
import cookie from './cookie';

const store = createStore({
    state() {
        return {
            count: 0,
            auth: localStorage.getItem('auth') || null,
            loginLimit: cookie.getCookie('loginCount') || null,
            loginCount: 1,
            loginError: '',
            registererror: '',
        }
    },
    getters: {
        auth() {
            return localStorage.getItem('auth') || null;
        },
        loginLimit() {
            return cookie.getCookie('loginCount') || null;
        }
    },
    mutations: {
        increment(state) {
            state.count++;
        },
        decrement(state) {
            if (state.count - 1) state.count--;
        },
        updateAuthorize(state, resToken) {
            if (resToken) localStorage.setItem('auth', resToken);
            state.auth = localStorage.getItem('auth') || null;
        },
        loginTimes(state) {
            if (state.loginCount == 5) {
                // console.log("Set Cookie ", state.loginCount);
                state.loginCount = 1;
                cookie.setCookie('loginCount', 'limit', 60 * 1000);
                state.loginLimit = cookie.getCookie('loginCount');
            }
        },
        loginError(state, res) {
            state.loginCount++;
            if (res) {
                state.loginError = 'Incorrect credentials.';
                res.password ? state.loginError = res.password[0] : '';
                res.email ? state.loginError = res.email[0] : '';
            } else state.loginError = '';
        }
    },
    actions: {
        logout({ commit, state }) {
            return new Promise((resolve, reject) => {
                authorize('api/user/logout').then(res => {
                    if (res.data.response == 'logout') {
                        localStorage.removeItem('auth');
                        state.auth = null;
                        resolve();
                    } else reject('Unauthorize');
                })
            })
        },
        login({ commit, state }, forms) {

            if (state.loginCount < 5) {

                // if users is login too many,We will stop login temporary
                if (cookie.getCookie('loginCount')) {
                    state.loginError = 'Too many login.Try again later.';
                    return null;
                }

                return new Promise((resolve, reject) => {
                    fetch('api/user/login', {
                            method: 'post',
                            headers: {
                                "Accept": 'application/json',
                                "Content-Type": 'application/json',
                                "X-CSRF-Token": document.head.querySelector("[name~=csrf-token][content]").content
                            },
                            credentials: "same-origin",
                            body: JSON.stringify({
                                password: forms.password,
                                email: forms.email
                            })
                        })
                        .then(res => res.json())
                        .then(res => {
                            if (res.response == 'success') resolve(commit('updateAuthorize', res.token));
                            else reject(commit('loginError', res.errors));
                        })
                        .catch(err => reject(commit('loginError', err.errors)))
                })

            } else {
                if (state.loginCount == 5) commit('loginTimes');
                state.loginCount++;
                state.loginError = 'Too many login.Try again later.';
            }

        }
    }
});


export default store;
