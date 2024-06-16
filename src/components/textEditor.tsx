import { CodeManager } from "./codeManager";
import style from "./textEditor.module.scss";
import React from "react";

type Props = {
    className?: string;
    value?: string;
    setValue?: (value: string) => void;
};

const keyboardHandler = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab") {
        e.preventDefault();
        const textArea = e.currentTarget;
        const startPos = textArea.selectionStart;
        const endPos = textArea.selectionEnd;
        const context = textArea.value;

        //選択がない場合
        if (startPos === endPos) {
            if (e.shiftKey) {
                const after_context = context.substring(startPos);
                const before_context = context.substring(0, startPos);
                const before_lines = before_context.split("\n");
                const before_line = before_lines.pop() ?? "";
                if (before_line.substring(0, 4) === "    ") {
                    const new_before_context =
                        before_lines.join("\n") +
                        "\n" +
                        before_line.substring(4);
                    textArea.value = new_before_context + after_context;
                    textArea.setSelectionRange(startPos - 4, startPos - 4);
                    return;
                }
            } else {
                const newContext = `${context.substring(
                    0,
                    startPos,
                )}    ${context.substring(startPos)}`;
                textArea.value = newContext;
                textArea.setSelectionRange(startPos + 4, startPos + 4);
                return;
            }
        } else {
            //範囲選択の場合
            const before_context = context.substring(0, startPos - 1);
            const after_context = context.substring(endPos);
            let target_context = context.substring(startPos - 1, endPos);
            target_context = (() => {
                //シフトキーが押された場合
                if (e.shiftKey) {
                    const lines = target_context.split("\n    ");
                    const ctx = lines.join("\n");
                    if (ctx.substring(0, 4) === "    ") {
                        return ctx.substring(4);
                    }
                    return ctx;
                }
                //シフトキーが押されていない場合
                const lines = target_context.split("\n");
                return `    ${lines.join("\n    ")}`;
            })();
            textArea.value = before_context + target_context + after_context;
            textArea.setSelectionRange(
                startPos,
                startPos + target_context.length,
            );
        }
    }
};

export const TextEditor = ({ className, value, setValue }: Props) => {
    const [textBoxHeight, setTextBoxHeight] = React.useState(0);
    const textareaRef = React.useRef<HTMLTextAreaElement>(null);
    const dummyRef = React.useRef<HTMLParagraphElement>(null);

    React.useEffect(() => {
        if (!dummyRef.current) return;
        setTextBoxHeight(dummyRef.current.clientHeight);
    }, [value, dummyRef]);

    React.useEffect(() => {
        if (!textareaRef.current) return;
        textareaRef.current.style.height = `calc(${textBoxHeight}px + 0.25rem)`;
    }, [textBoxHeight, textareaRef]);

    return (
        <div className={className}>
            <p ref={dummyRef} className={style.dummy}>
                {`${value} `}
            </p>
            <div className={style.editorContainer}>
                <textarea
                    className={style.editor}
                    value={value}
                    onChange={(e) => {
                        setValue?.(e.target.value);
                    }}
                    ref={textareaRef}
                    onKeyDown={keyboardHandler}
                />
            </div>
            <CodeManager value={value} setValue={setValue} />
        </div>
    );
};
