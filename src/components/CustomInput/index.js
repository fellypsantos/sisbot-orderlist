import React from 'react';
import {InputContainer, InputLabel, InputItem} from './styles';

export default function CustomInput(props) {
  const {small, id, label, value, centered, handleChange} = props;

  return (
    <InputContainer small={small}>
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <InputItem
        type="text"
        id={id}
        value={value}
        centered={centered}
        onChange={handleChange}
      />
    </InputContainer>
  );
}
