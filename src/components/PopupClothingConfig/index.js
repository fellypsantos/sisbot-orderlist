import React from 'react';
import {PopTable, CustomSelect} from './styles';

const clothingSizes = [
  '',
  'PP',
  'P',
  'M',
  'G',
  'GG',
  'XG',
  '2XG',
  '3XG',
  '4XG',
];

export default function PopupClothingConfig(props) {
  const {theadData, tbodyData, maxQuantityPerPiece, tbodyDataOnChange} = props;

  return (
    <PopTable>
      <thead>
        <tr>
          {theadData.map((tdItem) => (
            <td key={tdItem.key}>{tdItem.text}</td>
          ))}
        </tr>
      </thead>

      <tbody>
        {tbodyData.map((theItem) => (
          <tr key={theItem.id}>
            <td>
              <img src={theItem.icon} alt="Description" />
            </td>

            <td>
              <CustomSelect
                value={theItem.size}
                onChange={(e) => tbodyDataOnChange(theItem, e.target.value)}>
                {clothingSizes.map((item) => (
                  <option value={item} key={item}>
                    {item}
                  </option>
                ))}
              </CustomSelect>
            </td>

            <td>
              <CustomSelect
                value={theItem.quantity}
                onChange={(e) => {
                  tbodyDataOnChange(theItem, null, e.target.value);
                }}>
                {[...Array(maxQuantityPerPiece + 1).keys()].map((n) => (
                  <option key={n}>{n}</option>
                ))}
              </CustomSelect>
            </td>
          </tr>
        ))}
      </tbody>
    </PopTable>
  );
}
