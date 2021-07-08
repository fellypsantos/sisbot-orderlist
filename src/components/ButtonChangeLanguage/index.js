import React, {useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {LanguageContainer, ButtonShowLanguages, LanguageList} from './styles';

const supportedLanguages = [
  {
    title: 'Português',
    country_code: 'br',
  },
  {
    title: 'English',
    country_code: 'us',
  },
  {
    title: 'Spañol',
    country_code: 'es',
  },
];

export default function ButtonChangeLanguage(props) {
  const [languageOptionsVisible, setLanguageOptionsVisible] = useState(false);
  const {icon, handleChange} = props;

  const handleOptionsVisibility = (e) => {
    e.preventDefault();
    setLanguageOptionsVisible(!languageOptionsVisible);
  };

  const handleChangeLanguage = (countryCode) => {
    handleChange(countryCode);
    setLanguageOptionsVisible(false);
  };

  return (
    <LanguageContainer>
      <ButtonShowLanguages onClick={(e) => handleOptionsVisibility(e)}>
        <FontAwesomeIcon icon={icon} />
      </ButtonShowLanguages>
      {languageOptionsVisible && (
        <LanguageList>
          {supportedLanguages.map((lang) => (
            <li key={lang.country_code}>
              <a
                href="#!"
                onClick={() => handleChangeLanguage(lang.country_code)}>
                <span className={`flag-icon flag-icon-${lang.country_code}`} />
                {lang.title}
              </a>
            </li>
          ))}
        </LanguageList>
      )}
    </LanguageContainer>
  );
}
