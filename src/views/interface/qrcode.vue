<template>
    <div class="qrcodemain">
        <div>二维码生成</div>
        <div style="margin: 20px;">
            <div class="item">
                <span>文本</span>
                <el-input v-model="inputtext" placeholder="请输入内容"></el-input>
            </div>
            <div class="item">
                <span>大小</span>
                <el-slider style="width: 100px;" v-model="value1"></el-slider>
            </div>
            <div class="item">
                <span>颜色</span>
                <el-color-picker v-model="color1" change="creatQrCode"></el-color-picker>
            </div>
            <div class="item">
                <span>二维码</span>
                <div id="qrcode" ref="qrCodeUrl"></div>
            </div>
        </div>
        <div>{{ todos }}</div>
    </div>
</template>

<script>
import QRCode from 'qrcodejs2';
export default {
    name: 'QrcodeMain',
    data() {
        return {
            todos:"",
            inputtext: "https://www.baidu.com/",
            value1: 50,
            color1: "#000"
        }
    },
    watch: {
        color1() {
            this.creatQrCode(this.color1,this.value1);
        },
        value1(){
            this.creatQrCode(this.color1,this.value1);
        }
    },
    methods: {
        // formatTooltip(val) {
        //     return val + 500;
        // },
        creatQrCode(color1,value1) {
            // 清空二维码容器
            document.getElementById('qrcode').innerHTML = "";
            // 清空旧的二维码内容
            var qrcode = new QRCode(this.$refs.qrCodeUrl, {
                text: this.inputtext, // 需要转换为二维码的内容
                width: value1,
                height: value1,
                colorDark: color1,
                colorLight: "#ffffff",
                // correctLevel: QRCode.CorrectLevel.H,
            });
        },
    },
    created() {

    },
    mounted() {
        this.creatQrCode(this.color1,this.value1);
        this.todos = this.$store.getters.allTodos;
    }
}
</script>

<style lang="scss" scoped>
.qrcodemain {
    .item {
        display: flex;
        height: 36px;
        line-height: 36px;
        margin-top: 20px;

        span {
            width: 100px;
        }
    }
}
</style>