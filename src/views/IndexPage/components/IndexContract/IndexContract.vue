<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import * as THREE from "three";
// 引入gltf模型加载库GLTFLoader.js
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import threeD2 from "./three/threeD2.ts";
import setThreeCss from "@/tools/setThreeCss.ts";
import sendEmail from "@/API/sendEmail.ts";
import messageHandler from "@/tools/messageHandler";
import useVisible from "@/hooks/useVisible.ts";
import titleAndPath from "@/config/TitleAndPath.ts";

const canvasContainer = ref<HTMLElement | null>(null);
const contractContainer = ref<HTMLElement | null>(null);
const initedModel = ref<boolean>(false); // 当前模型是不是已经初始化过了
const loading = ref<boolean>(true); // 模型加载中提示

// 处理大小问题
let timer: null | number = null;
const handleResize = () => {
	if (timer) {
		clearTimeout(timer);
	}
	timer = window.setTimeout(() => {
		if (window.innerWidth >= 768) {
			threeD2.needRender = true;
		} else {
			threeD2.needRender = false;
		}
		if (threeD2.needRender) {
			// 如果当前真的需要模型的话
			if (!initedModel.value) {
				// 如果之前压根就没渲染
				doInitModel();
			}
			threeD2.changeCanvasSize();
		}
	}, 80);
};

function modelAnimation() {
	// 实现模型动画效果（简单旋转）
	requestAnimationFrame(modelAnimation);
	threeD2.renderer.render(threeD2.scence, threeD2.camera); //执行渲染操作
	threeD2.scence.traverse(function (child) {
		// 对场景中的每个对象进行遍历，并设置旋转角度
		if (child instanceof THREE.Mesh) {
			child.rotation.z += 0.01; // 在每一帧中更新旋转角度，实现旋转动画效果
		}
	});
	threeD2.renderer.render(threeD2.scence, threeD2.camera); // 执行渲染
}

function doInitModel() {
	// 初始化模型的函数
	threeD2.initThreeD(canvasContainer.value, () => {
		if (!threeD2.container) {
			throw new Error("please check container!");
		}
		// 创建相机
		const width = threeD2.container.offsetWidth;
		const height = threeD2.container.offsetHeight - 1;
		threeD2.camera = new THREE.PerspectiveCamera(60, width / height, 1, 3000);
		// 设置相机位置
		threeD2.camera.position.set(0, 21, 200);
		// 创建GLTF加载器对象
		const loader = new GLTFLoader();
		loader.load(
			"/model/littleRoom/scene.gltf",
			(gltf) => {
				// 当模型加载完成后，这个函数会被调用
				// gltf.scene包含了所有的模型数据
				const model = gltf.scene;
				model.scale.set(2.5, 2.5, 2.5); // 在x、y、z三个方向上都放大2.5倍
				// 创建一个Box3对象，并使用setFromObject方法计算模型的边界盒
				var box = new THREE.Box3().setFromObject(model);
				// 创建一个Vector3对象，用于存储中心点的坐标
				var center = new THREE.Vector3();
				// 使用getCenter方法获取模型的中心点
				box.getCenter(center); // 现在，center对象包含了模型的中心点的坐标
				// 防止出现控制器发动后的相机位置跳跃的问题，设置控制器的旋转点为相机的注视点即可
				threeD2.controls.target = center;
				// 相机看向的位置
				threeD2.camera.lookAt(center);
				model.traverse((child) => {
					if (child instanceof THREE.Mesh) {
						var material = child.material;
						// 在这里可以访问或修改材质
						material.emissive = material.color;
						if (material.map) {
							material.emissiveMap = material.map;
							material.emissiveMap.needsUpdate = true;
						}
						// if (material instanceof THREE.MeshBasicMaterial) {
						//   // 对基础材质进行配置
						// } else if (material instanceof THREE.MeshLambertMaterial) {
						//     // 对Lambert材质进行配置
						// } else if (material instanceof THREE.MeshPhongMaterial) {
						//     // 对Phong材质进行配置
						// } else if (material instanceof THREE.MeshStandardMaterial) {
						//     // 对标准材质进行配置
						// }
					}
				});
				//解决加载gltf格式模型纹理贴图和原图不一样问题
				threeD2.renderer.outputColorSpace = THREE.SRGBColorSpace;
				threeD2.scence.add(model);
				// 开启旋转动画并执行渲染
				modelAnimation();
				initedModel.value = true; // 已经初始化了
				loading.value = false; // 加载完了
				setThreeCss(localStorage.getItem("dayOrNight") === "day"); // 设置一下光源啥的，根据当前主题
			},
			(xhr) => {
				// 这个函数在模型正在被加载时调用，用于更新加载进度 (这里需要处理一下，加个样式啥的进行提示)
				console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
			},
			(error) => {
				// 当加载出现错误时，这个函数会被调用
				console.log("An error happened", error);
			}
		);
	});
}

// 添加进入可视区域的处理
useVisible(contractContainer, {
	onIntersect: () => {
		contractContainer.value?.classList.add("show-ani");
		if (window.innerWidth >= 768) {
			// 加载模型，实现类似懒加载的效果
			threeD2.needRender = true;
			doInitModel();
		}
	},
});

onMounted(() => {
	window.addEventListener("resize", handleResize);
});

onBeforeUnmount(() => {
	window.removeEventListener("resize", handleResize);
});

const name = ref<string>("");
const email = ref<string>("");
const message = ref<string>("");
const isSending = ref<boolean>(false);
const baseContainer = ref<HTMLElement | null>(null);
let messageDealer: messageHandler;
onMounted(() => {
	// 不然baseContainer.value是null
	messageDealer = new messageHandler(baseContainer.value, 2500);
});

async function send() {
	if (name.value === "") {
		messageDealer.showMsg("姓名不能为空！", "error");
		return;
	}
	if (email.value === "") {
		messageDealer.showMsg("邮箱不能为空！", "error");
		return;
	} else {
		let regex = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
		let isValidEmail = regex.test(email.value);
		if (!isValidEmail) {
			messageDealer.showMsg("请检查邮箱格式是否正确！", "error");
			return;
		}
	}
	if (message.value === "") {
		messageDealer.showMsg("留言不能为空！", "error");
		return;
	}
	isSending.value = true;
	await sendEmail({
		name: name.value,
		email: email.value,
		message: message.value,
	})
		.then(() => {
			messageDealer.showMsg("发送成功！", "success");
		})
		.catch((error) => {
			messageDealer.showMsg("发送失败！", "error");
			console.log(error);
		});
	isSending.value = false;
}
</script>

<template>
	<div class="index-contract-container" ref="baseContainer">
		<div class="canvas-container" ref="canvasContainer">
			<span v-show="loading" style="position: absolute">模型加载中...</span>
		</div>
		<div class="title-container">
			<div class="title">
				&lt; {{ titleAndPath[4].name }} >
			</div>
		</div>
		<div class="contract-container" ref="contractContainer">
			<p class="contract-title">
				- {{ titleAndPath[4].name }} -
			</p>
			<div class="contract-item">
				<span class="contract-item-name">你的名字：</span>
				<input
					type="text"
					class="contract-item-input"
					placeholder="Name"
					v-model="name"
				/>
			</div>
			<div class="contract-item">
				<span class="contract-item-name">你的邮箱：</span>
				<input
					type="text"
					class="contract-item-input"
					placeholder="E-mail"
					v-model="email"
				/>
			</div>
			<div class="contract-item">
				<span class="contract-item-name">想说什么：</span>
				<input
					type="text"
					class="contract-item-input"
					placeholder="Anything..."
					v-model="message"
				/>
			</div>
			<div class="contract-item">
				<button
					class="contract-item-button"
					@click="send"
					:disabled="isSending"
				>
					发送
					<el-icon class="is-loading" v-show="isSending">
						<Loading />
					</el-icon>
				</button>
			</div>
		</div>
	</div>
</template>

<style scoped>
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

.index-contract-container {
	position: relative;
	display: flex;
	justify-content: space-around;
	align-items: center;
	flex-wrap: wrap;
	align-content: space-around;
	width: 100%;
	height: 90vh;
	background-color: transparent;
}

.canvas-container,
.title-container {
	width: 45vw;
	height: 80vh;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 10%;
	color: var(--font-main-color);
	font-weight: 300;
	font-size: max(2vw, 1rem);
}

.title-container {
	display: none;
	width: 70vw;
	height: 10vh;
}

.contract-container {
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
	align-content: space-around;
	opacity: 0;
	width: 45vw;
	height: 80vh;
	border: 1px solid var(--color-box-shadow);
	border-radius: 10%;
}

.contract-title {
	width: 100%;
	text-align: center;
	font-size: max(1.5vw, 1.5rem);
	font-weight: 300;
	color: var(--font-main-color);
	user-select: none;
}

.contract-item {
	width: 100%;
	height: 20%;
	display: flex;
	justify-content: center;
	align-items: center;
}

.contract-item-name {
	color: var(--font-main-color);
	font-size: max(1.1vw, 0.8rem);
	font-weight: 300;
	margin-right: 1vw;
	user-select: none;
}

.contract-item-input {
	position: relative;
	width: 50%;
	border: none;
	outline: none;
	border-bottom: 1px solid var(--solid-color);
	padding-left: 3px;
	padding-bottom: 3px;
	color: var(--font-main-color);
	font-size: max(1vw, 0.8rem);
	font-weight: 300;
	background-color: transparent;
	transition: all 0.3s;
}

.contract-item-input:hover,
.contract-item-input:focus {
	border-bottom: 1px solid var(--font-main-color);
}

.contract-item-button {
	width: 30%;
	height: 5vh;
	background-color: var(--overall-background-color);
	border: 1px solid var(--font-main-color);
	border-radius: 10px;
	color: var(--font-main-color);
	font-weight: 300;
	font-size: max(1vw, 0.8rem);
	cursor: pointer;
	transition: all 0.3s;
}

.contract-item-button:hover {
	background-color: var(--font-main-color);
	color: var(--overall-background-color);
}

.canvas-content {
	user-select: none;
}

.title {
	display: none;
}

@media screen and (max-width: 1000px) {
	.canvas-container,
	.contract-container {
		border-radius: 20px;
	}
}

@media screen and (max-width: 768px) {
	.canvas-container {
		width: 70vw;
		height: 10vh;
	}

	.contract-container {
		width: 90vw;
		height: 70vh;
	}

	.canvas-content {
		display: none;
	}

	.title {
		display: block;
	}

	.contract-title {
		display: none;
	}

	.title-container {
		display: flex;
		border-radius: 20px;
		border: 1px solid var(--color-box-shadow);
		box-shadow: 0px 0px 3vh var(--color-box-shadow);
	}

	.canvas-container {
		display: none;
	}
}
</style>
