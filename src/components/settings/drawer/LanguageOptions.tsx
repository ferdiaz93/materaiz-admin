// @mui
import { RadioGroup } from '@mui/material';
//
import { StyledCard, StyledWrap, MaskControl } from '../styles';
import { useLocales } from 'src/locales';

// ----------------------------------------------------------------------

export default function LanguageOptions() {
  const { currentLang, onChangeLang, allLangs } = useLocales();

  return (
    <RadioGroup name="languageMode" value={currentLang}>
      <StyledWrap>
        {allLangs.map((lang) => (
          <StyledCard
            key={lang.value}
            selected={currentLang.value === lang.value}
            onClick={() => onChangeLang(lang.value)}
          >
            <img src={lang.icon} alt={lang.label} />
            <MaskControl value={lang.value} />
          </StyledCard>
        ))}
      </StyledWrap>
    </RadioGroup>
  );
}
