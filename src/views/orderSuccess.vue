<template>
    <div>
        <nav-header></nav-header>
        
  <div class="container">
    <div class="page-title-normal">
      <h2 class="page-title-h2"><span>check out</span></h2>
    </div>
    <!-- 进度条 -->
    <div class="check-step">
     <ul>
            <li ><span>确定</span> 地址</li>
            <li><span>检查</span> 订单</li>
            <li><span>支付</span> 订单</li>
            <li class="cur"><span>订单</span> 成功</li>
          </ul>
    </div>

    <div class="order-create">
      <div class="order-create-pic"><img src="/static/static/ok-2.png" alt=""></div>
      <div class="order-create-main">
        <h3>庆祝 <br>您的订单正在处理中</h3>
        <p>
          <span>订单 ID：{{orderId}}</span>
          <span>总价格：{{orderTotal|currency('¥')}}</span>
        </p>
        <div class="order-create-btn-wrap">
          <div class="btn-l-wrap">
            <router-link  class="btn btn--m" to="/cart">购物车列表</router-link>
          </div>
          <div class="btn-r-wrap">
            
            <router-link class="btn btn--m" to="/order">订单列表</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
  <nav-footer></nav-footer>
</div>
</template>
<script>
import NavHeader from './../components/header.vue'
import NavFooter from './../components/footer.vue'
import Modal from './../components/Modal.vue'
import NavBread from './../components/NavBread.vue'
import axios from 'axios'
import {currency} from './../util/currency'
import './../assets/css/product.css'
export default {
    data(){
        return {
            orderId:'',
            orderTotal:0
        }
    },
     components:{
        NavBread,
        NavHeader,
        NavFooter,
        Modal
    },
    methods:{

    },
    mounted(){
        let orderId =this.$route.query.orderId;
        if (!orderId){
            return ;
        }
        axios.get('/users/orderDetail',{
            params:{orderId:orderId}
        }).then((response)=>{
            let res =response.data;
            if (res.status=='0') {
                this.orderId=orderId;
                this.orderTotal=res.result.orderTotal
            }
        })
    },
    filters:{
        currency
    }
}
</script>
<style scoped>

</style>