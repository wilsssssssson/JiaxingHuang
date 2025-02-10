// 下面是封装的消息提示的实现
type msgQueue = {
	id: number;
	content: string;
	type: string;
};

export default class MsgShow {
	private msgQueue: msgQueue[];
	private index: number;
	private container: HTMLElement | null;
	private aliveTime: number;

	constructor(container: HTMLElement | null, time: number) {
		this.msgQueue = []; // 使用队列来存储消息
		this.index = 0;
		this.container = container;
		this.aliveTime = time;
	}

	showMsg(content: string, type: string) {
		if (!this.container) {
			throw new Error("please check wether container is defined!");
		}
		type = type || "info"; // 设置默认值
		const msg = {
			id: this.index,
			content,
			type,
		};
		this.msgQueue.push(msg); // 将消息添加到队列中
		++this.index;
		this.displayMsg(msg); // 显示新添加的消息
	}

	private displayMsg(msg: msgQueue) {
		const span = document.createElement("span");
		span.classList.add("msg-basic", `msg-${msg.type}`);
		span.setAttribute("id", msg.id.toString());
		span.innerHTML = msg.content;
		this.container!.appendChild(span);
		setTimeout(() => {
			let element = document.getElementById(msg.id.toString());
			if (element) {
				this.container!.removeChild(element);
			}
			this.msgQueue.shift(); // 从队列中删除消息
		}, this.aliveTime + 20);
	}
}
