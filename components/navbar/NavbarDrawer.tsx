import { Drawer, List, ListItemButton, ListItemText } from '@mui/material';
import type { SelectChangeEvent, SelectProps } from '@mui/material/Select';

import type { Language } from '../../i18n/LanguageContext';

import { DrawerContent, drawerPaperSx } from './Navbar.styles';
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
  onToggleTheme: () => void;
  themeModeLabel: string;
};

export function NavbarDrawer({
  items,
  languageLabel,
  languageValue,
  onLanguageChange,
  menuProps,
  mobileNavOpen,
  onClose,
  onToggleTheme,
  themeModeLabel,
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
          <ListItemButton onClick={onToggleTheme}>
            <ListItemText primary={themeModeLabel} />
          </ListItemButton>
          {items.map((item) => (
            <ListItemButton
              key={item.href}
              component='a'
              href={item.href}
              onClick={onClose}
            >
              <ListItemText primary={item.label} />
            </ListItemButton>
          ))}
        </List>
      </DrawerContent>
    </Drawer>
  );
}
