import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ClipboardList, BookOpen } from "lucide-react";

export function ContentPreview() {
    return (
        <section className="container-custom py-16">
            <div className="grid md:grid-cols-2 gap-8">
                {/* Checklist Card */}
                <div className="group relative overflow-hidden rounded-2xl bg-secondary p-8 hover:shadow-lg transition-all">
                    <div className="relative z-10 space-y-4">
                        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-primary shadow-sm mb-4 group-hover:scale-110 transition-transform">
                            <ClipboardList className="w-6 h-6" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900">이별 준비 체크리스트</h3>
                        <p className="text-gray-600 mb-6">
                            갑작스러운 이별에 당황하지 않도록,<br />
                            꼭 필요한 준비물과 절차를 미리 확인하세요.
                        </p>
                        <Button variant="outline" className="bg-white/50 hover:bg-white" asChild>
                            <Link href="#checklist">리스트 확인하기</Link>
                        </Button>
                    </div>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                </div>

                {/* Guide Card */}
                <div className="group relative overflow-hidden rounded-2xl bg-primary/5 p-8 hover:shadow-lg transition-all">
                    <div className="relative z-10 space-y-4">
                        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-primary shadow-sm mb-4 group-hover:scale-110 transition-transform">
                            <BookOpen className="w-6 h-6" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900">초보자 장례 가이드</h3>
                        <p className="text-gray-600 mb-6">
                            장례가 처음이신가요?<br />
                            복잡한 절차와 평균 비용을 알기 쉽게 정리해드려요.
                        </p>
                        <Button variant="outline" className="bg-white/50 hover:bg-white" asChild>
                            <Link href="#guide">가이드 읽어보기</Link>
                        </Button>
                    </div>
                    <div className="absolute bottom-0 right-0 w-32 h-32 bg-secondary-mint rounded-full blur-3xl translate-y-1/2 translate-x-1/2" />
                </div>
            </div>
        </section>
    );
}
