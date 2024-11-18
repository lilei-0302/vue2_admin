<template>
    <div id="main"></div>
</template>

<script>
import * as echarts from 'echarts';
export default {
    data() {
        return {

        }
    },
    methods: {
        echarts() {
            // 基于准备好的dom，初始化echarts实例
            var chartDom = document.getElementById('main');
            var myChart = echarts.init(chartDom);
            var option;
            option = {
                title: {
                    text: 'ECharts 柱状图',
                    subtext: '副标题',
                    left: 'center'
                },
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    orient: 'vertical',
                    left: 'left'
                },
                series: [
                    {
                        name: 'Access From',
                        type: 'pie',
                        radius: '50%',
                        data: [
                            { value: 1048, name: 'Search Engine' },
                            { value: 735, name: 'Direct' },
                            { value: 580, name: 'Email' },
                            { value: 484, name: 'Union Ads' },
                            { value: 300, name: 'Video Ads' }
                        ],
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            };
            option && myChart.setOption(option);
        }
    },
    created() {

    },
    mounted() {
        this.echarts();
    }
}
</script>

<style lang="scss" scoped>
#main {
    width: 100%;
    height: 500px;
}
</style>