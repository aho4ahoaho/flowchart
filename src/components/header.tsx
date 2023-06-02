import style from "./header.module.scss";
import Image from "next/image";
import menuSvg from "../assets/menu.svg";

type Props = {};

export const Header = () => {
	return (
		<header className={style.header}>
			<div className={style.menu}>
				<Image src={menuSvg} alt="menu" />
			</div>
			<h1>My</h1>
			<div className={style.rightmenu}></div>
		</header>
	);
};
