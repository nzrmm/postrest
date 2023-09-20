import React from "react";

import { cn } from "@/utils/style";

type IMainLayoutProps = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: IMainLayoutProps) => {
  return (
    <div className={cn("antialiased bg- text-neutral-900")}>
      <main className={cn("mx-auto w-[88%]", "lg:max-w-[1440px]")}>
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
