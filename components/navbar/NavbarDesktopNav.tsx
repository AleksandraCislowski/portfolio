import { NavButton, DesktopNav } from './Navbar.styles';
import type { NavbarItem } from './navbar.constants';

type NavbarDesktopNavProps = {
  items: readonly NavbarItem[];
  activeHref: string;
};

export function NavbarDesktopNav({ items, activeHref }: NavbarDesktopNavProps) {
  return (
    <DesktopNav>
      {items.map((item) => (
        <NavButton
          key={item.href}
          href={item.href}
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
