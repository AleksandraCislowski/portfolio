import * as React from 'react';
import { SelectProps } from '@mui/material/Select';
import MenuIcon from '@mui/icons-material/Menu';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import type { SelectChangeEvent } from '@mui/material/Select';
import { useLanguage, type Language } from '../i18n/LanguageContext';
import { useTranslation } from '../i18n/useTranslation';
import { useThemeMode } from '../theme/ThemeModeContext';
import { SITE_CONFIG } from '../config/site';
import { NavbarBrand } from './navbar/NavbarBrand';
import { NavbarDesktopNav } from './navbar/NavbarDesktopNav';
import { NavbarDrawer } from './navbar/NavbarDrawer';
import { NavbarLanguageSelect } from './navbar/NavbarLanguageSelect';
import {
  StyledAppBar,
  StyledToolbar,
  ToolbarRight,
  RightControls,
  ThemeButton,
  MobileMenuButton,
  languageMenuPaperSx,
} from './navbar/Navbar.styles';
import type { NavbarItem } from './navbar/navbar.constants';

export default function Navbar() {
  const { lang, setLang } = useLanguage();
  const t = useTranslation();
  const { mode, setMode } = useThemeMode();
  const [mobileNavOpen, setMobileNavOpen] = React.useState(false);
  const [activeHref, setActiveHref] = React.useState<string>(
    SITE_CONFIG.sections.home,
  );
  const navLockUntilRef = React.useRef(0);

  const nextMode = mode === 'dark' ? 'light' : 'dark';
  const languageMenuProps: SelectProps<Language>['MenuProps'] = {
    PaperProps: {
      sx: languageMenuPaperSx,
    },
  };

  const navItems = React.useMemo<readonly NavbarItem[]>(
    () => [
      { label: t.nav.home, href: SITE_CONFIG.sections.home },
      { label: t.nav.about, href: SITE_CONFIG.sections.about },
      { label: t.nav.impact, href: SITE_CONFIG.sections.impact },
      { label: t.nav.projects, href: SITE_CONFIG.sections.projects },
      { label: t.nav.downloads, href: SITE_CONFIG.sections.downloads },
      { label: t.nav.contact, href: SITE_CONFIG.sections.contact },
    ],
    [t],
  );

  React.useEffect(() => {
    const sectionItems = navItems.filter(
      (item) => item.href !== SITE_CONFIG.sections.home,
    );

    const resolveActiveHref = () => {
      if (Date.now() < navLockUntilRef.current) {
        return;
      }

      const topActivationLine = 132;
      const pageBottom = window.innerHeight + window.scrollY;
      const pageHeight = document.documentElement.scrollHeight;
      const nearTop = window.scrollY < 96;

      if (nearTop) {
        setActiveHref(SITE_CONFIG.sections.home);
        return;
      }

      if (pageBottom >= pageHeight - 8) {
        setActiveHref(SITE_CONFIG.sections.contact);
        return;
      }

      let nextActiveHref: string = SITE_CONFIG.sections.home;

      for (const item of sectionItems) {
        const sectionId = item.href.replace(/^#/, '');
        const section = document.getElementById(sectionId);

        if (!section) {
          continue;
        }

        const { top } = section.getBoundingClientRect();

        if (top <= topActivationLine) {
          nextActiveHref = item.href;
        }
      }

      setActiveHref(nextActiveHref);
    };

    resolveActiveHref();
    window.addEventListener('scroll', resolveActiveHref, { passive: true });
    window.addEventListener('hashchange', resolveActiveHref);
    window.addEventListener('resize', resolveActiveHref);

    return () => {
      window.removeEventListener('scroll', resolveActiveHref);
      window.removeEventListener('hashchange', resolveActiveHref);
      window.removeEventListener('resize', resolveActiveHref);
    };
  }, [navItems]);

  const handleLanguageChange = (event: SelectChangeEvent<Language>) => {
    setLang(event.target.value as Language);
  };

  const handleOpenMobileNav = () => {
    setMobileNavOpen(true);
  };

  const handleCloseMobileNav = () => {
    setMobileNavOpen(false);
  };

  const handleToggleTheme = () => {
    setMode(nextMode);
  };

  const handleNavigate = (href: string) => {
    setActiveHref(href);
    navLockUntilRef.current = Date.now() + 900;
  };

  return (
    <StyledAppBar position='sticky' color='default' elevation={0}>
      <StyledToolbar>
        <NavbarBrand />

        <ToolbarRight>
          <NavbarDesktopNav
            items={navItems}
            activeHref={activeHref}
            onNavigate={handleNavigate}
          />

          <NavbarLanguageSelect
            idPrefix='lang-select'
            label={t.nav.language}
            value={lang}
            onChange={handleLanguageChange}
            menuProps={languageMenuProps}
            variant='desktop'
          />

          <RightControls>
            <ThemeButton
              onClick={handleToggleTheme}
              color='inherit'
              aria-label={`Switch to ${nextMode} mode`}
            >
              {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </ThemeButton>

            <MobileMenuButton
              edge='end'
              color='inherit'
              aria-label='Open navigation menu'
              onClick={handleOpenMobileNav}
            >
              <MenuIcon />
            </MobileMenuButton>
          </RightControls>
        </ToolbarRight>
      </StyledToolbar>

      <NavbarDrawer
        items={navItems}
        languageLabel={t.nav.language}
        languageValue={lang}
        onLanguageChange={handleLanguageChange}
        menuProps={languageMenuProps}
        mobileNavOpen={mobileNavOpen}
        onClose={handleCloseMobileNav}
        activeHref={activeHref}
        onNavigate={handleNavigate}
      />
    </StyledAppBar>
  );
}
