export default [{
    path: "/interface/qrcode",
    name: "二维码",
    component: () => import('@/views/interface/qrcode'),
},{
    path: "/interface/carvos",
    name: "画布",
    component: () => import('@/views/carvos'),
},]