import styled from 'styled-components';

const Colors = {
    DarkBlue: {
        Idle: '#003b64',
        Hover: '#031f32',
    }
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
    height: 200px;
    margin: 0 auto;
    justify-content: center;
    align-items: center;
`;

export const TextInputContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin: 2px;
    width: ${props => props.small ? "120px" : "200px"};
`;

export const TextInputLabel = styled.label`
    font-weight: bold;
    padding: 5px 0px;
`;

export const TextInput = styled.input`
    
    font-size: 18px;
    text-align: ${props => props.centered ? "center" : "left"};
    border-radius: 5px;
    padding: 0 10px;
    border: none;
    margin-right: 5px;
    height: 45px;
    border: 1px solid #555;
`;

export const ButtonAddOrder = styled.a`
    background-color: ${Colors.DarkBlue.Idle};
    text-decoration: none;
    color: #fff;
    border-radius: 5px;
    margin-top: 31px;
    height: 47px;
    display: flex;
    align-items: center;
    padding: 0 15px;
    transition: background-color .3s ease;

    :hover {
        background-color: ${Colors.DarkBlue.Hover};
    }
`;

export const ButtonAddOrderText = styled.span`
    margin-left: 5px;
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
    margin-left: ${props => props.marginLeft ? "0px" : "10px"};
    margin-right: ${props => props.marginRight ? "0px" : "10px"};
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
            transition: color .3s ease;

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
    display: ${props => props.visible ? "block" : "none"};
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .9);
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

export const CustomSelect = styled.select`
    padding: 10px 15px;
    text-align: center;
`;

export const OrderItemTable = styled.table`
    margin: 20px 0px;
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

// LANGUAGE SELECTOR
export const LanguageContiner = styled.div`
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
    flex-direction: column;
    margin-bottom: 10px;
`;

export const LanguageList = styled.ul`
    list-style: none;
    justify-content: flex-start;
    border: 1px solid #ddd;
    border-radius: 5px;
    border-top-right-radius: 0px;
    background-color: #eee;
    box-shadow: 0px 0px 5px 1px #ddd;
    margin: 0;
    padding: 0;

    > li {
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

export const ButtonShowLanguages = styled.button`
    cursor: pointer;
    font-size: 25px;
    padding: 5px 15px;
    border-radius: 5px;
    background-color: ${Colors.DarkBlue.Idle};
    border: none;
    color: #fff;
    margin-bottom: 5px;
    transition: background-color .3s ease;

    :hover {
        background-color: ${Colors.DarkBlue.Hover};
    }
`;
