import axios from "axios";

// 创建并配置一个新的axios
const service = axios.create({
	timeout: 60000, // 请求超时时间 毫秒
	withCredentials: true, // 异步请求时是否携带cookie
});

// 添加请求拦截器
service.interceptors.request.use(
	(config) => {
		return config;
	},
	(error) => {
		// 对请求错误做些什么
		return Promise.reject(error);
	}
);

// 添加响应拦截器
service.interceptors.response.use(
	(response) => {
		const res = response.data;
		if (res.code == 401) {
			return Promise.reject(new Error(res.msg || "Error"));
		} else {
			return res;
		}
	},
	(error) => {
		return Promise.reject(error);
	}
);

export default service;
