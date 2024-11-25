<template>
    <div class="order">
        <div class="title">内置指令</div>
        <div>v-text,
            v-html,
            v-show,
            v-if,
            v-else,
            v-else-if,
            v-for,
            v-on,
            v-bind,
            v-model,
            v-slot,
            v-pre,
            v-once,
            v-memo,
            v-cloak</div>
        <!-- <div style="margin-top: 20px;">v-slot​
            用于声明具名插槽或是期望接收 props 的作用域插槽。</div>

        <div>
            <Vslot :message="parentMessage" @child="handleChildEvent">
                <template v-slot:hader></template>
<template v-slot:footer="slotProps">
                    {{ slotProps }}
                </template>
<template v-slot:default="slotProps">
                    <div>{{ slotProps }}</div>
                </template>
</Vslot>
<div>{{ messageFromChild }}</div>
</div>
<p v-pre>这里的内容不会被Vue解析: {{ message }}</p>
<p>这里的内容会被Vue解析: {{ message }}</p>
<p v-once>{{ message }}</p>
<button @click="changeMessage">改变消息</button>
<p>{{ message }}</p> -->
        <!-- <Vslot :num="num1"></Vslot> -->
        <Vslot ref="Vslot" @model1="modelfed" @child="handleChildEvent" :num="num1"></Vslot>
        <p>{{ messageFromChild }}</p>
        <p>{{ message }}</p>
        <div @click="refClick">通过ref实例获取子组件</div>
        <div style="margin-top: 20px;">VueX</div>
        <div>{{ doubleCount }}</div>
        <div>{{ count1 }}</div>
    </div>
</template>

<script>
import Vslot from "./components/Vslot.vue"
export default {
    data() {
        return {
            ifshow: 'hader',
            parentMessage: "父组件传子组件",
            messageFromChild: "",
            message: "初始消息",
            count: 0,
            isVisible: true,
            num1: {
                title1: '111',
                title2: '222'
            },
        }
    },
    components: {
        Vslot
    },
    computed: {
        count1() {
            return this.$store.state.count
        },
        doubleCount() {
            return this.$store.getters.doubleCount;
        }
    },
    methods: {
        refClick() {
            this.$refs.Vslot.inputmodel = 123456;
            console.log(this.$refs.Vslot.inputmodel);

        },
        modelfed(e) {
            console.log(e);

            this.message = e;
        },
        changeMessage() {
            this.message = '消息已改变';
        },
        handleChildEvent(message) {
            this.messageFromChild = message;  // 接收子组件传递的数据
        }
    },
    mounted() {
        console.log(this.$store);
        //   this.$store.commit('increment')
        //   this.$store.commit('incrementBy',10)
        //   this.$store.dispatch('incrementAsync');
        this.$store.dispatch('incrementByAsync', 50);

    },
}
</script>

<style lang="scss" scoped>
.order {
    .title {
        font-size: 20px;
        font-weight: bold;
    }
}
</style>