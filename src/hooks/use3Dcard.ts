import { Ref, onUnmounted } from "vue";

/**
 * 实现添加元素随鼠标3D变换的效果的钩子
 * @param elementRef 要添加此3D效果的元素ref
 */
export default function use3DCard(elementRef: Ref<HTMLElement | null>) {
	if (!elementRef.value) {
		return;
	}
	// 实现鼠标移动卡片上的动画
	const dealCard3D = (e: MouseEvent, container: HTMLElement | null) => {
		if (!container) {
			return;
		}
		const rect = container.getBoundingClientRect();
		const x = e.clientX - rect.left - rect.width / 2;
		const y = e.clientY - rect.top - rect.height / 2;
		const degX = (10 * y) / rect.height;
		const degY = -(10 * x) / rect.width;
		container.style.transform = `perspective(1000px) rotateX(${degX}deg) rotateY(${degY}deg)`;
	};

	const dealCard3DLeave = (container: HTMLElement | null) => {
		if (!container) {
			return;
		}
		container.style.transform = "";
	};
	const handleMove = (e: MouseEvent) => {    
		dealCard3D(e, elementRef.value);
	};
	const handleLeave = () => {
		dealCard3DLeave(elementRef.value);
	};
  if (elementRef.value) {
    elementRef.value.addEventListener("mousemove", handleMove);
    elementRef.value.addEventListener("mouseleave", handleLeave);
  }
	onUnmounted(() => {
		if (elementRef.value) {
			elementRef.value.removeEventListener("mousemove", handleMove);
			elementRef.value.removeEventListener("mouseleave", handleLeave);
		}
	});
}
