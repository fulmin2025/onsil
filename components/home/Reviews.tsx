import { Star } from "lucide-react";

const reviews = [
    {
        id: 1,
        content: "덕분에 헤매지 않고 복덩이의 마지막을 잘 준비했습니다. 경황이 없었는데 친절한 상담 덕분에 큰 위로가 되었어요.",
        author: "복덩이 아빠",
        pet: "말티즈, 15세",
    },
    {
        id: 2,
        content: "비교 견적서 덕분에 신중하게 결정할 수 있었어요. 강매 요구나 불편한 점 없이 정말 아이에게만 집중할 수 있는 시간이었습니다.",
        author: "사랑이 누나",
        pet: "푸들, 12세",
    },
    {
        id: 3,
        content: "안심 장례식장 마크를 보고 예약했는데, 시설도 너무 깨끗하고 장례지도사님도 정말 진심으로 대해주셔서 감사했습니다.",
        author: "초코 형",
        pet: "시츄, 14세",
    },
];

export function Reviews() {
    return (
        <section className="bg-secondary/20 py-20">
            <div className="container-custom">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-primary mb-4">함께한 보호자님들의 이야기</h2>
                    <p className="text-gray-600 font-serif">
                        슬픔을 나누고 위로를 얻은 분들의 후기입니다.
                    </p>
                </div>

                {/* Scroll Snap Container for Mobile, Grid for Desktop */}
                <div className="flex overflow-x-auto pb-8 gap-6 md:grid md:grid-cols-3 md:overflow-visible snap-x snap-mandatory">
                    {reviews.map((review) => (
                        <div
                            key={review.id}
                            className="flex-none w-[85vw] md:w-auto snap-center bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
                        >
                            <div className="flex gap-1 mb-4 text-accent">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="w-4 h-4 fill-current" />
                                ))}
                            </div>
                            <p className="text-gray-700 leading-relaxed mb-6 word-keep min-h-[4.5rem]">
                                "{review.content}"
                            </p>
                            <div className="flex items-center justify-between border-t pt-4">
                                <span className="font-bold text-sm text-gray-900">{review.author}</span>
                                <span className="text-xs text-gray-500">{review.pet}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
