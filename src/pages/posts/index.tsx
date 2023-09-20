import React from "react";
import Head from "next/head";

import { PostCard } from "@/components";
import { cn } from "@/utils/style";

const Posts = () => {
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
        <div className={cn("mb-14")}>
          <p
            className={cn(
              "text-5xl font-bold leading-tight tracking-wide mb-4"
            )}
          >
            All Post
          </p>
          <p
            className={cn(
              "text-lg font-normal leading-loose tracking-wider text-neutral-700"
            )}
          >
            Collection of posts from https://gorest.co.in/ api. Feel free to
            reads.
          </p>
        </div>

        <div className={cn("grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10")}>
          <PostCard
            id={70220}
            user_id={5181930}
            title="Vel numquam benigne damnatio certe coniuratio."
            body="Certo valetudo thalassinus. Spero torqueo amissio. Auxilium viscus catena. Apparatus laudantium est. Avarus condico astrum. Clarus creo aeneus. Vacuus congregatio desino. Calcar suggero fuga. Curis coma amitto. Teres delinquo utpote. Inflammatio clementia fugiat. Cumque artificiose spargo."
          />
        </div>
      </div>
    </>
  );
};

export default Posts;
