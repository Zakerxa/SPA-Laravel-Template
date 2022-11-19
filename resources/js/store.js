import { createStore } from 'vuex';
import authorize from './authorize';
const store = createStore({
    state() {
        return {
            count: 0
        }
    },
    getters: {

    },
    mutations: {
        increment(state) {
            state.count++;
        },
        decrement(state) {
            if (state.count - 1) state.count--;
        }
    }
});

export default store;