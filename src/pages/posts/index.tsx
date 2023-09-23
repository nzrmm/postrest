import React from "react";
import Head from "next/head";
import { isEmpty } from "lodash";
import { ImSpinner6 } from "react-icons/im";

import { InfinitePagination } from "@/components/commons";
import { PostCard } from "@/components/posts";
import { cn } from "@/utils/style";
import { IPostType } from "@/types/post";
import { usePosts } from "@/queries/post";
import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import { setParams } from "@/stores/post/postSlice";

const Posts = () => {
  const dispatch = useAppDispatch();
  const { params } = useAppSelector((state) => state.post);

  const { data, isLoading, isError, error } = usePosts<IPostType[]>(params);

  const handlePagination = (page: number) => {
    dispatch(setParams({ field: "page", value: page }));
  };

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
          <h1 className={cn("mb-1")}>All Post</h1>
          <p>
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

        <InfinitePagination
          page={params.page}
          disableOnNext={isEmpty(data)}
          disableOnPrevious={params.page <= 1}
          onNext={() => handlePagination(params.page + 1)}
          onPrevious={() => handlePagination(params.page - 1)}
        />
      </div>
    </>
  );
};

export default Posts;
