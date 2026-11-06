import { Hero } from "@/components/sections/Hero";
import { Assurance } from "@/components/sections/Assurance";
import { FeaturedCollections } from "@/components/sections/FeaturedCollections";
import { FeaturedProducts } from "@/components/sections/FeaturedProducts";
import { BrandStory } from "@/components/sections/BrandStory";
import { Campaign } from "@/components/sections/Campaign";
import { Newsletter } from "@/components/sections/Newsletter";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Assurance />
      <FeaturedCollections />
      <FeaturedProducts />
      <BrandStory />
      <Campaign />
      <Newsletter />
    </>
  );
}
