<template>
    <div>
        <div id="main"></div>
    </div>
</template>

<script>
import * as echarts from 'echarts';
export default {
    data() {
        return {
            todos: "",
        }
    },
    methods: {
        echarts() {
            // 基于准备好的dom，初始化echarts实例
            var myChart = echarts.init(document.getElementById('main'));
            // 绘制图表
            myChart.setOption({
                legend: {},
                title: {
                    text: 'ECharts 柱状图'
                },
                tooltip: {},
                dataset: {
                    // 提供一份数据。
                    source: [
                        ['product', '2015', '2016', '2017'],
                        ['Matcha Latte', 43.3, 85.8, 93.7],
                        ['Milk Tea', 83.1, 73.4, 55.1],
                        ['Cheese Cocoa', 86.4, 65.2, 82.5],
                        ['Walnut Brownie', 72.4, 53.9, 39.1]
                    ]
                },
                // 声明一个 X 轴，类目轴（category）。默认情况下，类目轴对应到 dataset 第一列。
                xAxis: { type: 'category' },
                // 声明一个 Y 轴，数值轴。
                yAxis: {},
                // 声明多个 bar 系列，默认情况下，每个系列会自动对应到 dataset 的每一列。
                series: [{ type: 'bar' }, { type: 'bar' }, { type: 'bar' }]
            });
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