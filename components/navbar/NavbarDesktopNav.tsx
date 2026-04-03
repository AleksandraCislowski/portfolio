import * as React from 'react';
import { NavButton, DesktopNav } from './Navbar.styles';
import type { NavbarItem } from './navbar.constants';

type NavbarDesktopNavProps = {
  items: readonly NavbarItem[];
  activeHref: string | null;
  onNavigate: (
    event: React.MouseEvent<HTMLElement>,
    href: string,
    targetHref: string,
  ) => void;
};

export function NavbarDesktopNav({
  items,
  activeHref,
  onNavigate,
}: NavbarDesktopNavProps) {
  return (
    <DesktopNav>
      {items.map((item) => (
        <NavButton
          key={item.href}
          href={item.targetHref ?? item.href}
          onClick={(event) => onNavigate(event, item.href, item.targetHref ?? item.href)}
          color='inherit'
          active={activeHref === item.href}
          aria-current={activeHref === item.href ? 'page' : undefined}
        >
          {item.label}
        </NavButton>
      ))}
    </DesktopNav>
  );
}
