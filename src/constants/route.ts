export type IRouteType = {
  href: string;
  name: string;
};

export const ROUTES: IRouteType[] = [
  { href: "/posts", name: "Posts" },
  { href: "/users", name: "Users" },
];
