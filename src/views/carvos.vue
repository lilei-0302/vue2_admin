<template>
    <div>
      <canvas ref="canvas" width="800" height="600"></canvas>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        lineData: [],        // 存储折线数据
        maxPoints: 100,      // 最大显示的点数
        currentY: 0,         // 当前y值，用于模拟数据的上升
        maxY: 400,           // 最大Y轴值
        minY: 100,           // 最小Y轴值
        deltaY: 2,           // 每次Y轴的变化
        undoing: false,      // 是否正在进行回退
        lastUpdateTime: Date.now(),
      }
    },
    computed: {
      canvas() {
        return this.$refs.canvas;
      }
    },
    methods: {
      // 初始化画布和折线数据
      initCanvas() {
        this.ctx = this.canvas.getContext('2d');
        this.lineData = [];
        this.animateLine();
      },
  
      // 画坐标轴
      drawAxes() {
        const ctx = this.ctx;
        const width = this.canvas.width;
        const height = this.canvas.height;
  
        // 绘制 X 轴
        ctx.beginPath();
        ctx.moveTo(0, height / 2);
        ctx.lineTo(width, height / 2);
        ctx.strokeStyle = '#000';
        ctx.stroke();
  
        // 绘制 Y 轴
        ctx.beginPath();
        ctx.moveTo(width / 2, 0);
        ctx.lineTo(width / 2, height);
        ctx.strokeStyle = '#000';
        ctx.stroke();
      },
  
      // 绘制折线图
      drawLine() {
        const ctx = this.ctx;
        const width = this.canvas.width;
        const height = this.canvas.height;
        const numPoints = this.lineData.length;
  
        ctx.beginPath();
        ctx.strokeStyle = 'blue';
        ctx.lineWidth = 2;
  
        // 绘制折线
        for (let i = 0; i < numPoints; i++) {
          const point = this.lineData[i];
          const x = (i / (numPoints - 1)) * width;
          const y = height / 2 - point.y;
  
          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
  
          // 绘制数据点
          ctx.beginPath();
          ctx.arc(x, y, 4, 0, Math.PI * 2);
          ctx.fillStyle = 'red';
          ctx.fill();
        }
  
        ctx.stroke();
      },
  
      // 更新折线图数据
      updateLineData() {
        if (this.lineData.length > this.maxPoints) {
          this.lineData.shift(); // 移除最旧的点
        }
        this.lineData.push({ x: this.lineData.length, y: this.currentY });
  
        // 模拟Y值的变化
        this.currentY += this.deltaY;
        if (this.currentY > this.maxY) {
          this.currentY = this.minY; // Y值达到最大时回到最小
        }
      },
  
      // 处理撤回（回退）折线数据
      undoLine() {
        if (this.lineData.length > 0) {
          this.lineData.pop(); // 移除最后一个点
        }
      },
  
      // 动画循环
      animateLine() {
        const now = Date.now();
        const deltaTime = now - this.lastUpdateTime;
        this.lastUpdateTime = now;
  
        // 清空画布
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  
        // 绘制坐标轴
        this.drawAxes();
  
        // 更新折线数据
        this.updateLineData();
  
        // 绘制折线
        this.drawLine();
  
        // 如果正在回退，则执行回退
        if (this.undoing) {
          this.undoLine();
        }
  
        // 请求下一帧动画
        requestAnimationFrame(this.animateLine);
      },
  
      // 启动回退操作
      startUndo() {
        this.undoing = true;
      },
  
      // 停止回退操作
      stopUndo() {
        this.undoing = false;
      }
    },
  
    mounted() {
      this.initCanvas();
  
      // 模拟每秒钟折线的上升
      setInterval(() => {
        this.deltaY = Math.random() > 0.5 ? 2 : -2; // 模拟随机的上升和下降
      }, 1000);
  
      // 模拟每3秒触发一次回退
      setInterval(() => {
        if (this.lineData.length > 0) {
          this.startUndo();
          setTimeout(() => {
            this.stopUndo();
          }, 500); // 回退持续0.5秒
        }
      }, 3000);
    }
  }
  </script>
  
  <style scoped>
  canvas {
    border: 1px solid #ddd;
  }
  </style>
  