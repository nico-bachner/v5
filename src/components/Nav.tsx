import { HomeIcon, CollectionIcon, PencilIcon } from "@heroicons/react/outline";
import { NavItem } from "./NavItem";

export const Nav: React.VFC = () => (
  <nav className="fixed bottom-8 left-8 right-8 mx-auto flex w-fit gap-4 rounded-xl border border-white/20 bg-white/25 p-2 shadow-lg backdrop-blur-sm">
    <NavItem href="/">
      <HomeIcon />
    </NavItem>
    <NavItem href="/projects">
      <CollectionIcon />
    </NavItem>
    <NavItem href="/writing">
      <PencilIcon />
    </NavItem>
  </nav>
);
