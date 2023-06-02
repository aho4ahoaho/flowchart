import React from "react";
import style from "./textEditor.module.scss";
import { CodeManager } from "./codeManager";

type Props = {
	className?: string;
	value?: string;
	setValue?: (value: string) => void;
};

const keyboardHandler = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
	if (e.keyCode == 9) {
		e.preventDefault();
		const textArea = e.currentTarget;
		const startPos = textArea.selectionStart;
		const endPos = textArea.selectionEnd;
		let context = textArea.value;
		//選択がない場合
		if (startPos == endPos) {
			context =
				context.substring(0, startPos) + "    " + context.substring(startPos);
			textArea.value = context;
			textArea.setSelectionRange(startPos + 4, startPos + 4);
			//範囲選択の場合
		} else {
			let before_context = context.substring(0, startPos - 1);
			let after_context = context.substring(endPos);
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
				let lines = target_context.split("\n");
				return "    " + lines.join("\n    ");
			})();
			context = before_context + target_context + after_context;
			textArea.value = context;
			textArea.setSelectionRange(startPos, startPos + target_context.length);
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
				{value + " "}
			</p>
			<textarea
				className={style.editor}
				value={value}
				onChange={(e) => {
					setValue?.(e.target.value);
				}}
				ref={textareaRef}
				onKeyDown={keyboardHandler}
				autoFocus
			></textarea>
			<CodeManager value={value} setValue={setValue}></CodeManager>
		</div>
	);
};
