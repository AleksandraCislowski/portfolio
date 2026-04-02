import { NavButton, DesktopNav } from './Navbar.styles';
import type { NavbarItem } from './navbar.constants';

type NavbarDesktopNavProps = {
  items: readonly NavbarItem[];
  activeHref: string | null;
  onNavigate: (href: string) => void;
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
          onClick={() => onNavigate(item.href)}
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
