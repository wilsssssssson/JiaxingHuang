<script setup lang="ts">
import useVisible from "@/hooks/useVisible";
import { ref, onMounted } from "vue";
const container = ref<null | HTMLElement>(null);
const props = defineProps<{
	imgPath: string;
	imgAlt: string;
	companyName: string;
	jobName: string;
	time: string;
	detailPath: string;
	fontColor?: string;
	useHoverBgc?: boolean;
	useFullBgc?: boolean;
	bgc?: string;
}>();
useVisible(container, {
	onIntersect: () => {
		container.value?.classList.add("show-ani");
	},
});
const color = ref<string>("");
if (props.fontColor !== undefined) {
	color.value = props.fontColor;
}
function jump(url: string) {
	window.open(url, "_blank");
}
// hover改变整体颜色的效果，有点扎眼，不太好看，不用了就
onMounted(() => {
	if (props.useHoverBgc) {
		container.value?.addEventListener("mouseover", () => {
			if (container.value && props.bgc) {
				container.value.style.backgroundColor = props.bgc;
			}
		});
		container.value?.addEventListener("mouseleave", () => {
			if (container.value) {
				container.value.style.backgroundColor = "";
			}
		});
	}
});
</script>

<template>
	<div
		class="list-item-container"
		:style="useFullBgc && bgc ? { backgroundColor: bgc } : {}"
		ref="container"
	>
		<div class="list-item-img-container">
			<img :src="imgPath" :alt="imgAlt" />
		</div>
		<div class="list-item-desc-container">
			<p class="com-name font-base">{{ companyName }}</p>
			<p class="job-name font-base">{{ jobName }}</p>
			<p class="time font-base">{{ time }}</p>
		</div>
		<div class="icon-container">
			<el-icon :style="fontColor ? { color: fontColor } : {}" class="icon-item"
				><Right @click="jump(detailPath)"
			/></el-icon>
		</div>
	</div>
</template>

<style scoped>
.list-item-container {
	width: 45%;
	height: 100%;
	border: 1px solid var(--color-box-shadow);
	border-radius: 20px;
	transition: all 0.3s;
}

.list-item-img-container {
	display: flex;
	width: 100%;
	height: 50%;
	justify-content: center;
	align-items: center;
}

/* 本来想全卡片主题背景色的，但是有点丑有一说一 */
/* .jd-bgc{
    background-color: rgb(228,35,25);
  }

  .al-bgc{
    background-color: rgb(252,114,0);
  } */

.list-item-img-container img {
	width: 128px;
	height: 128px;
	border-radius: 20px;
}

.list-item-desc-container {
	display: flex;
	justify-content: center;
	align-items: center;
	flex-wrap: wrap;
}

.list-item-desc-container p {
	width: 100%;
	user-select: none;
	text-align: center;
}

.font-base {
	color: var(--font-main-color);
	margin-bottom: 10px;
	font-weight: 200;
}

.com-name {
	font-size: max(2.1vw, 1.3rem);
}

.job-name {
	font-size: max(1.5vw, 1.1rem);
}

.time {
	font-size: max(1.2vw, 0.8rem);
}

.icon-container {
	display: flex;
	width: 100%;
	height: 25%;
	justify-content: center;
	align-items: center;
}

.icon-item {
	font-size: max(3vw, 2rem);
	color: var(--font-main-color);
	border: 2px solid var(--font-main-color);
	border-radius: 50%;
	cursor: pointer;
	transition: all 0.3s;
}

.icon-item:hover {
	border: 2px solid var(--hover-color);
	color: var(--hover-color);
}

@keyframes show-up {
	0% {
		opacity: 0;
		transform: translateY(-3vh);
		box-shadow: none;
	}
	100% {
		opacity: 1;
		transform: translateY(0);
		box-shadow: 0px 0px 3vh var(--color-box-shadow);
	}
}

.show-ani {
	animation: show-up 1.2s ease-out 1 forwards;
}
</style>
