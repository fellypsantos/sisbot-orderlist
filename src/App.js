import React, {useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faUpload,
  faDownload,
  faPlus,
  faArchive,
  faTrash,
  faSave,
} from '@fortawesome/free-solid-svg-icons'

import {
  MainContainer,
  FormContainer,
  TextInputContainer,
  TextInputLabel,
  TextInput,
  ImportExportContainer,
  ActionButton,
  ActionButtonText,
  ActionDivider,
  ButtonAddOrder,
  ButtonAddOrderText,
  TableOrderList,
  TableHeadOrderList,
  TableBodyOrderList,
  PopupOverlay,
  PopupContainer,
  PopupForm,
  CustomSelect,
  OrderItemTable,
  PopupButtonsContainer,
} from './styles'

import tshirt from './images/icons/tshirt.png'
import tshirtLong from './images/icons/tshirt-long.png'
import shorts from './images/icons/shorts.png'
import pants from './images/icons/pants.png'
import tanktop from './images/icons/tanktop.png'
import vest from './images/icons/vest.png'

function App() {

  const quantitiesPerPiece = Array.from(Array(11).keys())
  const clotheSizes = ['', 'PP', 'P', 'M', 'G', 'GG', 'XG', '2XG', '3XG', '4XG']

  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const validateAndOpenPopup = () => {

    // Validation
    if(name == '' || number == '') {
      alert('Please, fill Name and Number before continue.');
      return;
    }

    
  }

  return (
    <>
      {/* POPUP SECTION */}
      <PopupOverlay>
        <PopupContainer>
          <PopupForm>
            <h3>Configure order</h3>

            <OrderItemTable>
              <thead>
                <tr>
                  <td width="60">Clothe</td>
                  <td width="90">Size</td>
                  <td>Quantity</td>
                </tr>
              </thead>

              <tbody>
                {/* Clothe */}
                <tr>
                  <td>
                    <img src={tshirt} />
                  </td>
                  <td>
                    <CustomSelect>
                      {clotheSizes.map((item) => (
                        <option value="">{item}</option>
                      ))}
                    </CustomSelect>
                  </td>
                  <td>
                    <CustomSelect>
                      {quantitiesPerPiece.map((item) => (
                        <option>{item}</option>
                      ))}
                    </CustomSelect>
                  </td>
                </tr>

                {/* Clothe */}
                <tr>
                  <td>
                    <img src={tshirtLong} />
                  </td>
                  <td>
                    <CustomSelect>
                      {clotheSizes.map((item) => (
                        <option value="">{item}</option>
                      ))}
                    </CustomSelect>
                  </td>
                  <td>
                    <CustomSelect>
                      {quantitiesPerPiece.map((item) => (
                        <option>{item}</option>
                      ))}
                    </CustomSelect>
                  </td>
                </tr>

                {/* Clothe */}
                <tr>
                  <td>
                    <img src={shorts} />
                  </td>
                  <td>
                    <CustomSelect>
                      {clotheSizes.map((item) => (
                        <option value="">{item}</option>
                      ))}
                    </CustomSelect>
                  </td>
                  <td>
                    <CustomSelect>
                      {quantitiesPerPiece.map((item) => (
                        <option>{item}</option>
                      ))}
                    </CustomSelect>
                  </td>
                </tr>

                {/* Clothe */}
                <tr>
                  <td>
                    <img src={pants} />
                  </td>
                  <td>
                    <CustomSelect>
                      {clotheSizes.map((item) => (
                        <option value="">{item}</option>
                      ))}
                    </CustomSelect>
                  </td>
                  <td>
                    <CustomSelect>
                      {quantitiesPerPiece.map((item) => (
                        <option>{item}</option>
                      ))}
                    </CustomSelect>
                  </td>
                </tr>

                {/* Clothe */}
                <tr>
                  <td>
                    <img src={tanktop} />
                  </td>
                  <td>
                    <CustomSelect>
                      {clotheSizes.map((item) => (
                        <option value="">{item}</option>
                      ))}
                    </CustomSelect>
                  </td>
                  <td>
                    <CustomSelect>
                      {quantitiesPerPiece.map((item) => (
                        <option>{item}</option>
                      ))}
                    </CustomSelect>
                  </td>
                </tr>

                {/* Clothe */}
                <tr>
                  <td>
                    <img src={vest} />
                  </td>
                  <td>
                    <CustomSelect>
                      {clotheSizes.map((item) => (
                        <option value="">{item}</option>
                      ))}
                    </CustomSelect>
                  </td>
                  <td>
                    <CustomSelect>
                      {quantitiesPerPiece.map((item) => (
                        <option>{item}</option>
                      ))}
                    </CustomSelect>
                  </td>
                </tr>
              </tbody>
            </OrderItemTable>

            {/* Buttons Section */}
            <PopupButtonsContainer>
              <ActionButton href="javascript:void(0)">
                <FontAwesomeIcon icon={faTrash} />
                <ActionButtonText marginRight>Cancel</ActionButtonText>
              </ActionButton>

              <ActionDivider />

              <ActionButton href="javascript:void(0)">
                <ActionButtonText marginLeft>Confirm</ActionButtonText>
                <FontAwesomeIcon icon={faSave} />
              </ActionButton>
            </PopupButtonsContainer>
          </PopupForm>
        </PopupContainer>
      </PopupOverlay>

      {/* MAIN SECTION */}
      <MainContainer>
        <FormContainer>
          <TextInputContainer>
            <TextInputLabel htmlFor="name">Name</TextInputLabel>
            <TextInput id="name" value={name} onChange={e => setName(e.target.value)}/>
          </TextInputContainer>

          <TextInputContainer small>
            <TextInputLabel htmlFor="number">Number</TextInputLabel>
            <TextInput centered id="number" value={number} onChange={e => setNumber(e.target.value)}  />
          </TextInputContainer>

          <ButtonAddOrder href="javascript:void(0)" onClick={validateAndOpenPopup}>
            <FontAwesomeIcon icon={faPlus} />
            <ButtonAddOrderText>Order</ButtonAddOrderText>
          </ButtonAddOrder>
        </FormContainer>

        <ImportExportContainer>
          {/* Import Button */}
          <ActionButton href="javascript:void(0)">
            <FontAwesomeIcon icon={faUpload} />
            <ActionButtonText marginRight>Import</ActionButtonText>
          </ActionButton>

          <ActionDivider />

          {/* Download Button */}
          <ActionButton href="javascript:void(0)">
            <ActionButtonText marginLeft>Download</ActionButtonText>
            <FontAwesomeIcon icon={faDownload} />
          </ActionButton>
        </ImportExportContainer>
      </MainContainer>

      {/* Order list table */}
      <TableOrderList>
        <TableHeadOrderList>
          <tr>
            <td>Name</td>
            <td>Number</td>
            <td>{<FontAwesomeIcon icon={faArchive} />}</td>
            <td>{<FontAwesomeIcon icon={faArchive} />}</td>
            <td>{<FontAwesomeIcon icon={faArchive} />}</td>
            <td>{<FontAwesomeIcon icon={faArchive} />}</td>
            <td>{<FontAwesomeIcon icon={faArchive} />}</td>
            <td>{<FontAwesomeIcon icon={faArchive} />}</td>
            <td>Delete</td>
          </tr>
        </TableHeadOrderList>
        <TableBodyOrderList>
          <tr>
            <td width={230}>Fellyp Santos</td>
            <td>404</td>
            <td>1-M</td>
            <td>1-M</td>
            <td>1-M</td>
            <td>1-M</td>
            <td>1-M</td>
            <td>1-M</td>
            <td>
              <a href="#!">{<FontAwesomeIcon icon={faTrash} />}</a>
            </td>
          </tr>
        </TableBodyOrderList>
      </TableOrderList>
    </>
  )
}

export default App
