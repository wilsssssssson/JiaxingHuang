<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import MdViewer from "@/components/MdViewer/MdViewer.vue";
import { chatRoom, myIndex, examples, jd, al } from "./content/content.ts";
import setCss from "@/tools/setCss.ts";
const router = useRoute();
const { id } = router.params;
const title = ref<string>("");
const text = ref<string>("");
switch (id) {
	case "1": {
		document.title = "聊天室-详情";
		title.value = "聊天室";
		text.value = chatRoom;
		break;
	}
	case "2": {
		document.title = "个人主页-详情";
		title.value = "个人主页";
		text.value = myIndex;
		break;
	}
	case "3": {
		document.title = "小实例们-详情";
		title.value = "小实例们";
		text.value = examples;
		break;
	}
	case "jd": {
		document.title = "京东实习-详情";
		title.value = "京东实习";
		text.value = jd;
		break;
	}
	case "al": {
		document.title = "阿里淘天实习-详情";
		title.value = "阿里淘天实习";
		text.value = al;
		break;
	}
}
const theme = ref<"light" | "dark">("light");
const dayNight = localStorage.getItem("dayOrNight");
if (dayNight) {
	if (dayNight === "day") {
		theme.value = "light";
	} else {
		theme.value = "dark";
	}
} else {
	theme.value = "light";
}

onMounted(() => {
	setCss(dayNight === "day");
});
</script>

<template>
	<div class="detail-container">
		<div class="main-title-container">
			<span class="main-title">{{ title }}</span>
		</div>
		<div class="detail-main">
			<MdViewer :theme="theme" :text="text" />
		</div>
	</div>
</template>

<style scoped>
.detail-container {
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
	align-content: space-around;
	width: 100%;
	min-height: 100vh;
	background-color: var(--overall-background-color);
	color: var(--font-main-color);
}

.main-title-container {
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
}

.main-title {
	position: relative;
	text-align: center;
	font-size: max(2.2vw, 2rem);
	font-weight: 300;
	user-select: none;
}

.main-title::before {
	position: absolute;
	content: "";
	width: 8px;
	height: 100%;
	left: -20px;
	background-color: var(--scroll-block-color);
}

.main-title::after {
	position: absolute;
	content: "";
	width: 8px;
	height: 100%;
	right: -20px;
	background-color: var(--scroll-block-color);
}

.detail-main {
	width: 70vw;
	height: 80vh;
	border: 1px solid var(--color-box-shadow);
	border-radius: 20px;
	box-shadow: 0 0 15px 10px var(--color-box-shadow);
	overflow: auto;
	background-color: var(--theme-now);
}

@media screen and (max-width: 500px) {
	.detail-main {
		width: 90vw;
	}
}
</style>
