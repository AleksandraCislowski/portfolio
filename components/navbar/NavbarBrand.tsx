import { SITE_CONFIG } from '../../config/site';

import { Brand, BrandImage, BrandLink, BrandLockup, BrandMark } from './Navbar.styles';

export function NavbarBrand() {
  return (
    <BrandLink href={SITE_CONFIG.sections.home} aria-label='Go to top of page'>
      <BrandLockup>
        <BrandMark>
          <BrandImage src='/images/profile/monogram.png' alt='AC monogram' />
        </BrandMark>
        <Brand variant='h5'>{SITE_CONFIG.brandName}</Brand>
      </BrandLockup>
    </BrandLink>
  );
}
