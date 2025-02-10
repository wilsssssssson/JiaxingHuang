const routes = [
	{
		path: "/",
		redirect: "/index",
	},
	{
		name: "index",
		path: "/index",
		component: () => import("@/views/IndexPage/IndexPage.vue"),
		meta: { title: "飘尘-一方天地" },
		children: [],
	},
	{
		name: "projectdetail",
		path: "/projectdetail/:id",
		component: () => import("@/views/Detail/Detail.vue"),
		meta: { title: "项目详情" },
		children: [],
	},
	{
		name: "practicedetail",
		path: "/practicedetail/:id",
		component: () => import("@/views/Detail/Detail.vue"),
		meta: { title: "实习详情" },
		children: [],
	},
	{
		name: "404",
		path: "/404",
		meta: { title: "页面不见了" },
		component: () => import("@/views/NotFound/NotFound.vue"),
	},
	//写在最底部，实现找不到路径跳转到404页面
	{
		path: "/:pathMatch(.*)",
		redirect: "/404",
	},
];

export default routes;
