import { Feature, Image } from "@/components";
import { client } from "@/lib";

async function getProducts() {
  const res = client.products.list({
    limit: 10,
  });

  return res;
}

async function getCategories() {
  const res = client.productCategories.list({
    limit: 3,
  });

  return res;
}

export default async function Home() {
  const { product_categories } = await getCategories();

  return (
    <main className="flex flex-col items-center">
      <div className="w-full max-w-7xl flex flex-col gap-y-16">
        <div className="w-full">
          <img className="h-30 w-full" src="/hero.svg" alt="" />
        </div>

        {/* @ts-ignore */}
        <Feature
          query={{
            order: "-created_at",
          }}
          max={3}
          title="Latest Drops"
          to={{
            href: "/products",
            label: "View all",
          }}
        />
        {product_categories?.map((category) => {
          return (
            // @ts-ignore
            <Feature
              key={category.id}
              title={category.name}
              max={3}
              to={{
                href: `/products?category=${category.name.toLowerCase()}`,
                label: "View all",
              }}
              query={{
                category_id: [category.id],
              }}
            />
          );
        })}
      </div>
    </main>
  );
}
