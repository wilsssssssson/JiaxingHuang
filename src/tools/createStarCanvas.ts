/**
 * 创建流星和星星动画效果
 * @param canvasId Canvas 元素的 ID
 * @param meteorColor 流星的颜色
 * @param starColor 星星的颜色
 * @param numberOfMeteors 流星的数量
 * @param numberOfStars 星星的数量
 */
export default function createMeteorAndStarsEffect(
	canvasId: string,
	meteorColor: string,
	starColor: string,
	numberOfMeteors: number,
	numberOfStars: number
) {
	const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
	const ctx = canvas.getContext("2d")!;
	if (!ctx) {
		throw new Error(
			`Could not get the 2D context for canvas with ID: ${canvasId}`
		);
	}
	// 设置 Canvas 的宽度和高度为 100% 并考虑设备像素比
	const devicePixelRatio = window.devicePixelRatio || 1;
	canvas.style.width = "100%";
	canvas.style.height = "100%";
	canvas.width = canvas.clientWidth * devicePixelRatio;
	canvas.height = canvas.clientHeight * devicePixelRatio;
	ctx.scale(devicePixelRatio, devicePixelRatio);

	// 辅助函数，用于解析 rgb 颜色并返回 RGB 值数组
	function parseRGB(colorStr: string): [number, number, number] {
		const match = colorStr.match(
			/\brgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/
		);
		if (match && match.length === 4) {
			return [parseInt(match[1]), parseInt(match[2]), parseInt(match[3])];
		}
		throw new Error(`Invalid color format: ${colorStr}`);
	}

	/**
	 * 流星配置类
	 */
	class Meteor {
		constructor(x: number, y: number) {
			this.x = x;
			this.y = y;
			this.size = 6; // 增大星体大小
			this.speed = Math.random() * 40 + 5; // 更快的速度
			this.tailLength = Math.floor(Math.random() * 20) + 18; // 调整随机的尾迹长度
			this.tail = [];
			this.brightness = 0; // 亮度初始值
			this.brightnessChangeRate = 0.03; // 减慢亮度变化速率
			this.lastResetTime = Date.now(); // 上次重置的时间
			this.alpha = 1; // 初始透明度
			this.fadeRate = 0.006; // 减小透明度衰减速率
		}

		x: number;
		y: number;
		size: number;
		speed: number;
		tailLength: number;
		tail: { x: number; y: number }[];
		brightness: number;
		brightnessChangeRate: number;
		lastResetTime: number;
		alpha: number;
		fadeRate: number;

		update(): void {
			this.x -= this.speed;
			this.y += this.speed / 2; // 斜着移动
			this.tail.push({ x: this.x, y: this.y });

			if (this.tail.length > this.tailLength) {
				this.tail.shift();
			}

			// 检查流星尾迹是否完全离开画布
			if (
				this.x < -this.size ||
				this.x > canvas.width + this.size ||
				this.y < -this.size ||
				this.y > canvas.height + this.size
			) {
				this.reset();
			}

			// 更新亮度
			this.brightness += this.brightnessChangeRate;
			if (this.brightness > 2 * Math.PI) {
				this.brightness -= 2 * Math.PI;
			}

			// 减少透明度
			this.alpha -= this.fadeRate;
			if (this.alpha <= 0) {
				this.alpha = 0;
				this.reset();
			}
		}

		draw(): void {
			ctx.globalAlpha = this.alpha;

			// 解析颜色并调整亮度
			const [r, g, b] = parseRGB(meteorColor);
			const brightnessAdjustment = Math.sin(this.brightness) / 2 + 0.5;
			const adjustedR = Math.min(255, r * brightnessAdjustment);
			const adjustedG = Math.min(255, g * brightnessAdjustment);
			const adjustedB = Math.min(255, b * brightnessAdjustment);

			ctx.beginPath();
			ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
			ctx.fillStyle = `rgb(${adjustedR.toFixed(0)}, ${adjustedG.toFixed(
				0
			)}, ${adjustedB.toFixed(0)})`;
			ctx.fill();

			ctx.beginPath();
			ctx.moveTo(this.x, this.y);
			ctx.strokeStyle = `rgb(${adjustedR.toFixed(0)}, ${adjustedG.toFixed(
				0
			)}, ${adjustedB.toFixed(0)})`;
			ctx.lineWidth = 2;

			for (let i = 0; i < this.tail.length; i++) {
				let point = this.tail[this.tail.length - 1 - i];
				let alpha = Math.pow(1 - i / this.tailLength, 2); // 更平滑的透明度变化
				ctx.globalAlpha = alpha * this.alpha; // 设置透明度
				ctx.lineTo(point.x, point.y);
				ctx.stroke();
			}

			ctx.globalAlpha = 1; // 重置透明度
		}

		reset(): void {
			// 检查是否有流星刚被重置不久
			const tooSoon = meteors.some((m) => Date.now() - m.lastResetTime < 2500);
			if (tooSoon) return;

			// 随机出现在右侧或顶部
			const side = Math.random() < 0.5 ? "right" : "top";
			if (side === "right") {
				this.x = canvas.width;
				this.y = Math.random() * (canvas.height / 2); // 只出现在上半部分
			} else {
				this.x = Math.random() * (canvas.width - 100);
				this.y = 0;
			}

			this.size = 6; // 增大星体大小
			this.speed = Math.random() * 15 + 5; // 更快的速度
			this.tail = [];
			this.brightness = 0; // 重置亮度
			this.alpha = 1; // 重置透明度
			this.lastResetTime = Date.now(); // 更新重置时间
		}
	}

	/**
	 * 星星配置类
	 */
	class Star {
		constructor(x: number, y: number) {
			this.x = x;
			this.y = y;
			this.size = Math.random() * 2 + 1; // 星星大小
			this.brightness = Math.random() * 2 * Math.PI; // 初始亮度
			this.brightnessChangeRate = Math.random() * 0.05 + 0.02; // 加快亮度变化速率
		}

		x: number;
		y: number;
		size: number;
		brightness: number;
		brightnessChangeRate: number;

		update(): void {
			this.brightness += this.brightnessChangeRate;
			if (this.brightness > 2 * Math.PI) {
				this.brightness -= 2 * Math.PI;
			}
		}

		draw(): void {
			// 解析颜色并调整亮度
			const [r, g, b] = parseRGB(starColor);
			const brightnessAdjustment = Math.sin(this.brightness) / 2 + 0.5;
			const adjustedR = Math.min(255, r * brightnessAdjustment);
			const adjustedG = Math.min(255, g * brightnessAdjustment);
			const adjustedB = Math.min(255, b * brightnessAdjustment);

			ctx.beginPath();
			ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
			ctx.fillStyle = `rgb(${adjustedR.toFixed(0)}, ${adjustedG.toFixed(
				0
			)}, ${adjustedB.toFixed(0)})`;
			ctx.fill();
		}
	}

	const meteors: Meteor[] = [];
	const stars: Star[] = [];

	// 初始化流星
	for (let i = 0; i < numberOfMeteors; i++) {
		meteors.push(
			new Meteor(
				Math.random() < 0.5
					? canvas.width
					: Math.random() * (canvas.width - 100),
				Math.random() < 0.5 ? Math.random() * (canvas.height / 2) : 0 // 只出现在上半部分
			)
		);
	}

	// 初始化星星
	for (let i = 0; i < numberOfStars; i++) {
		stars.push(
			new Star(Math.random() * canvas.width, Math.random() * canvas.height)
		);
	}

	function animate(): void {
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		// 绘制星星
		stars.forEach((star) => {
			star.update();
			star.draw();
		});

		// 绘制流星
		meteors.forEach((meteor) => {
			meteor.update();
			meteor.draw();
		});

		requestAnimationFrame(animate);
	}

	// 控制流星的重置
	function checkReset(): void {
		meteors.forEach((meteor) => {
			if (Date.now() - meteor.lastResetTime >= 2500) {
				// 至少2.5秒
				meteor.reset();
			}
		});
		setTimeout(checkReset, Math.random() * 2000 + 1500); // 1.5秒到2.5秒之间的随机时间
	}

	return () => {
		checkReset();
		return requestAnimationFrame(animate);
	};
}
