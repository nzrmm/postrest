import React from "react";

import { CommentCard } from "@/components";
import { cn } from "@/utils/style";

const Post = () => {
  return (
    <>
      <div className={cn("mx-auto sm:w-2/3")}>
        <div className={cn("mb-20")}>
          <p className={cn("font-bold tracking-tight text-4xl mb-6")}>
            Vel numquam benigne damnatio certe coniuratio.
          </p>
          <p className={cn("text-neutral-700 leading-relaxed")}>
            Certo valetudo thalassinus. Spero torqueo amissio. Auxilium viscus
            catena. Apparatus laudantium est. Avarus condico astrum. Clarus creo
            aeneus. Vacuus congregatio desino. Calcar suggero fuga. Curis coma
            amitto. Teres delinquo utpote. Inflammatio clementia fugiat. Cumque
            artificiose spargo.
          </p>
        </div>

        <div>
          <p className={cn("font-bold tracking-tight text-2xl mb-4")}>
            Comments
          </p>
          <div className={cn("flex flex-col divide-y")}>
            <CommentCard
              id={56926}
              post_id={70220}
              name="Prof. Chandrani Mukhopadhyay"
              email="chandrani_mukhopadhyay_prof@ward.example"
              body="Dolorum nam suscipit."
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Post;
