import styled from 'styled-components';
import Colors from '../../colors';

export const LanguageContainer = styled.div``;

export const ButtonShowLanguages = styled.button`
  cursor: pointer;
  font-size: 30px;
  border: none;
  color: ${Colors.DarkBlue.Idle};
  margin-bottom: 5px;
  background-color: transparent;
`;

export const LanguageList = styled.div`
  list-style: none;
  border: 1px solid #ddd;
  border-radius: 5px;
  border-top-right-radius: 0px;
  background-color: #eee;
  box-shadow: 0px 0px 5px 1px #ddd;

  > li {
    display: flex;
    padding: 5px;
    border-bottom: 1px solid #ddd;

    &:hover {
      background-color: #dedede;
    }

    > a {
      text-decoration: none;
      padding: 5px;
      color: #000;

      > span {
        margin-right: 10px;
      }
    }
  }
`;
