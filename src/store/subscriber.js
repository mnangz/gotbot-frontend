import store from '@/store'
import axios from 'axios';

store.subscribe((mutation) => {
    switch (mutation.type) {
        case 'auth/SET_TOKEN':
            if(mutation.payload) {
                /* eslint-disable no-console */
                console.log(mutation.payload);
                axios.defaults.headers.common['Authorization'] = mutation.payload.token
                localStorage.setItem('token', mutation.payload.token)
            }else{
                axios.defaults.headers.common['Authorization'] = null
                localStorage.removeItem('token')
            }
            break;
    }
})