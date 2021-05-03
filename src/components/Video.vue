<!-- 面包屑组件 -->
<template>
    <div>
      <!-- <div class="md-modal modal-msg md-modal-transition" > -->
      <div class="md-modal modal-msg md-modal-transition" v-bind:class="{'md-show':mdvshow}">
        <div class="md-modal-inner">
          <div class="md-top">
            
           
          </div>
          <div class="md-content">
            <div class="confirm-tips">
                <slot name="message"></slot>
                <button class="btn btn--m" style="width:200px" @click="url">载入视频</button>
            </div>
            <div class="btn-wrap">
                <slot name="btnGroup"></slot>
              
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="md-overlay" v-if="mdshow" ></div> -->
    </div>
</template>

<script type="text/ecmascript-6">
export default {
    props:["mdvshow"], 
      // 接收父组件传过来的mdShow
    data(){
        return {

        }
    },
   mounted(){
        
       
    },
methods:{
        url(){  
            this.$emit("url");  
             
        }
    },
   
}
</script>
