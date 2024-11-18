// http.js
import axios from 'axios';

// 创建 axios 实例
const instance = axios.create({
  baseURL: 'https://api.vvhan.com/api',  // 替换为你的API地址
  timeout: 10000,  // 请求超时时间
});

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么，比如加入token等
    const token = localStorage.getItem('token');  // 获取 token
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;  // 设置 Authorization header
    }
    return config;
  },
  (error) => {
    // 请求错误处理
    return Promise.reject(error);
  }
);

// 响应拦截器
instance.interceptors.response.use(
  (response) => {
    // 对响应数据做些什么
    return response.data;  // 直接返回数据，去掉多余的响应结构
  },
  (error) => {
    // 响应错误处理
    const status = error.response ? error.response.status : null;
    if (status === 401) {
      // 401 错误，跳转到登录页
      console.error('未授权，请登录');
      // 这里可以跳转到登录页面
    } else if (status === 500) {
      console.error('服务器错误');
    } else {
      console.error(error.message || '网络错误');
    }
    return Promise.reject(error);
  }
);

// 封装 GET、POST 等请求方法
const http = {
  get(url, params = {}) {
    return instance.get(url, { params });
  },
  post(url, data = {}) {
    return instance.post(url, data);
  },
  put(url, data = {}) {
    return instance.put(url, data);
  },
  delete(url, params = {}) {
    return instance.delete(url, { params });
  }
};

export default http;
