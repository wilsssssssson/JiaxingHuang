// usePassiveScroll hook的provide的数据类型声明
declare namespace usePassiveScroll {
	interface passiveScrollHandler {
		indexNow: number;
		changeIndex: (i: number) => void;
		checkChangeIndexValid: (index: number, addOrSub: boolean) => boolean;
	}
}
