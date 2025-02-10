<script setup lang="ts">
import { onMounted, ref } from "vue";
import usePassiveScroll from "@/hooks/usePassiveScroll";
import titleAndPath from "@/config/TitleAndPath";
import setCss from "@/tools/setCss";
import IndexHeader from "./components/IndexHeader/IndexHeader.vue";
import IndexCanvas from "./components/IndexCanvas/IndexCanvas.vue";
import IndexPre from "./components/IndexPre/IndexPre.vue";
import IndexProject from "./components/IndexProject/IndexProject.vue";
import IndexPractice from "@/views/IndexPage/components/IndexPractice/IndexPractice.vue";
import IndexContract from "./components/IndexContract/IndexContract.vue";
import IndexEnd from '@/views/IndexPage/components/IndexEnd/IndexEnd.vue'

const container = ref<HTMLElement | null>(null);
usePassiveScroll(titleAndPath);
onMounted(() => {
	// 根据读取到的内容变样式
	if (localStorage.getItem("dayOrNight")) {
		setCss(localStorage.getItem("dayOrNight") === "day");
	} else {
		setCss(true);
	}
});
</script>

<template>
	<div class="index-container" ref="container">
		<IndexHeader />
		<IndexCanvas id="prod" />
		<IndexPre id="pre" />
		<IndexProject id="project" />
		<IndexPractice id="practice" />
		<IndexContract id="contract" />
		<IndexEnd id="end" />
	</div>
</template>

<style scoped>
.index-container {
	position: relative;
	width: 100%;
	min-height: 100vh;
	background-color: var(--overall-background-color);
	transition: all 0.4s;
}
</style>
