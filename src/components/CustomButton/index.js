import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Button} from './styles';

export default function CustomButton(props) {
  const {text, icon, handleClick} = props;

  return (
    <Button onClick={handleClick}>
      <FontAwesomeIcon icon={icon} />
      <span>{text}</span>
    </Button>
  );
}
