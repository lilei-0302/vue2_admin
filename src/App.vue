<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'app',
  components: {
  }
}
</script>

<style>
#app,
body,
html {
  height: 100%;
  width: 100%;
  overflow: hidden;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
html,
body,
ul,
li,
ol,
dl,
dd,
dt,
p,
h1,
h2,
h3,
h4,
h5,
h6,
form,
fieldset,
legend,
img {
  margin: 0;
  padding: 0;
}

fieldset,
img,
input,
button,
textarea {
  border: none;
  padding: 0;
  margin: 0;
  outline-style: none;
}

ul,
ol {
  list-style: none;
}

input {
  padding-top: 0;
  padding-bottom: 0;
  font-family: "SimSun", "宋体";
}

select,
input {
  vertical-align: middle;
}

select,
input,
textarea {
  font-size: 12px;
  margin: 0;
}

textarea {
  resize: none;
}

/*防止拖动*/

img {
  border: 0;
  vertical-align: middle;
  max-width: 100%;
}

/* 去掉图片低测默认的3像素空白缝隙*/

table {
  border-collapse: collapse;
}

body {
  /* font: 12px/150% Arial, Verdana, "\5b8b\4f53"; */
  /* color: #666; */
  /* background: #fff; */
}

.clearfix:before,
.clearfix:after {
  content: "";
  display: table;
}

.clearfix:after {
  clear: both;
}

.clearfix {
  /* *zoom: 1; */
  /*IE/7/6*/
}

a {
  color: #666;
  text-decoration: none;
}

/* a:hover {
color: #f2ad00;
} */

h1,
h2,
h3,
h4,
h5,
h6 {
  text-decoration: none;
  font-weight: normal;
  /* font-size: 100%; */
}

s,
i,
em {
  font-style: normal;
  text-decoration: none;
}
</style>
