import * as React from 'react';
import { Drawer, List, ListItemButton, ListItemText } from '@mui/material';

import type { Language } from '../../i18n/config';

import { DrawerContent, DrawerNavItem, drawerPaperSx } from './Navbar.styles';
import { NavbarLanguageSelect } from './NavbarLanguageSelect';
import type { NavbarItem } from './navbar.constants';

type NavbarDrawerProps = {
  items: readonly NavbarItem[];
  languageLabel: string;
  languageValue: Language;
  onLanguageChange: (language: Language) => void;
  mobileNavOpen: boolean;
  onClose: () => void;
  activeHref: string | null;
  onNavigate: (
    event: React.MouseEvent<HTMLElement>,
    href: string,
    targetHref: string,
  ) => void;
};

export function NavbarDrawer({
  items,
  languageLabel,
  languageValue,
  onLanguageChange,
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
      ModalProps={{
        disableScrollLock: true,
      }}
      PaperProps={{ sx: drawerPaperSx }}
    >
      <DrawerContent>
        <NavbarLanguageSelect
          label={languageLabel}
          value={languageValue}
          onChange={(language) => {
            onLanguageChange(language);
            onClose();
          }}
          variant='drawer'
        />
        <List>
          {items.map((item) => (
            <DrawerNavItem key={item.href} active={activeHref === item.href}>
              <ListItemButton
                component='a'
                href={item.targetHref ?? item.href}
                onClick={(event) => {
                  onNavigate(event, item.href, item.targetHref ?? item.href);
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
