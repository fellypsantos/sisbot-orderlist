import styled from 'styled-components';

const Colors = {
  DarkBlue: {
    Idle: '#003b64',
    Hover: '#031f32',
  },
};

export const MainContainer = styled.div`
  width: 650px;
  margin: 0 auto;

  display: flex;
  flex-direction: column;
`;

export const FormContainer = styled.form`
  display: flex;
  border: 2px solid ${Colors.DarkBlue.Idle};
  border-radius: 5px;
  width: 650px;
  min-height: 200px;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const LanguageBox = styled.div`
  display: flex;
  position: absolute;
  margin-right: -560px;
  margin-top: -130px;
`;

export const FormBox = styled.div`
  display: flex;
`;

export const ImportExportContainer = styled.div`
  background-color: #003b64;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  align-self: center;
  overflow: hidden;
  margin-top: -25px;
`;

export const ActionButton = styled.a`
  background-color: ${Colors.DarkBlue.Idle};
  text-decoration: none;
  color: #fff;
  padding: 10px 20px;
  transition: background-color 0.4s ease;

  :hover {
    background-color: ${Colors.DarkBlue.Hover};
  }
`;

export const ActionButtonText = styled.span`
  margin: 0 10px;
  margin-left: ${(props) => (props.marginLeft ? '0px' : '10px')};
  margin-right: ${(props) => (props.marginRight ? '0px' : '10px')};
`;

export const ActionDivider = styled.div`
  border-left: 1px solid #fff;
  width: 0px;
  height: 25px;
`;

// table
export const TableOrderList = styled.table`
  margin: 0px;
  margin: 0 auto;
  margin-top: 50px;
  width: 650px;
  border-collapse: collapse;
  border-spacing: 0;
`;

export const TableHeadOrderList = styled.thead`
  > tr {
    text-align: center;

    td {
      border: 1px solid ${Colors.DarkBlue.Idle};
      padding: 5px 10px;
      font-size: 12px;
      font-weight: bold;
    }
  }
`;

export const TableBodyOrderList = styled.tbody`
  > tr {
    td:not(:first-child) {
      text-align: center;
    }

    td {
      border: 1px solid #ccc;
      padding: 3px;
    }

    td > a {
      color: ${Colors.DarkBlue.Idle};
      transition: color 0.3s ease;

      :hover {
        color: ${Colors.DarkBlue.Hover};
      }
    }

    :hover {
      background-color: #ddd;
    }
  }
`;

// POPUP SECTION
export const PopupOverlay = styled.div`
  display: ${(props) => (props.visible ? 'block' : 'none')};
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.9);
`;

export const PopupContainer = styled.div`
  background-color: #fff;
  box-shadow: 0px 0px 2px 1px #fff;
  width: 410px;
  margin: 0 auto;
  margin-top: 155px;
  border-radius: 4px;
`;

export const PopupForm = styled.form`
  padding: 10px 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
export const PopupButtonsContainer = styled.div`
  display: flex;
  background-color: #ccc;
  margin-bottom: 20px;
  border-radius: 5px;
  border: 1px solid ${Colors.DarkBlue.Idle};
`;

export const NameNumberEditingMode = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
