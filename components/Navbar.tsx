'use client';
import * as React from 'react';
import { SelectProps } from '@mui/material/Select';
import MenuIcon from '@mui/icons-material/Menu';
import type { SelectChangeEvent } from '@mui/material/Select';
import { usePathname } from 'next/navigation';
import { useLanguage } from '../i18n/LanguageContext';
import type { Language } from '../i18n/config';
import { useTranslation } from '../i18n/useTranslation';
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
  MobileMenuButton,
  languageMenuPaperSx,
} from './navbar/Navbar.styles';
import type { NavbarItem } from './navbar/navbar.constants';
import { replaySectionAnimation } from './sectionAnimationReplay';

export default function Navbar() {
  const pathname = usePathname();
  const { lang, setLang } = useLanguage();
  const t = useTranslation();
  const [mobileNavOpen, setMobileNavOpen] = React.useState(false);
  const [activeHref, setActiveHref] = React.useState<string | null>(null);
  const [hasResolvedActiveHref, setHasResolvedActiveHref] = React.useState(false);
  const navLockUntilRef = React.useRef(0);
  const isHomePage = pathname === '/';
  const rootPrefix = isHomePage ? '' : '/';
  const languageMenuProps: SelectProps<Language>['MenuProps'] = {
    PaperProps: {
      sx: languageMenuPaperSx,
    },
  };

  const navItems = React.useMemo<readonly NavbarItem[]>(
    () => [
      {
        label: t.nav.home,
        href: SITE_CONFIG.sections.home,
        targetHref: isHomePage ? '/' : '/',
      },
      {
        label: t.nav.about,
        href: SITE_CONFIG.sections.about,
        targetHref: `${rootPrefix}${SITE_CONFIG.sections.about}`,
      },
      {
        label: t.nav.impact,
        href: SITE_CONFIG.sections.impact,
        targetHref: `${rootPrefix}${SITE_CONFIG.sections.impact}`,
      },
      {
        label: t.nav.projects,
        href: SITE_CONFIG.sections.projects,
        targetHref: `${rootPrefix}${SITE_CONFIG.sections.projects}`,
      },
      {
        label: t.nav.downloads,
        href: SITE_CONFIG.sections.downloads,
        targetHref: `${rootPrefix}${SITE_CONFIG.sections.downloads}`,
      },
      {
        label: t.nav.contact,
        href: SITE_CONFIG.sections.contact,
        targetHref: `${rootPrefix}${SITE_CONFIG.sections.contact}`,
      },
    ],
    [isHomePage, rootPrefix, t],
  );

  const resolveActiveHref = React.useCallback(() => {
    if (!isHomePage) {
      setActiveHref(SITE_CONFIG.sections.home);
      setHasResolvedActiveHref(true);
      return;
    }

    if (Date.now() < navLockUntilRef.current) {
      return;
    }

    const sectionItems = navItems.filter(
      (item) => item.href !== SITE_CONFIG.sections.home,
    );
    const topActivationLine = 132;
    const pageBottom = window.innerHeight + window.scrollY;
    const pageHeight = document.documentElement.scrollHeight;
    const nearTop = window.scrollY < 96;

    if (nearTop) {
      setActiveHref(SITE_CONFIG.sections.home);
      setHasResolvedActiveHref(true);
      return;
    }

    if (pageBottom >= pageHeight - 8) {
      setActiveHref(SITE_CONFIG.sections.contact);
      setHasResolvedActiveHref(true);
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
    setHasResolvedActiveHref(true);
  }, [isHomePage, navItems]);

  React.useLayoutEffect(() => {
    resolveActiveHref();
  }, [resolveActiveHref]);

  React.useEffect(() => {
    if (!isHomePage) {
      return;
    }

    window.addEventListener('scroll', resolveActiveHref, { passive: true });
    window.addEventListener('hashchange', resolveActiveHref);
    window.addEventListener('resize', resolveActiveHref);

    return () => {
      window.removeEventListener('scroll', resolveActiveHref);
      window.removeEventListener('hashchange', resolveActiveHref);
      window.removeEventListener('resize', resolveActiveHref);
    };
  }, [isHomePage, resolveActiveHref]);

  const handleLanguageChange = (event: SelectChangeEvent<Language>) => {
    setLang(event.target.value as Language);
  };

  const handleOpenMobileNav = () => {
    setMobileNavOpen(true);
  };

  const handleCloseMobileNav = () => {
    setMobileNavOpen(false);
  };

  const handleSamePageNavigation = React.useCallback((href: string) => {
    setActiveHref(href);
    setHasResolvedActiveHref(true);
    navLockUntilRef.current = Date.now() + 900;

    const topOffset = 96;
    const targetSectionId = href === SITE_CONFIG.sections.home ? null : href.replace(/^#/, '');
    const targetNode = targetSectionId
      ? document.getElementById(targetSectionId)
      : null;
    const targetY = targetNode
      ? window.scrollY + targetNode.getBoundingClientRect().top - topOffset
      : 0;
    const normalizedTargetY = Math.max(0, targetY);
    const tolerance = 10;
    const isAlreadyAtTarget = Math.abs(window.scrollY - normalizedTargetY) <= tolerance;

    window.scrollTo({
      top: normalizedTargetY,
      behavior: 'smooth',
    });

    const maxWaitMs = 1400;
    const startTime = window.performance.now();

    const finishReplay = () => {
      if (!isAlreadyAtTarget) {
        return;
      }

      replaySectionAnimation(href);
    };

    const pollScroll = () => {
      const currentTargetY = targetNode
        ? window.scrollY + targetNode.getBoundingClientRect().top - topOffset
        : 0;
      const settled = Math.abs(window.scrollY - Math.max(0, currentTargetY)) <= tolerance;
      const timedOut = window.performance.now() - startTime >= maxWaitMs;

      if (settled || timedOut) {
        finishReplay();
        return;
      }

      window.requestAnimationFrame(pollScroll);
    };

    window.requestAnimationFrame(pollScroll);
  }, []);

  const handleNavigate = React.useCallback((
    event: React.MouseEvent<HTMLElement>,
    href: string,
    targetHref: string,
  ) => {
    if (!isHomePage || !targetHref.startsWith('#')) {
      setActiveHref(href);
      setHasResolvedActiveHref(true);
      navLockUntilRef.current = Date.now() + 900;
      return;
    }

    event.preventDefault();
    handleSamePageNavigation(href);
  }, [handleSamePageNavigation, isHomePage]);

  const handleNavigateHome = React.useCallback((event: React.MouseEvent<HTMLElement>) => {
    if (!isHomePage) {
      return;
    }

    event.preventDefault();
    handleSamePageNavigation(SITE_CONFIG.sections.home);
  }, [handleSamePageNavigation, isHomePage]);

  return (
    <StyledAppBar position='sticky' color='default' elevation={0}>
      <StyledToolbar disableGutters>
        <NavbarBrand onNavigateHome={handleNavigateHome} />

        <ToolbarRight>
          <NavbarDesktopNav
            items={navItems}
            activeHref={hasResolvedActiveHref ? activeHref : null}
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
            <MobileMenuButton
              edge='end'
              color='inherit'
              aria-label={t.accessibility.openNavigationMenu}
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
        activeHref={hasResolvedActiveHref ? activeHref : null}
        onNavigate={handleNavigate}
      />
    </StyledAppBar>
  );
}
