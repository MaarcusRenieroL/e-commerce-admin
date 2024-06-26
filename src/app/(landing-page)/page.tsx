import { AboutSection } from "~/components/landing-page/about-section";
import { FeatureSection } from "~/components/landing-page/feature-section";
import { GetStartedSection } from "~/components/landing-page/get-started-section";
import { HeroSection } from "~/components/landing-page/hero-section";
import { TestimonialSection } from "~/components/landing-page/testimonial-section";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <AboutSection />
      <FeatureSection />
      <TestimonialSection />
      <GetStartedSection />
    </div>
  );
}
