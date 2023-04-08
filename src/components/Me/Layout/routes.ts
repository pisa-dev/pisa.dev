import { signOut } from "next-auth/react";

export interface NavigationDest {
  href: string;
  adminOnly: boolean;
}

export const navigation = {
  Dashboard: { href: "/me/dashboard", adminOnly: false },
  Eventi: { href: "/me/events", adminOnly: true },
  Proposte: { href: "/me/proposals", adminOnly: false },
};
export const userNavigation = [
  { name: "Your Profile", href: "#" },
  { name: "Sign out", href: "#", onClick: () => signOut() },
];
