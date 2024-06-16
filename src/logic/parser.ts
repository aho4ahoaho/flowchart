import { FunctionItem, searchScopeEnd, searchSentence } from "./scope";

export const codeParser = (context: string) => {
    //全ての関数を取得
    const functions: FunctionItem[] = [
        ...context.matchAll(/fn \w*?\(\)\{/g),
    ].map((f) => {
        //関数名を取得
        const name = f.toString().replace(/fn /g, "").replace(/\(\)\{/g, "");
        //関数の開始位置を取得
        const index = context.indexOf("{", f.index);
        //関数オブジェクトを作成
        const newFunction: FunctionItem = {
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
    });
    return functions;
};
