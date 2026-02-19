import type { Metadata } from "next";
import { Inter, Noto_Sans_KR, Nanum_Myeongjo } from "next/font/google"; // Using Nanum Myeongjo as serif alternative
import "./globals.css";
import { cn } from "@/lib/utils";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const notoSansKr = Noto_Sans_KR({
    weight: ["100", "300", "400", "500", "700", "900"],
    subsets: ["latin"],
    variable: "--font-noto-sans-kr",
});
// Using Nanum Myeongjo for the emotional/serif parts
const nanumMyeongjo = Nanum_Myeongjo({
    weight: ["400", "700", "800"],
    subsets: ["latin"],
    variable: "--font-serif",
});

export const metadata: Metadata = {
    title: "Pet Night - 반려동물 안심 장례식장 비교 예약",
    description: "반려동물 장례식장, 비교부터 예약까지. 안심하고 보낼 수 있도록 투명한 정보를 제공합니다.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ko">
            <body
                className={cn(
                    "min-h-screen bg-background font-sans antialiased",
                    inter.variable,
                    notoSansKr.variable,
                    nanumMyeongjo.variable
                )}
            >
                <Header />
                <main className="flex-1 min-h-[calc(100vh-theme(spacing.16)-theme(spacing.80))]">
                    {children}
                </main>
                <Footer />
            </body>
        </html>
    );
}
