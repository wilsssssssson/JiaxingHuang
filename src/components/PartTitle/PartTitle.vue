<script setup lang="ts">
import { ref } from "vue";
import useVisible from "@/hooks/useVisible";
const titleContainer = ref<HTMLElement | null>(null);
const props = withDefaults(
	defineProps<{
		title: string;
		needAni?: boolean;
	}>(),
	{
		needAni: true,
	}
);
if (props.needAni) {
	useVisible(titleContainer, {
		onIntersect: () => {
			if (titleContainer.value) {
				titleContainer.value.classList.add("ani");
			}
		},
	});
}
</script>

<template>
	<div class="part-title-container" ref="titleContainer">
		{{ title }}
	</div>
</template>

<style scoped>
@keyframes getDown {
	0% {
		opacity: 0;
		top: -5vh;
	}
	100% {
		opacity: 1;
		top: 5vh;
	}
}

.part-title-container {
	position: absolute;
	opacity: 0;
	left: 50%;
	transform: translateX(-50%);
	font-weight: var(--font-weight);
	font-size: max(1.1rem, 2.2vw);
	color: var(--font-main-color);
	transition: all 0.4s;
	z-index: 1;
	user-select: none;
}

.ani {
	animation: getDown 0.8s ease-out 1 forwards;
}
</style>
