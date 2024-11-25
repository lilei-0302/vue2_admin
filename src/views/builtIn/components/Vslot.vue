<template>
  <div class="">
    <div class="hader">
        <slot name="hader">{{ conter.title1 }}</slot>
    </div>
    <div class="footer">
        <slot :conter1="conter1" name="footer"></slot>
    </div>
    <div class="content">
        <slot :conter="conter"></slot>
    </div>
    <p>{{ message }}</p> 
    <button @click="sendDataToParent">Send Data to Parent</button>
    <div>{{ num.title1 }}</div>
    <input class="inputstyle" type="text"  v-model="inputmodel" @input="model">
  </div>
</template>

<script>
export default {
    data(){
        return{
           conter:{
            title1:'这是一个div1标签',
            title2:'这是一个div2标签'
           },
           conter1:{
            title1:'这是一个div3标签',
            title2:'这是一个div4标签'
           },
           childText:"子组件内容",
           inputmodel:"",
        }
    },
    props:{
        message:{
            type:String,
            require:false,
        },
        num:{
            type:Object,
            require:false,
            default: () => ({})
        }
    },
    methods:{
        sendDataToParent(){
            this.$emit('child',this.childText);
        },
        model(){
            this.$emit('model1',this.inputmodel);
        },
    },
    created(){
        
    },
    mounted(){

    }
}
</script>

<style lang="scss" scoped>
.inputstyle{
    border: 1px solid #000;
    width: 200px;
    padding: 10px;
}

</style>