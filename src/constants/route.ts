export type IRouteType = {
  href: string;
  name: string;
};

export const ROUTES: IRouteType[] = [
  { href: "/", name: "Home" },
  { href: "/users", name: "Users" },
];
