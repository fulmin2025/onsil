import Link from "next/link";

export function Footer() {
    return (
        <footer className="bg-gray-50 border-t py-12">
            <div className="container-custom grid gap-8 md:grid-cols-4">
                <div className="col-span-1 md:col-span-2">
                    <Link href="/" className="font-bold text-xl text-primary mb-4 block">
                        Pet Night
                    </Link>
                    <p className="text-sm text-gray-500 mb-4 max-w-md">
                        반려동물 장례식장, 비교부터 예약까지.<br />
                        어려운 결정에 늘 펫나잇이 함께할게요.
                    </p>
                    <div className="text-xs text-gray-400">
                        <p>(주)언박싱드림즈 | 대표자: 최성호, 박준성</p>
                        <p>서울특별시 성북구 개운사길 83-13, 3층 303호</p>
                        <p>문의: 1668-5165 | contact@petnight.co.kr</p>
                    </div>
                </div>

                <div>
                    <h3 className="font-semibold mb-4 text-sm">서비스</h3>
                    <ul className="space-y-2 text-sm text-gray-600">
                        <li><Link href="#search">장례식장 찾기</Link></li>
                        <li><Link href="#guide">장례 가이드</Link></li>
                        <li><Link href="#memory">추억 가이드</Link></li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-semibold mb-4 text-sm">고객지원</h3>
                    <ul className="space-y-2 text-sm text-gray-600">
                        <li><Link href="#faq">자주 묻는 질문</Link></li>
                        <li><Link href="#contact">1:1 문의하기</Link></li>
                        <li><Link href="#terms">이용약관</Link></li>
                        <li><Link href="#privacy">개인정보처리방침</Link></li>
                    </ul>
                </div>
            </div>
            <div className="container-custom mt-12 pt-8 border-t text-center text-xs text-gray-400">
                © 2026. 언박싱드림즈 All rights reserved.
            </div>
        </footer>
    );
}
