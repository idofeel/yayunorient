// routerMap

import App from '../components/test/App';
import Index from '../Page/index';
import Home from '../Page/Home/Home';


export default [
    {
        path: '/',
        name: 'app',
        components: App,
    },
    {
        path: '/index',
        name: 'index',
        components: Index,
    },
    {
        path: '/home',
        name: 'Home',
        components: Home,
    }
]