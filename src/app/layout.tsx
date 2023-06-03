import { Header } from "../components/header";

import "./globals.css";
import "normalize.css";

export const metadata = {
    title: "FlowChartGenerator",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="ja">
            <body>
                <Header />
                {children}
            </body>
        </html>
    );
}
