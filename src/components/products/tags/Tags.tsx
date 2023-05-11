import { Tag } from "@/components";
import { ProductTag } from "@medusajs/medusa";

type Props = {
  tags?: ProductTag[];
};

const Tags = ({ tags }: Props) => {
  if (!tags || tags.length === 0) {
    return null;
  }

  return (
    <div className="flex items-center gap-x-1.5">
      {tags.map((tag) => {
        return <Tag key={tag.id}>{tag.value}</Tag>;
      })}
    </div>
  );
};

export default Tags;
