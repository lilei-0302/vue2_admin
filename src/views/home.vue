<template>
    <div class="home-main">
        <div>
          <img class="urlimg" :src="urlimg" alt="头像" loading="lazy">  
          <span>超级管理员</span>
        </div>
        <el-card class="dayEnglish" shadow="hover">
            <div class="title">每天一句励志英语</div>
            <div class="" style="text-align: center;margin: 10px 0;">
                <div class="en">{{ dayEnglish.en }}</div>
                <div class="zh">{{ dayEnglish.zh }}</div>
                <img :src="dayEnglish.pic" alt="">
            </div>
        </el-card>
        <el-card class="box-card" shadow="hover">
            <div class="baiduRD">
                <div class="title">百度热点热榜 <span @click="normal"><i class="el-icon-refresh"></i>换一换</span></div>
                <div v-for="item in currentGroupData" :key="item.index" class="item">
                    <a :href="item.url">
                        <span class="index">{{ item.index }}&nbsp;&nbsp;</span>
                        <span>{{ item.title }}</span>
                    </a>
                </div>
            </div>
        </el-card>
    </div>
</template>

<script>
import axios from '../components/axios';  // 导入封装好的 http.js
export default {
    name: 'HomeMain',
    data() {
        return {
            urlimg: '',
            baiduRDList: [],
            // 当前显示的组（1-3）
            currentGroup: 1,
            dayEnglish: "",
        }
    },
    computed: {
        // 当前展示的数据，基于当前的组
        currentGroupData() {
            const groupSize = 10; // 每组 10 条数据
            const start = (this.currentGroup - 1) * groupSize;
            const end = start + groupSize;
            return this.baiduRDList.slice(start, end);
        }
    },
    methods: {
        normal() {
            // 切换到下一组，如果已经是最后一组则回到第一组
            this.currentGroup = this.currentGroup === 3 ? 1 : this.currentGroup + 1;
        },
        // 头像接口
        async fetchUserData() {
            try {
                const rs = await axios.get('/avatar/dm', {
                    type: 'json',
                    size: '600',
                    rand: 'sj'
                });  // 调用封装的 get 方法
                this.urlimg = rs.url;
            } catch (error) {
                console.error('请求用户数据失败:', error);
            }
        },
        // 热点接口
        async baiduRD() {
            try {
                const rs = await axios.get('/hotlist/baiduRD');  // 调用封装的 get 方法
                this.baiduRDList = rs.data;
            } catch (error) {
                console.error('请求用户数据失败:', error);
            }
        },
        // 励志英语接口
        async dailyEnglish() {
            try {
                const rs = await axios.get('/dailyEnglish');  // 调用封装的 get 方法
                this.dayEnglish = rs.data;
            } catch (error) {
                console.error('请求用户数据失败:', error);
            }
        }
    },
    created() {

    },
    mounted() {
        this.fetchUserData();
        setInterval(() => {
            this.fetchUserData();
        }, 100000);
        this.baiduRD();
        this.dailyEnglish();
    },
}
</script>

<style scoped lang="scss">
.home-main {
    .urlimg {
        margin: 10px 20px;
        width: 100px;
        height: 100px;
        border-radius: 50%;
    }

    .box-card {
        position: absolute;
        top: 60px;
        right: 10px;
        width: 350px;
    }

    .baiduRD {
        width: 350px;
        height: 340px;

        .title {
            position: relative;

            span {
                cursor: pointer;
                position: absolute;
                top: 0px;
                right: 35px;
            }

            span:hover {
                color: #315EFB;
            }
        }

        .item {
            width: 250px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            margin: 15px 0px;

            .index {
                color: #000;
            }

            .index:nth-child(1) {
                color: #fe2d46;
            }

            .index:nth-child(2) {
                color: #f60;
            }

            .index:nth-child(3) {
                color: #faa90e;
            }
        }
    }

    // 英语
    .dayEnglish {
        margin-left: 10px;
        width: 400px;
        .title{
            font-size: 20px;
            font-weight: bold;
        }
        .en{
            font-weight: bold;
        }
        img {
            width: 150px;
        }
    }
}
</style>