import * as React from 'react';
import { useTranslation } from '../../i18n/useTranslation';
import { SITE_CONFIG } from '../../config/site';

import { Brand, BrandLink, BrandLockup } from './Navbar.styles';

export function NavbarBrand() {
  const t = useTranslation();

  return (
    <BrandLink
      href='/'
      aria-label={t.accessibility.goToTop.replace('{{name}}', SITE_CONFIG.brandName)}
    >
      <BrandLockup>
        <Brand as='span' variant='h5'>{SITE_CONFIG.brandName}</Brand>
      </BrandLockup>
    </BrandLink>
  );
}
