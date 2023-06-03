"use client";
import { useRouter } from "next/navigation";
import React from "react";

export default function NotFound() {
	const router = useRouter();
	const [count, setCount] = React.useState(5);
	const style: React.CSSProperties = {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		color: "#444",
		paddingTop: "20vh",
	};
	React.useEffect(() => {
		if (!router) return;
		(async () => {
			for (let i = 5; i > 0; i--) {
				setCount(i);
				await new Promise((resolve) => setTimeout(resolve, 1000));
			}
			router.push("/");
		})();
	}, [router]);
	return (
		<div style={style}>
			<h1>404</h1>
			<h2>Page Not Found</h2>
			<p>{count}秒後にトップページへ戻ります</p>
		</div>
	);
}
