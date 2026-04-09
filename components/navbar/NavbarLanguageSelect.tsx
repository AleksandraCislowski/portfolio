import { LANGUAGES, type Language } from '../../i18n/config';
import { LANGUAGE_LABELS } from './navbar.constants';
import { LanguageSwitch, LanguageSwitchButton } from './Navbar.styles';

type NavbarLanguageSelectProps = {
  label: string;
  value: Language;
  onChange: (language: Language) => void;
  variant: 'desktop' | 'drawer';
};

export function NavbarLanguageSelect({
  label,
  value,
  onChange,
  variant,
}: NavbarLanguageSelectProps) {
  return (
    <LanguageSwitch
      role='group'
      aria-label={label}
      sx={
        variant === 'drawer'
          ? {
              mx: 2,
              mb: 2,
              mt: 1,
              width: 'fit-content',
            }
          : {
              display: {
                xs: 'none',
                lg: 'inline-flex',
              },
            }
      }
    >
      {LANGUAGES.map((language) => (
        <LanguageSwitchButton
          key={language}
          type='button'
          $active={value === language}
          aria-pressed={value === language}
          onClick={() => onChange(language)}
        >
          {LANGUAGE_LABELS[language]}
        </LanguageSwitchButton>
      ))}
    </LanguageSwitch>
  );
}
