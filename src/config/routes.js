import Home from '../view/Home/index.jsx'
import Login from '../view/Login/index.jsx'

const routeConfig = [
    {
        component: <Home/>,
        path: '/home',
    },
    {
        component: <Login/>,
        path: '/login',
    },
]

export default routeConfig