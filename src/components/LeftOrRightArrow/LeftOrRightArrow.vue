<script setup lang="ts">
// 左右箭头组件，使用时需要确保父容器添加了相对定位
defineProps<{
	leftOrRight: "left" | "right";
}>();
</script>

<template>
	<el-icon
		color="var(--font-main-color)"
		class="base"
		:class="leftOrRight === 'left' ? 'left' : 'right'"
	>
		<ArrowLeft v-if="leftOrRight === 'left'" />
		<ArrowRight v-else-if="leftOrRight === 'right'" />
	</el-icon>
</template>

<style scoped>
.base {
	position: absolute;
	top: 50%;
	transform: translateY(-50%);
	cursor: pointer;
	font-size: max(3vw, 2rem);
	transition: all 0.2s;
}

.left {
	left: 0;
}

.right {
	right: 0;
}

.base:hover {
	color: var(--hover-color);
}
</style>
