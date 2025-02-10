<script setup lang="ts">
import { MdPreview, Themes } from "md-editor-v3";
import "md-editor-v3/lib/preview.css";
defineProps<{
	text: string;
	theme: Themes | undefined;
}>();
</script>

<template>
	<MdPreview editorId="preview-only" :modelValue="text" :theme="theme" />
</template>

<style scoped></style>
