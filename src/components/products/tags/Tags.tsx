import { Tag } from "@/components";
import { ProductCategory, ProductTag } from "@medusajs/medusa";

type Props = {
  tags?: ProductTag[];
  categories?: ProductCategory[];
};

const Tags = ({ tags, categories }: Props) => {
  if (!tags || tags.length === 0) {
    return null;
  }

  return (
    <div className="flex items-center gap-x-1.5">
      {tags.map((tag) => (
        <Tag key={tag.id}>{tag.value}</Tag>
      ))}
      {categories &&
        categories.map((category) => (
          <Tag key={category.id}>{category.name}</Tag>
        ))}
    </div>
  );
};

export default Tags;
