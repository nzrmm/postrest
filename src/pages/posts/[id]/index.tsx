import React from "react";
import { isEmpty } from "lodash";
import { useRouter } from "next/router";

import { PostCommentCard } from "@/components";
import { cn } from "@/utils/style";
import { IPostType, IPostCommentType } from "@/types/post";
import { usePost, usePostComments } from "@/queries/post";

const Post = () => {
  const router = useRouter();
  const postId = router.query?.id as string;

  const { data: post } = usePost<IPostType>(postId, {
    enabled: router.isReady,
  });

  const { data: postComments } = usePostComments<IPostCommentType[]>(postId, {
    enabled: router.isReady,
  });

  return (
    <>
      <div className={cn("mx-auto sm:w-2/3")}>
        <div className={cn("mb-20")}>
          <p className={cn("font-bold tracking-tight text-4xl mb-6")}>
            {post?.title}
          </p>
          <p className={cn("text-neutral-700 leading-relaxed")}>{post?.body}</p>
        </div>

        <div>
          <p className={cn("font-bold tracking-tight text-2xl mb-4")}>
            Comments
          </p>
          <div className={cn("flex flex-col divide-y")}>
            {!isEmpty(postComments) &&
              postComments?.map((item) => (
                <PostCommentCard key={item.id} {...item} />
              ))}

            {isEmpty(postComments) && (
              <p className={cn("italic text-neutral-700")}>
                no comments available
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Post;
