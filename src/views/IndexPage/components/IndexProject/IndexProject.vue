<script setup lang="ts">
import { ref } from "vue";
import PartTitle from "@/components/PartTitle/PartTitle.vue";
import titleAndPath from "@/config/TitleAndPath";
import useVisible from "@/hooks/useVisible";

const projectList = ref<HTMLElement | null>(null);
const items = ref<HTMLElement[]>([]);

const projects = ref([
	// 项目的列表
	{
		name: "贤得家酒店管理平台",
		tags: [
			{
				type: "img",
				alt: "Vue",
				value: "/img/vue.png",
			},
			{
				type: "img",
				alt: "Elementplus",
				value: "/img/elementplus.svg",
			},
		],
	},
	{
		name: "百盟智慧校园",
		tags: [
			{
				type: "img",
				alt: "Vue",
				value: "/img/vue.png",
			},
			{
				type: "img",
				alt: "Elementplus",
				value: "/img/elementplus.svg",
			},
		],
	},
	{
		name: "电梯管理与应急处置平台",
		tags: [
			{
				type: "img",
				alt: "Vue",
				value: "/img/vue.png",
			},
			{
				type: "img",
				alt: "Elementplus",
				value: "/img/elementplus.svg",
			},
		],
	},
	{
		name: "聊天室",
		tags: [
			{
				type: "url",
				value: "/projectdetail/1",
			},
			{
				type: "img",
				alt: "Vue",
				value: "/img/vue.png",
			},
			{
				type: "img",
				alt: "Express",
				value: "/img/express.png",
			},
			{
				type: "img",
				alt: "Mongodb",
				value: "/img/mongodb.png",
			},
		],
	},
	{
		name: "个人主页（本网页）",
		tags: [
			{
				type: "url",
				value: "/projectdetail/2",
			},
			{
				type: "img",
				alt: "Vue",
				value: "/img/vue.png",
			},
			{
				type: "img",
				alt: "Vite",
				value: "/img/vite.svg",
			},
			{
				type: "img",
				alt: "TS",
				value: "/img/ts.svg",
			},
			{
				type: "img",
				alt: "three",
				value: "/img/threejs.svg",
			},
		],
	},
	{
		name: "各种小实例(大部分都是原生写的)",
		tags: [
			{
				type: "url",
				value: "/projectdetail/3",
			},
		],
	},
]);

type projectItems = {
	name: string;
	tags: (
		| {
				type: string;
				value: string;
				alt?: undefined | string;
		  }
		| {
				type: string;
				alt: string;
				value: string;
		  }
	)[];
};

useVisible(projectList, {
	onIntersect: () => {
		projectList.value?.classList.add("ani-show-up");
		items.value.forEach((item, index) => {
			item.style.animationDelay = `0.${index}s`;
			item.classList.add("setp-in-ani");
		});
	},
});

function dealNext(item: projectItems) {
	let temp = item.tags.find((i) => i.type === "url");
	if (temp) {
		window.open(temp.value, "_blank");
	}
}

function hasURL(item: projectItems) {
	let temp = item.tags.find((i) => i.type === "url");
	if (temp) {
		return true;
	} else {
		return false;
	}
}
</script>

<template>
	<div class="index-project-container">
		<PartTitle :title="titleAndPath[2].name" class="title-project" />
		<div class="index-project-list" ref="projectList">
			<div class="index-project-item-container">
				<!-- 暂时这样看看效果 -->
				<div
					class="index-project-item"
					v-for="(item, index) in projects"
					:key="index"
					ref="items"
					@click="dealNext(item)"
					:style="hasURL(item) ? { cursor: 'pointer' } : {}"
				>
					<p
						class="project-name"
						:class="hasURL(item) ? 'project-name-click' : ''"
					>
						{{ item.name }}
					</p>
					<div class="project-tags">
						<template v-for="tag in item.tags">
							<img
								v-if="tag.type === 'img'"
								:src="tag.value"
								:alt="tag.alt"
								class="project-tag-img"
							/>
							<span v-if="tag.type === 'url'" class="project-tag-url">
								可访问
							</span>
						</template>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
.index-project-container {
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 90vh;
	background-color: transparent;
}

.index-project-list {
	display: flex;
	justify-content: center;
	align-items: center;
	opacity: 0;
	width: 80vw;
	height: 60vh;
	border: 1px solid var(--color-box-shadow);
	border-radius: 20px;
	transition: all 0.4s;
}

.index-project-item-container {
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	align-content: flex-start;
	width: 70%;
	height: 90%;
	overflow-x: hidden;
	overflow-y: auto;
}

.index-project-item {
	opacity: 0;
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	height: 8vh;
	border-bottom: 1px solid var(--solid-color);
	color: var(--font-main-color);
	transition: all 0.2s;
}

.index-project-item:hover {
	color: var(--hover-color);
	/* background-color: var(--solid-color); */
}

.project-name {
	padding-left: 0.5vw;
	width: 50%;
	font-size: max(1.1vw, 1rem);
	font-weight: 600;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	user-select: none;
}

.project-name-click {
	font-weight: 600;
}

.project-tags {
	width: 40%;
	height: 100%;
	display: flex;
	justify-content: flex-end;
	align-items: center;
}

.project-tag-img {
	width: 24px;
	height: 24px;
	margin-left: 1vw;
}

/* .project-tag-icon{
    font-size: 24px;
    margin: 1vw;
  } */

@keyframes show-up {
	0% {
		opacity: 0;
		box-shadow: none;
	}

	100% {
		opacity: 1;
		box-shadow: 0px 0px 3vh var(--color-box-shadow);
	}
}

.ani-show-up {
	animation: show-up 1.3s ease-out 1 forwards;
}

.project-tag-url {
	width: 64px;
	padding: 2px;
	font-size: 16px;
	border: 1px solid var(--hover-color);
	color: var(--hover-color);
	font-weight: 300;
	text-align: center;
	cursor: pointer;
	transition: all 0.2s;
}

.project-tag-url:hover {
	background-color: var(--hover-color);
	color: var(--overall-background-color);
}

/* 进入的动画 */
@keyframes item-in {
	0% {
		opacity: 0;
		transform: translate(4vw, -4vh);
	}

	100% {
		opacity: 1;
		transform: translate(0, 0);
	}
}

@keyframes ftc {
	0%,
	100% {
		color: var(--hover-color);
	}

	50% {
		color: var(--font-main-color);
	}
}

.setp-in-ani {
	animation: item-in 1s ease-out 1 forwards;
}

@media screen and (max-width: 768px) {
	/* 768更改展示形态 */
	.title-project::before {
		content: "";
		position: absolute;
		left: -2vh;
		width: 8%;
		height: 100%;
		background-color: var(--scroll-block-color);
	}

	.project-tag-img {
		width: 16px;
		height: 16px;
	}

	/* .project-tag-icon{
      font-size: 16px;
    } */

	.project-tag-url {
		width: 48px;
		font-size: 14px;
	}

	.index-project-list {
		width: 90vw;
	}
}

@media screen and (max-width: 530px) {
	.project-tags {
		display: none;
	}

	.project-name {
		width: 100%;
	}

	.project-name-click {
		animation: ftc 5s ease-in-out infinite;
	}
}
</style>
