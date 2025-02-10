/**
 * 锚点数组，每一个小页面的标题及其路径信息
 */
const titleAndPath = [
	{
		name: "首屏",
		path: "#prod",
	},
	{
		name: "关于",
		path: "#pre",
	},
	{
		name: "项目经历",
		path: "#project",
	},
	{
		name: "实习经历",
		path: "#practice",
	},
	{
		name: "联系我",
		path: "#contract",
	},
	{
		name: "最后",
		path: "#end",
	},
];

export default titleAndPath;

/**
 * 去掉首屏信息的锚点数组
 */
export const partTitleAndPath = titleAndPath.filter((_, index) => index !== 0);
