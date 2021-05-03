<template>
<div>
     <nav-header></nav-header>
   <bresd>
      <span slot="bread">视频页</span>
    </bresd>
    <el-container style="height: 500px; border: 1px solid #eee">
  <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
    <el-menu :default-openeds="['1', '3']">
      <el-submenu index="1">
        <template slot="title"><i class="el-icon-menu"></i>视频目录</template>
        <el-menu-item-group>
          <el-menu-item  v-for="item in count" :key="item" :index="item" @click="start(item)">{{productName}}{{item}}</el-menu-item>
          
        </el-menu-item-group>
       
       
      </el-submenu>
    
    </el-menu>
  </el-aside>
  
 <el-container>
  <el-header style="text-align: font-size: 12px">
  <span>{{productName}}</span>
    </el-header>
    <el-main style="padding:0">
     <video
          src=""
          controls="controls"
          width="600"
          height="400 "
          ref="vi"
        ></video>
    </el-main>
  </el-container>
</el-container>
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
            productName:'',
            count:0
    }},
    mounted(){

         var pname=this.$route.query.productName;
          this.$refs.vi.src = "/static/static/" + pname + "1.mp4";
         this.productName=pname
         axios.get('/goods/count',{params:{name:pname}}).then((response)=>{
             var res= response.data;
             console.log(res);
             
             if (res.status==0) {
                 this.count=res.result.count
                 console.log(this.count);
             } 
         })
    },
    methods:{
        start(item){
            console.log(item);
            
          
            var name = this.productName+item;
            this.$refs.vi.src = "/static/static/" + name + ".mp4";
        }
    },
    components:{
        NavFooter,
    NavHeader,
    bresd,
    Model,
    Videoa
    }
}
</script>
<style scoped>
.el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  
  .el-aside {
    color: #333;
  }

</style>