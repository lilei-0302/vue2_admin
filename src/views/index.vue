<template>
    <div class="page" ref="fullscreenElement">
        <div class="side" :class="{ 'side-collapse': isCollapse }">
            <el-menu :unique-opened="uniqueOpened" :collapse="isCollapse" :background-color="style.backgroundColor"
                :text-color="style.textColor" :active-text-color="style.activeTextColor">
                <!-- 循环渲染主菜单项 -->
                <el-submenu v-for="menu in menuList" :index="menu.mid" :key="menu.mid">
                    <!-- 渲染菜单的标题 -->
                    <template slot="title">
                        <i :class="menu.icon"></i>
                        <span>{{ menu.title }}</span>
                    </template>

                    <!-- 循环渲染子菜单项 -->
                    <el-menu-item-group v-for="menuitem in menu.menu_item" :key="menuitem.mid">
                        <el-menu-item :index="menuitem.path" :key="menuitem.mid"
                            @click="navigateTo(menu.title, menuitem.submenu, menuitem.path)">
                            {{ menuitem.submenu }}
                        </el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
            </el-menu>
        </div>
        <div class="main" :class="{ 'main-collapse': isCollapse }">
            <div class="title">
                <i v-if="isCollapse == false" class="iconfont el-icon-s-fold" @click="isCollapse = true"></i>
                <i v-else class="iconfont el-icon-s-unfold" @click="isCollapse = false"></i>
                <div class="breadcrumb">
                    <el-breadcrumb separator-class="el-icon-arrow-right">
                        <el-breadcrumb-item>首页</el-breadcrumb-item>
                        <el-breadcrumb-item v-if="titlecrumb1">{{ titlecrumb1 }}</el-breadcrumb-item>
                        <el-breadcrumb-item v-if="titlecrumb2">{{ titlecrumb2 }}</el-breadcrumb-item>
                    </el-breadcrumb>
                </div>
                <div class="admin">
                    <!-- <el-button @click="toggleTheme">切换主题</el-button> -->
                    <i @click="toggleFullScreen" class="el-icon-full-screen"></i>
                    <el-dropdown>
                        <span class="el-dropdown-link">
                            <i class="el-icon-user"></i>
                            超级管理员
                            <i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>修改密码</el-dropdown-item>
                            <el-dropdown-item>退出登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </div>
            <div style="margin-top: 50px;">
                <!-- 当前路由的组件会渲染到这里 -->
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>
<script :src="srcimg"></script>
<script>
import axios from '../components/axios';  // 导入封装好的 http.js
export default {
    data() {
        return {
            titlecrumb1: "",
            titlecrumb2: "",
            isCollapse: false,
            uniqueOpened: true,
            style: {
                backgroundColor: "#304156",
                textColor: "#bfcbd9",
                activeTextColor: "#409EFF"
            },
            isCollapse: false,
            menuList: [
                {
                    title: '界面',
                    icon: 'el-icon-location',
                    mid: "1",  // 主菜单的唯一标识
                    menu_item: [
                        {
                            submenu: '二维码',  // 子菜单名称
                            path: '/interface/qrcode'    // 子菜单对应的路径
                        },
                        {
                            submenu: '画布',
                            path: '/interface/carvos'
                        }
                    ]
                }, {
                    title: 'ECharts图表',
                    icon: 'el-icon-s-data',
                    mid: "2",  // 主菜单的唯一标识
                    menu_item: [
                        {
                            submenu: '柱状图',  // 子菜单名称
                            path: '/ECharts/bar'    // 子菜单对应的路径
                        },
                        {
                            submenu: '饼图',
                            path: '/ECharts/pie'
                        }, {
                            submenu: '折线图',
                            path: '/ECharts/line'
                        }
                    ]
                }, {
                    title: '内置内容',
                    icon: 'el-icon-s-operation',
                    mid: "3",  // 主菜单的唯一标识
                    menu_item: [
                        {
                            submenu: '内置指令',  // 子菜单名称
                            path: '/builtIn/order'    // 子菜单对应的路径
                        },
                    ]
                }
            ],
        }
    },
    watch: {

    },
    methods: {
        toggleTheme() {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', newTheme);
            // 可选：将用户选择的主题保存到 localStorage 中，以便下次加载时记住用户的偏好
            localStorage.setItem('theme', newTheme);
        },
        toggleFullScreen() {
            const elem = this.$refs.fullscreenElement;
            if (!document.fullscreenElement) {
                // 进入全屏
                if (elem.requestFullscreen) {
                    elem.requestFullscreen();
                } else if (elem.mozRequestFullScreen) { // Firefox
                    elem.mozRequestFullScreen();
                } else if (elem.webkitRequestFullscreen) { // Chrome, Safari, Opera
                    elem.webkitRequestFullscreen();
                } else if (elem.msRequestFullscreen) { // IE/Edge
                    elem.msRequestFullscreen();
                }
            } else {
                // 退出全屏
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.mozCancelFullScreen) { // Firefox
                    document.mozCancelFullScreen();
                } else if (document.webkitExitFullscreen) { // Chrome, Safari, Opera
                    document.webkitExitFullscreen();
                } else if (document.msExitFullscreen) { // IE/Edge
                    document.msExitFullscreen();
                }
            }
        },
        handleOpen(key, keyPath) {
            console.log("菜单打开", key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log("菜单关闭", key, keyPath);
        },
        navigateTo(title, title2, path) {
            this.titlecrumb1 = title;
            this.titlecrumb2 = title2;
            // 使用 Vue Router 跳转到指定路径
            this.$router.replace(path).catch((err) => {
                if (err.name !== 'NavigationDuplicated') {
                    // 处理其他类型的错误
                    console.error(err);
                }
            });
        },
    },
    created() {
        console.log(this.$route.matched);

    },
    mounted() {
        // 尝试从 localStorage 恢复用户偏好的主题
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);
    },
}
</script>

<style lang="scss" scoped>
.page {
    button {
        padding: 10px 20px;
        font-size: 16px;
        cursor: pointer;
    }

    /* 你可以在这里添加自定义样式 */
    .page {
        position: relative;
        width: 100%;
        height: 100%;
        overflow: hidden;
    }

    .side {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        width: 200px;
        overflow: auto;
        transition: width 0.5s;
        background: #001b36;
    }

    .side-collapse {
        width: 64px;
    }

    .side .el-menu {
        border: none;
    }

    .main {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 200px;
        transition: left 0.5s;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        min-width: 400px;
        background-color: #fff;
    }

    .main-collapse {
        left: 64px;
    }

    .title {
        position: absolute;
        height: 50px;
        top: 0;
        left: 0;
        right: 0;
        background: #fff;
    }

    .title::after {
        content: " ";
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        border-bottom: 1px solid #f2f2f2;
    }

    .iconfont {
        position: absolute;
        top: 10px;
        left: 10px;
        height: 30px;
        width: 30px;
        line-height: 30px;
        text-align: center;
        font-size: 26px;
        cursor: pointer;
        transition: transform 0.5s;
    }

    .admin {
        position: absolute;
        top: 10px;
        right: 10px;

        i {
            height: 30px;
            width: 30px;
            line-height: 30px;
            font-size: 20px;
            font-weight: bold;
            text-align: center;
        }
    }

    .breadcrumb {
        position: absolute;
        top: 10px;
        left: 50px;
        font-size: 26px;
        height: 30px;
        line-height: 30px;

        .el-breadcrumb {
            height: 30px;
            line-height: 30px;
        }
    }
}
</style>
