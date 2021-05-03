<template>
<div>
    <nav-header></nav-header>
   <bresd>
      <span slot="bread">详情页</span>
    </bresd>
    <el-row class="bg" >
  <el-col :span="8" :offset="4" class="infinite-list" v-infinite-scroll="load" style="overflow:auto">
      <div class="grid-content bg-purple" @click="video" >
      <img style="height:320px;width:320px" :src="'/static/static/'+productImage"/>
      </div></el-col>
  <el-col :span="8"><div class="grid-content bg-purple">
      <el-container>
  <el-header style="font-size:30px;font-family:PingFang SC;color:#303133">{{name}}</el-header>
  <el-main style="font-size:20px;">{{price}}</el-main>
  <el-footer><el-button type="primary" @click="shopcar">加入购物车</el-button></el-footer>
</el-container>
      </div></el-col>
</el-row>
<el-row>
    <el-col :span="16" :offset="4">
        <img :src="'/static/static/'+url"/>
    </el-col>
</el-row>
   <Model v-bind:mdshow="mdshowCart">
<p slot="message">
   <svg class="icon-status-ok">
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-status-ok"></use>
            </svg>
            <span>加入购物车成功!</span>
</p>
<div slot="btnGroup">
<a class="btn btn--m" href="javascript:;" @click="mdshowCart=false">继续购物</a>
<router-link class="btn btn--m btn--red" href="javascript:;" to="/cart">查看购物车</router-link>
</div>
    </Model>
    <Model v-bind:mdshow="mdshow" >
      <p slot="message">
        请先登录，否则无法加到购物车中
      </p>
      <div slot="btnGroup">
        <a href="javascript :;" class="btn btn--m" @click="mdshow=false">
          关闭
        </a>
      </div>

    </Model>
    <Videoa v-bind:mdvshow="mdvshow" @url="refurl">
      <p slot="message">
        <video
          src=""
          controls="controls"
          width="400"
          height="400 "
          ref="vi"
        ></video>
      </p>
      <div slot="btnGroup">
        <router-link :to="{path:'/details',query:{productName:videoName}}" class="btn btn--m" @click.native="mvclose">关闭</router-link> 

        
      
          
        
      </div>
    </Videoa>
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
            name:'课程',
            price:'111',
            url:"0",
            mdshowCart:false,
            mdshow:false,
               mdvshow:false ,
               videoName:'',
               productImage:''
        }
    },
    components:{
        NavFooter,
    NavHeader,
    bresd,
    Model,
    Videoa
    },
    mounted(){

        var pname=this.$route.query.productName;
        this.name=pname;
        console.log(pname+"pname");
        
        axios.get('/goods/details',{
            params:{
                productName:pname
            }
        }).then((response)=>{
            var res = response.data;
            this.productImage=res.result.productImage;
            this.price=res.result.salePrice;
            this.url=res.result.productUrl;
        })
        console.log(this.productImage);
    },
    methods:{
          shopcar(){
      axios.post("/goods/addCart",{productName:this.name}).then(
        (response) =>{
         
          if(response.data.status==0){
          this.mdshowCart=true;
          this.$store.commit("updateCartCount",1)
          }
          if(response.data.status==1001){
            console.log("mdshow"+this.mdshow)
            this.mdshow = true; 
            console.log("mdshow"+this.mdshow)
            console.log("dff")
          }
        }
      )
    },
      video() {
      this.mdvshow = true;
      this.videoName = this.name;
    },
    refurl() {
      console.log("videoname");

      console.log(this.videoName);
      console.log("refs");

      console.log(this.$refs);
      this.$refs.vi.src = "/static/static/" + this.name + ".mp4";
    },
     mvclose(){
        this.mdvshow = false;
        this.$refs.vi.src = '';
    }
    }
}
</script>
<style  scoped>
.bg{
  background-color: cornflowerblue;
}
</style>>

