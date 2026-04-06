import { InputLabel, MenuItem, Select } from '@mui/material';
import type { SelectChangeEvent, SelectProps } from '@mui/material/Select';

import { LANGUAGES, type Language } from '../../i18n/config';

import { LANGUAGE_LABELS } from './navbar.constants';
import { DrawerLanguageFormControl, LanguageFormControl } from './Navbar.styles';

type NavbarLanguageSelectProps = {
  idPrefix: string;
  label: string;
  value: Language;
  onChange: (event: SelectChangeEvent<Language>) => void;
  menuProps: SelectProps<Language>['MenuProps'];
  variant: 'desktop' | 'drawer';
};

export function NavbarLanguageSelect({
  idPrefix,
  label,
  value,
  onChange,
  menuProps,
  variant,
}: NavbarLanguageSelectProps) {
  const FormControlComponent =
    variant === 'desktop' ? LanguageFormControl : DrawerLanguageFormControl;
  const labelId = `${idPrefix}-label`;
  const selectId = idPrefix;

  return (
    <FormControlComponent size='small'>
      <InputLabel id={labelId}>{label}</InputLabel>
      <Select<Language>
        labelId={labelId}
        id={selectId}
        value={value}
        label={label}
        onChange={onChange}
        MenuProps={menuProps}
      >
        {LANGUAGES.map((language) => (
          <MenuItem key={language} value={language}>
            {LANGUAGE_LABELS[language]}
          </MenuItem>
        ))}
      </Select>
    </FormControlComponent>
  );
}
