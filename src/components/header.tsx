import style from "./header.module.scss";
import Link from "next/link";

export const Header = () => {
    return (
        <header className={style.header}>
            <Link href="/">
                <h1>My</h1>
            </Link>
            <div className={style.menu}></div>
        </header>
    );
};
