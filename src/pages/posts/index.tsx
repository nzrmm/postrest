import React from "react";
import Head from "next/head";
import { ImSpinner6 } from "react-icons/im";

import { PostCard } from "@/components";
import { cn } from "@/utils/style";
import { IPostType } from "@/types/post";
import { usePosts } from "@/queries/post";

const Posts = () => {
  const { data, isLoading, isError, error } = usePosts<IPostType[]>();

  return (
    <>
      <Head>
        <title>All Post - Postrest.</title>
        <meta
          name="description"
          content="a collection of post from https://gorest.co.in/ api"
        />
      </Head>

      <div>
        <div className={cn("mb-8")}>
          <p
            className={cn(
              "text-4xl font-bold leading-tight tracking-wide mb-1"
            )}
          >
            All Post
          </p>
          <p className={cn("leading-loose text-neutral-700")}>
            Collection of posts from https://gorest.co.in/ api. Feel free to
            reads.
          </p>
        </div>

        {isLoading && <ImSpinner6 className={cn("animate-spin")} />}

        {!isLoading && isError && (
          <p className={cn("text-rose-500")}>{error.message}</p>
        )}

        {!isLoading && data && (
          <div className={cn("grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10")}>
            {data?.map((item: IPostType) => (
              <PostCard key={item.id} {...item} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Posts;
