import axios from 'axios'

export default({
    namespaced: true,

    state: {
        users: []
    },

    getters: {
        allUsers: state => state.users
    },

    mutations: {
        setUsers: (state, users) => (state.users = users),
        newUser: (state, user) => state.users.unshift(user),
        removeUser: (state, id) =>
            (state.users = state.users.filter(user => user.id !== id)),
        updateUser: (state, updUser) => {
            const index = state.users.findIndex(user => user.id === updUser.id);
            if (index !== -1) {
                state.users.splice(index, 1, updUser);
            }
        }
    },

    actions: {
        async fetchUsers({ commit }) {
            const response = await axios.get('users');
        
            commit('setUsers', response.data);
        },
        async addUser({ commit }, user) {
            const response = await axios.post('register', user);
        
            commit('newUser', response.data);
        },
        async deleteUser({ commit }, id) {
            await axios.delete(`users/${id}`);
        
            commit('removeUser', id);
        },
        async updateUser({ commit }, updUser) {
            const response = await axios.put(`users/${updUser.id}`, updUser);
        
            // console.log(response.data);
        
            commit('updateUser', response.data);
        }
    },
})
  