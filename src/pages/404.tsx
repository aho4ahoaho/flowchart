"use client";
import NotFound from "@/app/not-found";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

import "@/app/globals.css";
import "normalize.css";

export default function Custom404() {
    return (
        <body>
            <Header />
            <NotFound />
            <Footer />
        </body>
    );
}
