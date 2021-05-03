import Vue from 'vue'
import Router from 'vue-router'
import GoodsList from '../views/GoodsList'
import Cart from './../views/Cart.vue'
import Address from './../views/address'
import OrderConfirm from './../views/orderConfirm'
import orderSuccess from './../views/orderSuccess'
import details from './../views/details'
import order from './../views/order'
import orderdetails from './../views/orderdetails'
Vue.use(Router)

export default new Router({
    routes:[
        {path:'/',component:GoodsList},
        {path:'/cart',component:Cart},
        {path:'/address',component:Address},
        {path:'/orderConfirm',component:OrderConfirm},
        {path:'/orderSuccess',component:orderSuccess},
        {path:'/details',component:details},
        {path:'/order',component:order },
        {path:"/orderdetails",component:orderdetails}
    ]
})