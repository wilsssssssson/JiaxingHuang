<script setup lang="ts">
import ImgDescCard from "../ImgDescCard/ImgDescCard.vue";

defineProps<{
	practices: {
		imgPath: string;
		imgAlt: string;
		companyName: string;
		jobName: string;
		time: string;
		detailPath: string;
		show: boolean;
	}[];
}>();
</script>

<template>
	<div class="list-container">
		<ImgDescCard
			v-for="(item, index) in practices"
			v-show="item.show"
			:key="index"
			:img-path="item.imgPath"
			:img-alt="item.imgAlt"
			:company-name="item.companyName"
			:job-name="item.jobName"
			:time="item.time"
			:detail-path="item.detailPath"
			class="media-item"
		/>
	</div>
</template>

<style scoped>
.list-container {
	position: relative;
	top: 3vh;
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 3%;
	width: 70%;
	height: 75%;
	transition: all 0.4s;
}

@media screen and (max-width: 850px) {
	.list-container {
		justify-content: center;
	}
	.media-item {
		width: 90%;
	}
}
</style>
