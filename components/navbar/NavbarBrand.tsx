import * as React from 'react';
import { SITE_CONFIG } from '../../config/site';

import { Brand, BrandLink, BrandLockup } from './Navbar.styles';

type NavbarBrandProps = {
  onNavigateHome?: (event: React.MouseEvent<HTMLElement>) => void;
};

export function NavbarBrand({ onNavigateHome }: NavbarBrandProps) {
  return (
    <BrandLink
      href={SITE_CONFIG.sections.home}
      aria-label='Go to top of page'
      onClick={onNavigateHome}
    >
      <BrandLockup>
        <Brand variant='h5'>{SITE_CONFIG.brandName}</Brand>
      </BrandLockup>
    </BrandLink>
  );
}
