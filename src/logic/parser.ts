import { Function, searchScopeEnd, searchSentence } from "./scope";

export class Parser {
	private context: string = "";
	private functions: Function[] = [];
	constructor(context: string = "") {
		if (context != "") {
			this.setContext(context);
		}
	}

	static parse(context: string) {
		//全ての関数を取得
		let functions: Function[] = [...context.matchAll(/fn \w*?\(\)\{/g)].map(
			(f) => {
				//関数名を取得
				let name = f.toString().replace(/fn /g, "").replace(/\(\)\{/g, "");
				//関数の開始位置を取得
				let index = context.indexOf("{", f.index);
				//関数オブジェクトを作成
				let newFunction: Function = {
					name: name,
					index: index,
					end: searchScopeEnd(context, index),
					node: [],
					raw: {
						start: f.index ?? 0,
						context: "",
					},
				};
				//関数のコンテキストを保存
				newFunction.raw.context = context.substring(index, newFunction.end + 1);
				//関数のノードを取得
				newFunction.node = searchSentence(newFunction.raw.context);
				return newFunction;
			},
		);
		return functions;
	}

	setContext(context: string) {
		this.context = context;
		this.functions = Parser.parse(context);
	}

	getContext() {
		return this.context;
	}

	getFunctions() {
		return this.functions;
	}

	static view(functions: Function[]) {
		functions.forEach((f) => {
			console.log("====================================");
			console.log(f);
		});
	}
}
