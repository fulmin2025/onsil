import { ShieldCheck, HeartHandshake, BadgeCheck } from "lucide-react";

const features = [
    {
        icon: ShieldCheck,
        title: "참관 보장",
        description: "모든 장례 과정을 보호자가 직접 참관할 수 있는 장례식장만 소개합니다.",
    },
    {
        icon: BadgeCheck,
        title: "투명한 서비스",
        description: "불필요한 용품 강매 금지. 투명한 비용 공개로 안심할 수 있습니다.",
    },
    {
        icon: HeartHandshake,
        title: "피해 보상제",
        description: "안심 정책 위반 시 최대 50만 원 보상 정책을 명시하여 책임을 다합니다.",
    },
];

export function TrustSection() {
    return (
        <section className="py-16 bg-white">
            <div className="container-custom">
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-3xl font-bold text-primary">Pet Night Promise</h2>
                    <p className="text-gray-600 font-serif text-lg">
                        보호자님이 장례에만 집중할 수 있도록, 펫나잇이 약속합니다.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-center text-center p-8 rounded-2xl bg-secondary/30 hover:bg-secondary/50 transition-colors"
                        >
                            <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-sm mb-6 text-primary">
                                <feature.icon className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-gray-800">
                                {feature.title}
                            </h3>
                            <p className="text-gray-600 leading-relaxed word-keep">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
