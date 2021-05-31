import axios from 'axios'

export default({
    namespaced: true,

    state: {
        token: null,
        user: null,
        error: ""
    },

    getters: {
        authenticated (state) {
            return state.token && state.user
        },

        user (state) {
            return state.user
        }
    },

    mutations: {
        SET_TOKEN (state, info){
            state.token = info.token
            state.user = info.user
        },

        POST_ERROR: (state, payload) => {
            state.error = payload;
        }
    },

    actions: {
        async signIn({ dispatch }, credentials) {
            let response = await axios.post('signin', credentials).catch(error => {
                /* eslint-disable no-console */
                console.log(error.message);
                return dispatch('failed',error.message)
            });
            
            return dispatch('attempt',response.data)
        },

        async attempt({ commit }, info) {
            commit('SET_TOKEN', info)
        },

        async failed({ commit }, err) {
            commit('POST_ERROR', err)
        },

        signOut({commit}) {
            commit('SET_TOKEN', null)
        }
    },
  })
  