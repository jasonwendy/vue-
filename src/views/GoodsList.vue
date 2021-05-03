<template>
  <div>
    <nav-header></nav-header>
    <bresd>
      <span slot="bread">商品列表</span>
    </bresd>
    <div class="accessory-result-page accessory-page">
      <div class="container">
        <div class="filter-nav">
          <span class="sortby">分类</span>
          <a @click="school('ke')" href="javascript:void(0)" >课程</a>
          <a @click="school('pin')" href="javascript:void(0)" >
           商品
            <!-- <svg
              class="icon icon-arrow-short"
              v-bind:class="{ 'sort-up': sort }"
            >
              <use xlink:href="#icon-arrow-short" />
            </svg> -->
          </a>
          <a href="javascript:void(0)" class="filterby stopPop">价格分类</a>
        </div>
        <div class="accessory-result">
          <!-- filter -->
          <div class="filter stopPop" id="filter">
            <dl class="filter-price">
              <dt>价格:</dt>
              <dd>
                <a href="javascript:void(0)" @click="setPriceFilter('all')"
                  >全部</a
                >
              </dd>
              <dd>
                <a href="javascript:void(0)" @click="setPriceFilter(0)"
                  >0 - 100</a
                >
              </dd>
              <dd>
                <a href="javascript:void(0)" @click="setPriceFilter(1)"
                  >100 - 500</a
                >
              </dd>
              <dd>
                <a href="javascript:void(0)" @click="setPriceFilter(2)"
                  >500 - 1000</a
                >
              </dd>
              <dd>
                <a href="javascript:void(0)" v-on:click="setPriceFilter(3)"
                  >1000 - 2000</a
                >
              </dd>
            </dl>
          </div>

          <!-- search result accessories list -->
          <div class="accessory-list-wrap">
            <div class="accessory-list col-4">
              <ul>
                <li v-for="item in GoodsList" :key="item.id">
                  <div class="pic">
                    <a href="#">
                      <img
                        v-show="item.salePrice != 0"
                        @click="details(item)"
                        :src="'/static/static/' + item.productImage"
                        alt
                      />

                      <video
                        v-show="item.salePrice == 0"
                        :src="'/static/static/' + item.productName + '.mp4'"
                        width="390"
                        @click="video(item)"
                      ></video>
                    </a>
                  </div>
                  <div class="main">
                    <div class="name">{{ item.productName }}</div>
                    <div class="price">{{ item.salePrice }}</div>
                    <div class="btn-area">
                      <a
                        href="javascript:;"
                        class="btn btn--m"
                        @click="shopcar(item.productName)"
                        >加入购物车</a
                      >
                    </div>
                  </div>
                </li>
                <div
                  v-infinite-scroll="loadMore"
                  infinite-scroll-disabled="busy"
                  infinite-scroll-distance="20"
                  class="view-more-normal"
                >
                  <img
                    src="./../assets/loading/loading-spinning-bubbles.svg"
                    v-show="loading"
                  />
                </div>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--模态框-->
    <Model v-bind:mdshow="mdshow" @close="closeModel">
      <p slot="message">请先登录，否则无法加到购物车中</p>
      <div slot="btnGroup">
        <a href="javascript :;" class="btn btn--m" @click="mdshow = false">
          关闭
        </a>
      </div>
    </Model>
    <Model v-bind:mdshow="mdshowCart" @close="closeModel">
      <p slot="message">
        <svg class="icon-status-ok">
          <use
            xmlns:xlink="http://www.w3.org/1999/xlink"
            xlink:href="#icon-status-ok"
          ></use>
        </svg>
        <span>加入购物车成功!</span>
      </p>
      <div slot="btnGroup">
        <a class="btn btn--m" href="javascript:;" @click="mdshowCart = false"
          >继续购物</a
        >
        <router-link class="btn btn--m btn--red" href="javascript:;" to="/cart"
          >查看购物车</router-link
        >
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

        
                <router-link to="/" class="btn btn--m" @click.native="mvclose">关闭</router-link> 

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
import Model from "./../components/Modal.vue";
import bresd from "../components/bresd.vue";
import Vue from "vue";
import infiniteScroll from "vue-infinite-scroll";
import Videoa from "./../components/Video.vue";

Vue.use(infiniteScroll);
export default {
  data() {
    return {
      GoodsList: [],
      sort: true,
      page: 1,
      pageSize: 5,
      busy: true,
      priceChecked: "all",
      loading: false,
      mdshow: false,
      mdshowCart: false,
      videoshow: false,
      videoName: "",
    mdvshow:false 
    };
  },
  components: {
    NavFooter,
    NavHeader,
    bresd,
    Model,
    Videoa,
  },
  mounted: function () {
    this.getGoodsList();
  },
  methods: {
    getGoodsList(flag) {
      console.log("flag" + flag);
      var param = {
        page: this.page,
        pageSize: this.pageSize,
        sort: this.sort ? 1 : -1,
        priceLevel: this.priceChecked,
      };
      this.loading = true;
      this.busy = true;
      axios
        .get("/goods/list", {
          params: param,
        })
        .then((response) => {
          this.loading = false;
          this.busy = true;
          if (response.data.status == 1) {
            this.GoodsList = [];
          } else {
            this.loading = false;
            if (flag) {
              this.GoodsList = this.GoodsList.concat(response.data.result.list);
              if (response.data.result.length == 0) {
                this.busy = true;
                this.loading = false;
              } else {
                this.busy = false;
              }
              console.log("true");
            } else {
              this.GoodsList = response.data.result.list;
              this.busy = false;
              console.log("false");
            }
          }
        });
    },
    sortGoods() {
      this.sort = !this.sort;

      this.page = 1;
      this.getGoodsList();
    },
    loadMore: function () {
      console.log("loadmore" + this.busy);

      setTimeout(() => {
        this.page++;
        this.busy = true;
        this.getGoodsList(true);
      }, 900);
    },
    setPriceFilter(index) {
      this.priceChecked = index;
      this.page = 1;
      this.getGoodsList();
    },
    shopcar(productName) {
      axios
        .post("/goods/addCart", { productName: productName })
        .then((response) => {
          if (response.data.status == 0) {
            this.mdshowCart = true;
            this.$store.commit("updateCartCount", 1);
          }
          if (response.data.status == 1001) {
            console.log("mdshow" + this.mdshow);
            this.mdshow = true;
            console.log("mdshow" + this.mdshow);
            console.log("dff");
          }
        });
    },
    closeModel() {
      // 关闭模态框
      this.mdshow = false; // 未登录模态框消失
      this.mdshowCart = false; // 未登录模态框消失
    },
    video(item) {
      this.mdvshow = true;
      this.videoName = item.productName;
    },
    refurl() {
      console.log("videoname");

      console.log(this.videoName);
      console.log("refs");

      console.log(this.$refs);
      this.$refs.vi.src = "/static/static/" + this.videoName + ".mp4";
    },
    details(item) {
      if (item.purl && item.purl === "true") {
        this.$router.push({
          path: "/details" ,query :{productName:item.productName},
        });
      } 
      console.log("push")
    },
    mvclose(){
        this.mdvshow = false;
        this.$refs.vi.src = '';
    },
    school(item){
      axios.get('/goods/school',{params:{item:item}}).then((response)=>{
         if (response.data.status == 1) {
            this.GoodsList=response.data.result;
            console.log(response.data.result);
            
          }
      }

      )
    }
  },
};
</script>
<style scoped>
.list-wrap ul::after {
  clear: both;
  content: "";
  height: 0;
  display: block;
  visibility: hidden;
}
.loadmore {
  height: 100px;
  line-height: 100px;
  text-align: center;
}
.sort-up {
  transform: rotate(180deg);
  transition: all 0.3s ease-out;
}
.icon-arrow-short {
  width: 11px;
  height: 11px;
  transition: all 0.3s ease-out;
}
.btn :hover {
  background-color: #f0a6a6;
  transition: all 0.3s ease-out;
}
</style>