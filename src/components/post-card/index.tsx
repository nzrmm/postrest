import { useRouter } from "next/router";

import { Button } from "@/components";
import { cn } from "@/utils/style";
import { IPostType } from "@/types/post";

const PostCard = ({ id, title, body }: IPostType) => {
  const router = useRouter();

  return (
    <div
      className={cn(
        "bg-white rounded-lg p-6 shadow-xl",
        "border border-neutral-100"
      )}
    >
      <p className={cn("font-bold tracking-tight text-2xl line-clamp-2 mb-4")}>
        {title}
      </p>

      <p
        className={cn(
          "font-secondary text-neutral-700 leading-relaxed line-clamp-4 mb-6"
        )}
      >
        {body}
      </p>

      <Button
        id="post-detail-button"
        size="sm"
        variant="primary"
        onClick={() => router.push(`/posts/${id}`)}
      >
        Read more
      </Button>
    </div>
  );
};

export default PostCard;
