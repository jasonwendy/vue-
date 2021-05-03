<!-- 面包屑组件 -->
<template>
    <div>
      <div class="md-modal modal-msg md-modal-transition" v-bind:class="{'md-show':mdshow}">
        <div class="md-modal-inner">
          <div class="md-top">
            <button class="md-close" @click="closeModal">关闭</button>
           
          </div>
          <div class="md-content">
            <div class="confirm-tips">
                <slot name="message"></slot>
            </div>
            <div class="btn-wrap">
                <slot name="btnGroup"></slot>
              
            </div>
          </div>
        </div>
      </div>
      <div class="md-overlay" v-if="mdshow" @click="closeModal"></div>
    </div>
</template>

<script type="text/ecmascript-6">
export default {
    props:["mdshow"], 
      // 接收父组件传过来的mdShow
    data(){
        return {

        }
    },
    methods:{
        closeModal(){  // 关闭模态框
            this.$emit("close");  // 触发close方法
            trigger("click")
        }
    },
   
}
</script>
