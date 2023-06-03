import style from "./header.module.scss";
import Image from "next/image";
import menuSvg from "../assets/menu.svg";
import Link from "next/link";

export const Header = () => {
	return (
		<header className={style.header}>
			<Link href="/">
				<h1>My</h1>
			</Link>
			<div className={style.menu}>
				<Image src={menuSvg} alt="menu" />
			</div>
		</header>
	);
};
