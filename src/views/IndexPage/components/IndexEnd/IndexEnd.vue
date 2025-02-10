<script setup lang="ts">
import createMeteorAndStarsEffect from "@/tools/createStarCanvas";
import useVisible from "@/hooks/useVisible";
import { onMounted, onUnmounted, ref } from "vue";

const color = ref();

if (localStorage.getItem("dayOrNight")) {
	if (localStorage.getItem("dayOrNight") === "day") {
		color.value = "rgb(220,220,220)";
	} else {
		color.value = "rgb(255,255,255)";
	}
} else {
	color.value = "rgb(220,220,220)";
}
const container = ref<HTMLElement | null>(null);
const canvasExec = ref();
useVisible(container, {
	onIntersect: () => {
		container.value?.classList.add("ani-show-up");
	},
});
const text = ref<string>("脚踏实地，仰望星空。规格严格，功夫到家。");
const circle = ref<HTMLElement | null>(null);

onMounted(() => {
	canvasExec.value = createMeteorAndStarsEffect(
		"canvas",
		color.value,
		color.value,
		1,
		250
	)();
	if (circle.value) {
		for (let i = 0; i < text.value.length; i++) {
			//循环文本 取出单字
			let letter = text.value.charAt(i);
			// 创建span元素 把letter赋给span
			const span = document.createElement("span");
			span.innerHTML = letter;
			span.classList.add("end-text");
			// 计算每一个字的旋转角度
			let r = (360 / text.value.length) * i;
			span.style.position = "absolute";
			span.style.left = "0";
			span.style.right = "0";
			span.style.top = "0";
			span.style.bottom = "0";
			span.style.transform = "rotate(" + r + "deg)";
			//追加span
			circle.value.appendChild(span);
		}
	}
});
onUnmounted(() => {
	cancelAnimationFrame(canvasExec.value);
});
</script>

<template>
	<div class="end-container">
		<canvas id="canvas"></canvas>
		<div ref="container" class="end-content-container">
			<p class="end-title">- The End -</p>
			<p class="end-author">-- By PiaoChen</p>
			<div class="end-text-container" ref="circle">
				<img
					src="http://www.hit.edu.cn/_upload/article/images/d3/ec/8fcaa5d24cb59a8e9660324ef50b/735df70a-538b-4bd6-8e52-3f373085a616.png"
					alt="HIT"
				/>
			</div>
		</div>
	</div>
</template>

<style scoped>
.end-container {
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 90vh;
	background-color: transparent;
}

.end-container canvas {
	display: block;
	width: 100%;
	height: 100%;
}

.end-content-container {
	display: flex;
	justify-content: center;
	align-content: flex-start;
	flex-wrap: wrap;
	position: absolute;
	width: 60vw;
	height: 60vh;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
	z-index: 10;
	background-color: var(--overall-background-color);
	border: 1px solid var(--color-box-shadow);
	border-radius: 20px;
	transition: all 0.4s;
	user-select: none;
}

@keyframes show-up {
	0% {
		top: 48%;
		box-shadow: none;
	}

	100% {
		top: 50%;
		box-shadow: 0px 0px 3vh var(--color-box-shadow);
	}
}

.ani-show-up {
	animation: show-up 1s ease-out 1 forwards;
}

.end-content-container p {
	color: var(--font-main-color);
}

.end-title {
	margin-top: 3vh;
	font-size: max(1.8vw, 1.6rem);
	font-weight: 300;
}

.end-author {
	width: 100%;
	display: flex;
	justify-content: flex-end;
	align-items: center;
	margin-right: 15vw;
	font-size: max(1.4vw, 1.2rem);
	font-weight: 300;
	margin-bottom: 10vh;
}

.end-text-container {
	position: relative;
	width: 30vh;
	height: 30vh;
	border-radius: 50%;
	color: var(--font-main-color);
	font-size: max(1.5vw, 1.3rem);
	font-weight: 300;
	text-align: center;
	animation: spin 20s linear infinite;
}

@keyframes spin {
	0% {
		transform: rotate(360deg);
	}
	100% {
		transform: rotate(0);
	}
}

.end-text-container img {
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%) rotate(-105deg);
	width: 128px;
	height: 128px;
	border-radius: 50%;
	object-fit: cover;
}

@media screen and (max-width: 530px) {
	.end-content-container{
		width: 95%;
	}
}
</style>
