import { cn } from "@/utils/style";
import { ICommentType } from "@/types/comment";

const CommentCard = ({ name, email, body }: ICommentType) => {
  return (
    <div className={cn("py-2")}>
      <div className={cn("mb-2")}>
        <p className={cn("font-semibold")}>{name}</p>
        <p className={cn("text-xs text-neutral-500")}>{email}</p>
      </div>
      <p className={cn("text-neutral-700 leading-relaxed text-sm")}>{body}</p>
    </div>
  );
};

export default CommentCard;
