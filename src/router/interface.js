export default [{
    path: "/interface/qrcode",
    name: "qrcode",
    meta: {
        title: "二维码"
    },
    component: () => import('@/views/interface/qrcode'),
},{
    path: "/interface/carvos",
    name: "carvos",
    meta: {
        title: "画布"
    },
    component: () => import('@/views/carvos'),
},]