import styled from 'styled-components';
import Colors from '../../colors';

export const Button = styled.button`
  background-color: ${Colors.DarkBlue.Idle};
  border: none;
  cursor: pointer;
  color: #fff;
  border-radius: 5px;
  margin-top: 28px;
  height: 47px;
  display: flex;
  align-items: center;
  font-size: 14px;
  padding: 0 15px;
  transition: background-color 0.3s ease;

  :hover {
    background-color: ${Colors.DarkBlue.Hover};
  }

  > span {
    margin-left: 5px;
  }
`;
