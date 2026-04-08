import * as React from 'react';
import { SITE_CONFIG } from '../../config/site';
import { useTranslation } from '../../i18n/useTranslation';

import { Brand, BrandLink, BrandLockup } from './Navbar.styles';

type NavbarBrandProps = {
  onNavigateHome?: (event: React.MouseEvent<HTMLElement>) => void;
};

export function NavbarBrand({ onNavigateHome }: NavbarBrandProps) {
  const t = useTranslation();

  return (
    <BrandLink
      href={SITE_CONFIG.sections.home}
      aria-label={t.accessibility.goToTop.replace('{{name}}', SITE_CONFIG.brandName)}
      onClick={onNavigateHome}
    >
      <BrandLockup>
        <Brand as='span' variant='h5'>{SITE_CONFIG.brandName}</Brand>
      </BrandLockup>
    </BrandLink>
  );
}
