import Head from "next/head";
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
      <Head>
        <title>{post?.title} - Postrest.</title>
        <meta name="description" content={post?.body} />
      </Head>

      <div className={cn("mx-auto sm:w-2/3")}>
        <div className={cn("mb-20")}>
          <h1 className={cn("tracking-tight mb-6")}>{post?.title}</h1>
          <p>{post?.body}</p>
        </div>

        <div>
          <h4 className={cn("mb-4")}>Comments</h4>
          <div className={cn("flex flex-col divide-y")}>
            {!isEmpty(postComments) &&
              postComments?.map((item) => (
                <PostCommentCard key={item.id} {...item} />
              ))}

            {isEmpty(postComments) && (
              <p className={cn("italic")}>no comments available</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Post;
