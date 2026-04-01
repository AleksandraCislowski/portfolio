import { NavButton, DesktopNav } from './Navbar.styles';
import type { NavbarItem } from './navbar.constants';

type NavbarDesktopNavProps = {
  items: readonly NavbarItem[];
};

export function NavbarDesktopNav({ items }: NavbarDesktopNavProps) {
  return (
    <DesktopNav>
      {items.map((item) => (
        <NavButton key={item.href} href={item.href} color='inherit'>
          {item.label}
        </NavButton>
      ))}
    </DesktopNav>
  );
}
