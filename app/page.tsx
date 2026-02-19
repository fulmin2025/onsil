import { Hero } from "@/components/home/Hero";
import { TrustSection } from "@/components/home/TrustSection";
import { ContentPreview } from "@/components/home/ContentPreview";
import { Reviews } from "@/components/home/Reviews";

export default function Home() {
    return (
        <div className="flex flex-col gap-16 pb-16">
            <Hero />
            <TrustSection />
            <ContentPreview />
            <Reviews />
        </div>
    );
}
