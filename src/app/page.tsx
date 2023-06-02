"use client";

import React from "react";
import { TextEditor } from "../components/textEditor";
import style from "./rootPage.module.scss";
import { Chart, ChartContainer } from "@/components/chart";
import { Parser } from "@/logic/parser";
import { Function } from "@/logic/scope";

export default function RootPage() {
	const [text, setText] = React.useState("");
	const [functions, setFunctions] = React.useState<Function[]>([]);

	//debug
	/*React.useEffect(() => {
		setText(`fn main(){
    こういう処理とか;
    if(こういう条件){
        こんな処理;
    }else{
        その他の場合;
        こんなんもある;
    }
    loop(これで脱出){
        こういう繰り返し;
        sub();
    }
    終わりの処理;
}

fn sub(){
    サブルーチンの処理;
}
`);
	}, []);*/

	React.useEffect(() => {
		const f = Parser.parse(text);
		setFunctions(f);
	}, [text]);
	return (
		<div id="main" className={style.main}>
			<TextEditor
				className={style.leftPanel}
				value={text}
				setValue={setText}
			></TextEditor>
			<ChartContainer
				className={style.rightPanel}
				functions={functions}
			></ChartContainer>
		</div>
	);
}
