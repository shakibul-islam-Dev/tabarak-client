import { getFeaturedProducts } from "@/data/products";
import { ProductGrid } from "@/components/products/ProductGrid";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal } from "@/components/shared/Reveal";

export function FeaturedProducts() {
  const products = getFeaturedProducts(8);

  return (
    <section className="section bg-sand/50">
      <div className="shell">
        <Reveal>
          <SectionHeading
            eyebrow="New arrivals"
            title="The pieces we keep reaching for."
            description="A tight edit of the season's essentials — designed to layer, to travel, and to stay in the rotation."
            href="/shop"
            linkLabel="Shop all"
          />
        </Reveal>

        <div className="mt-10 sm:mt-12">
          <ProductGrid products={products} priorityCount={2} />
        </div>
      </div>
    </section>
  );
}
