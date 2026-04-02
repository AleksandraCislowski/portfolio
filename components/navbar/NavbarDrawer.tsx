import { Drawer, List, ListItemButton, ListItemText } from '@mui/material';
import type { SelectChangeEvent, SelectProps } from '@mui/material/Select';

import type { Language } from '../../i18n/LanguageContext';

import { DrawerContent, DrawerNavItem, drawerPaperSx } from './Navbar.styles';
import { NavbarLanguageSelect } from './NavbarLanguageSelect';
import type { NavbarItem } from './navbar.constants';

type NavbarDrawerProps = {
  items: readonly NavbarItem[];
  languageLabel: string;
  languageValue: Language;
  onLanguageChange: (event: SelectChangeEvent<Language>) => void;
  menuProps: SelectProps<Language>['MenuProps'];
  mobileNavOpen: boolean;
  onClose: () => void;
  activeHref: string;
  onNavigate: (href: string) => void;
};

export function NavbarDrawer({
  items,
  languageLabel,
  languageValue,
  onLanguageChange,
  menuProps,
  mobileNavOpen,
  onClose,
  activeHref,
  onNavigate,
}: NavbarDrawerProps) {
  return (
    <Drawer
      anchor='right'
      open={mobileNavOpen}
      onClose={onClose}
      PaperProps={{ sx: drawerPaperSx }}
    >
      <DrawerContent>
        <NavbarLanguageSelect
          idPrefix='drawer-lang-select'
          label={languageLabel}
          value={languageValue}
          onChange={onLanguageChange}
          menuProps={menuProps}
          variant='drawer'
        />
        <List>
          {items.map((item) => (
            <DrawerNavItem key={item.href} active={activeHref === item.href}>
              <ListItemButton
                component='a'
                href={item.targetHref ?? item.href}
                onClick={() => {
                  onNavigate(item.href);
                  onClose();
                }}
                selected={activeHref === item.href}
              >
                <ListItemText primary={item.label} />
              </ListItemButton>
            </DrawerNavItem>
          ))}
        </List>
      </DrawerContent>
    </Drawer>
  );
}
