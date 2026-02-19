import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Hero() {
    return (
        <section className="relative w-full py-20 md:py-32 lg:py-40 bg-secondary/30 overflow-hidden">
            {/* Background Decor (Placeholder for Image) */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/0 via-white/50 to-white pointer-events-none z-10" />
            <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?q=80&w=2517&auto=format&fit=crop')] bg-cover bg-center" />

            <div className="container-custom relative z-20 flex flex-col items-center text-center space-y-8">
                <div className="space-y-4 max-w-3xl mx-auto animate-fade-in">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-primary leading-tight">
                        반려동물 장례식장,<br />
                        비교부터 예약까지.
                    </h1>
                    <p className="text-xl md:text-2xl font-serif text-gray-600">
                        어려운 결정에 늘 펫나잇이 함께할게요.
                    </p>
                    <div className="pt-4">
                        <p className="text-sm md:text-base text-gray-500 bg-white/80 backdrop-blur-sm py-2 px-4 rounded-full inline-block shadow-sm">
                            이제 안심하셔도 됩니다. <span className="text-primary font-bold">펫나잇 안심 장례식장</span> 표시를 확인하세요.
                        </p>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
                    <Button size="lg" className="px-8 text-lg h-14" asChild>
                        <Link href="#search">
                            안심 장례식장 찾아보기
                        </Link>
                    </Button>
                    <Button variant="outline" size="lg" className="px-8 text-lg h-14" asChild>
                        <Link href="#guide">
                            이별 준비 가이드
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}
