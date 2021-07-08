import styled from 'styled-components';

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 2px;
  width: ${(props) => (props.small ? '120px' : '200px')};
`;

export const InputLabel = styled.label`
  font-weight: bold;
  padding: 5px 0px;
`;

export const InputItem = styled.input`
  font-size: 18px;
  text-align: ${(props) => (props.centered ? 'center' : 'left')};
  border-radius: 5px;
  padding: 0 10px;
  border: none;
  margin-right: 5px;
  height: 45px;
  border: 1px solid #555;
`;
