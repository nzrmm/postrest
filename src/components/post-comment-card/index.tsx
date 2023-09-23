import { cn } from "@/utils/style";
import { IPostCommentType } from "@/types/post";

const PostCommentCard = ({ name, email, body }: IPostCommentType) => {
  return (
    <div className={cn("py-2")}>
      <div className={cn("mb-2")}>
        <p className={cn("text-neutral-900 font-semibold")}>{name}</p>
        <span className={cn("span-extra-small")}>{email}</span>
      </div>
      <span className={cn("span-small")}>{body}</span>
    </div>
  );
};

export default PostCommentCard;
