export default class canvasHandler {
	public canvasElement: null | HTMLCanvasElement = null;
	public containerElement: null | HTMLElement = null; // canvas的容器
	public isInit: boolean = true; // 是否是初始化
	public renderFunc: Function = () => {}; // 渲染函数
	public canvasCtx: CanvasRenderingContext2D | null = null;
	// constructor(){}

	public setCorrectCanvasSize(config?: { width?: number; height?: number }) {
		if (!this.canvasElement || !this.containerElement) {
			throw new Error("please check whether the canvas or container is valid!");
		}
		let widthSettled = false;
		let heightSettled = false;
		if (config !== undefined) {
			if (config.width !== undefined) {
				this.canvasElement.width = config.width;
				widthSettled = true;
			}
			if (config.height !== undefined) {
				this.canvasElement.height = config.height;
				heightSettled = true;
			}
		}

		if (!widthSettled) {
			this.canvasElement.width =
				this.containerElement.getBoundingClientRect().width;
		}
		if (!heightSettled) {
			this.canvasElement.height =
				this.containerElement.getBoundingClientRect().height;
		}
		this.canvasCtx?.clearRect(
			0,
			0,
			this.canvasElement.width,
			this.canvasElement.height
		);
		this.reRender();
	}

	public reRender() {
		if (!this.canvasElement || !this.containerElement) {
			throw new Error("No canvas or container!");
		}
		this.canvasCtx?.clearRect(
			0,
			0,
			this.canvasElement.width,
			this.canvasElement.height
		);
		this.renderFunc();
	}

	// 初始化内容
	public InitCanvas(
		canvasElement: null | HTMLCanvasElement,
		containerElement: null | HTMLElement,
		renderFunc: Function,
		config?: { width?: number; height?: number }
	) {
		if (!canvasElement || !containerElement) {
			throw new Error("please check whether the canvas or container is valid!");
		}
		this.canvasElement = canvasElement;
		this.containerElement = containerElement;
		this.canvasCtx = canvasElement.getContext("2d");
		this.setCorrectCanvasSize(config);
		if (this.isInit) {
			this.renderFunc = renderFunc;
			this.isInit = false;
		}
		renderFunc();
		// this.doInstall();
	}
}
