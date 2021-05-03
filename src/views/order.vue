    <template>
<div>
    <nav-header></nav-header>
   <bresd>
      <span slot="bread">订单页</span>
    </bresd>
    <table id="customers">
	<tr>
		<th>商品</th>
        <th>名字</th>
		<th>数量</th>
		<th>价格</th>
		
	</tr>
	<tr v-for="item in orderlist" :key="item.id">
		<td> 
              <img class="cart-item-pic" :src="'/static/static/'+item.productImage" :alt="item.productName" width="185px" height="168px" @click="detail(item)">
        </td>
		<td>{{item.productName}}</td>
		<td>{{item.productNum}}</td>
		<td>{{item.salePrice*item.productNum}}</td>
	</tr>

</table>
<nav-footer></nav-footer>
</div>
</template>
<script>
import "./../assets/css/base.css";
import "./../assets/css/product.css";
import axios from "axios";
import NavFooter from "./../components/footer.vue";
import NavHeader from "./../components/header.vue";
import Model from "./../components/Modal.vue"
import bresd from "../components/bresd.vue";
import Videoa from "./../components/Video.vue";
export default {
    data(){
        return{
           orderlist:[],
           
        }
    },
    components:{
        NavFooter,
    NavHeader,
    bresd,
    Model,
   
    },
    mounted(){
         axios.get('/users/orderlist',{
        }).then((response)=>{
            if (response.data.status == 0){
                this.orderlist=response.data.result;
                console.log(response.data.result);
            }
        })
      
    },
    methods:{
           detail(item){
               if (item.purl && item.purl === "true") {
        this.$router.push({
          path: "/orderdetails" ,query :{productName:item.productName},
        });
      } 
           }
          
    }
}
</script>
<style  scoped>
#customers {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

#customers td, #customers th {
  border: 1px solid #ddd;
  padding: 8px;
}

#customers tr:nth-child(even){background-color: #f2f2f2;}

#customers tr:hover {background-color: #ddd;}

#customers th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #605f5f;
  color: white;
}
</style>>

