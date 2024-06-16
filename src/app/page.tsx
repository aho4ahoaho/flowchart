"use client";

import { TextEditor } from "../components/textEditor";
import style from "./rootPage.module.scss";
import { ChartContainer } from "@/components/chart";
import { example_code } from "@/logic/exampleCode";
import { codeParser } from "@/logic/parser";
import { FunctionItem } from "@/logic/scope";
import React from "react";

export default function RootPage() {
    const [text, setText] = React.useState("");
    const [functions, setFunctions] = React.useState<FunctionItem[]>([]);

    React.useEffect(() => {
        setText(example_code);
    }, []);

    React.useEffect(() => {
        const f = codeParser(text);
        setFunctions(f);
    }, [text]);
    return (
        <div id="main" className={style.main}>
            <TextEditor
                className={style.leftPanel}
                value={text}
                setValue={setText}
            />
            <ChartContainer
                className={style.rightPanel}
                functions={functions}
            />
        </div>
    );
}
