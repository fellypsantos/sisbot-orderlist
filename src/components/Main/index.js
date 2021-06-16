import React, { createRef, useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useToasts } from 'react-toast-notifications'
import { v4 as uuidv4 } from 'uuid'

import {
  faUpload,
  faDownload,
  faPlus,
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

import tshirt from '../../images/icons/tshirt.png'
import tshirtLong from '../../images/icons/tshirt-long.png'
import shorts from '../../images/icons/shorts.png'
import pants from '../../images/icons/pants.png'
import tanktop from '../../images/icons/tanktop.png'
import vest from '../../images/icons/vest.png'

function Main() {
  const quantitiesPerPiece = Array.from(Array(11).keys())
  const clotheSizes = ['', 'PP', 'P', 'M', 'G', 'GG', 'XG', '2XG', '3XG', '4XG']
  const orderItemEmptyTemplate = {
    tshirt: { size: '', qty: 0 },
    tshirtLong: { size: '', qty: 0 },
    shorts: { size: '', qty: 0 },
    pants: { size: '', qty: 0 },
    tanktop: { size: '', qty: 0 },
    vest: { size: '', qty: 0 },
  };

  const { addToast } = useToasts()
  const [name, setName] = useState('')
  const [number, setNumber] = useState('')
  const [openedPopup, setOpenedPopup] = useState(false)
  const [tempOrderItemConfig, setTempOrderItemConfig] = useState({...orderItemEmptyTemplate})

  const [orderListItems, setOrderListItems] = useState([]);

  useEffect(() => {
    // initial settup
    // will run once
  }, [])

  const validateAndOpenPopup = () => setOpenedPopup(true);

  const handlePopupClose = (e) => {
    e.preventDefault()
    setOpenedPopup(false)
  }

  const handleAddOrderItem = (e) => {
    e.preventDefault()

    // validate
    let isEmptyOrder = true;

    console.log('-> ', Object.entries(tempOrderItemConfig));

    Object.entries(tempOrderItemConfig).map(item => console.log(item));

    return;

    if (!isEmptyOrder){
      console.log('List has items! Saving...');

      setOrderListItems([
        ...orderListItems,
        {
          id: uuidv4(),
          name,
          number,
          ...tempOrderItemConfig
        },
      ])
  
      // Clear the inputs
      setName('');
      setNumber('');
      setTempOrderItemConfig({...orderItemEmptyTemplate});
  
      // close popup
      setOpenedPopup(false);
  
      // show toast
      addToast ('The order was added to your list.', {
          appearance: 'success',
          autoDismiss: true,
      })
    }

    else {
      console.log('List has no items!');
    }
  }

  return (
    <>
      {/* POPUP SECTION */}
      <PopupOverlay visible={openedPopup}>
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
                {/* Short Sleeve */}
                <tr>
                  <td>
                    <img src={tshirt} alt="Clothe Icon" />
                  </td>
                  <td>
                    <CustomSelect
                      value={tempOrderItemConfig.tshirt.size}
                      onChange={(e) =>
                        setTempOrderItemConfig({
                          ...tempOrderItemConfig,
                          tshirt: {
                            ...tempOrderItemConfig.tshirt,
                            size: e.target.value,
                          },
                        })
                      }
                    >
                      {clotheSizes.map((item) => (
                        <option value={item} key={item}>{item}</option>
                      ))}
                    </CustomSelect>
                  </td>
                  <td>
                    <CustomSelect
                      value={tempOrderItemConfig.tshirt.qty}
                      onChange={(e) =>
                        setTempOrderItemConfig({
                          ...tempOrderItemConfig,
                          tshirt: {
                            ...tempOrderItemConfig.tshirt,
                            qty: e.target.value,
                          },
                        })
                      }
                    >
                      {quantitiesPerPiece.map((item) => (
                        <option key={item}>{item}</option>
                      ))}
                    </CustomSelect>
                  </td>
                </tr>

                {/* Long Sleeve */}
                <tr>
                  <td>
                    <img src={tshirtLong} alt="Clothe Icon" />
                  </td>
                  <td>
                    <CustomSelect
                      value={tempOrderItemConfig.tshirtLong.size}
                      onChange={(e) =>
                        setTempOrderItemConfig({
                          ...tempOrderItemConfig,
                          tshirtLong: {
                            ...tempOrderItemConfig.tshirtLong,
                            size: e.target.value,
                          },
                        })
                      }
                    >
                      {clotheSizes.map((item) => (
                        <option value={item} key={item}>{item}</option>
                      ))}
                    </CustomSelect>
                  </td>
                  <td>
                    <CustomSelect
                      value={tempOrderItemConfig.tshirtLong.qty}
                      onChange={(e) =>
                        setTempOrderItemConfig({
                          ...tempOrderItemConfig,
                          tshirtLong: {
                            ...tempOrderItemConfig.tshirtLong,
                            qty: e.target.value,
                          },
                        })
                      }
                    >
                      {quantitiesPerPiece.map((item) => (
                        <option key={item}>{item}</option>
                      ))}
                    </CustomSelect>
                  </td>
                </tr>

                {/* Shorts */}
                <tr>
                  <td>
                    <img src={shorts} alt="Clothe Icon" />
                  </td>
                  <td>
                    <CustomSelect
                      value={tempOrderItemConfig.shorts.size}
                      onChange={(e) =>
                        setTempOrderItemConfig({
                          ...tempOrderItemConfig,
                          shorts: {
                            ...tempOrderItemConfig.shorts,
                            size: e.target.value,
                          },
                        })
                      }
                    >
                      {clotheSizes.map((item) => (
                        <option value={item} key={item}>{item}</option>
                      ))}
                    </CustomSelect>
                  </td>
                  <td>
                    <CustomSelect
                      value={tempOrderItemConfig.shorts.qty}
                      onChange={(e) =>
                        setTempOrderItemConfig({
                          ...tempOrderItemConfig,
                          shorts: {
                            ...tempOrderItemConfig.shorts,
                            qty: e.target.value,
                          },
                        })
                      }
                    >
                      {quantitiesPerPiece.map((item) => (
                        <option key={item} value={item}>{item}</option>
                      ))}
                    </CustomSelect>
                  </td>
                </tr>

                {/* Pants */}
                <tr>
                  <td>
                    <img src={pants} alt="Clothe Icon" />
                  </td>

                  <td>
                    <CustomSelect
                      value={tempOrderItemConfig.pants.size}
                      onChange={(e) =>
                        setTempOrderItemConfig({
                          ...tempOrderItemConfig,
                          pants: {
                            ...tempOrderItemConfig.pants,
                            size: e.target.value,
                          },
                        })
                      }
                    >
                      {clotheSizes.map((item) => (
                        <option value={item}>{item}</option>
                      ))}
                    </CustomSelect>
                  </td>
                  <td>
                    <CustomSelect
                      value={tempOrderItemConfig.pants.qty}
                      onChange={(e) =>
                        setTempOrderItemConfig({
                          ...tempOrderItemConfig,
                          pants: {
                            ...tempOrderItemConfig.pants,
                            qty: e.target.value,
                          },
                        })
                      }
                    >
                      {quantitiesPerPiece.map((item) => (
                        <option key={item}>{item}</option>
                      ))}
                    </CustomSelect>
                  </td>
                </tr>

                {/* Clothe */}
                <tr>
                  <td>
                    <img src={tanktop} alt="Clothe Icon" />
                  </td>
                  <td>
                    <CustomSelect
                      value={tempOrderItemConfig.tanktop.size}
                      onChange={(e) =>
                        setTempOrderItemConfig({
                          ...tempOrderItemConfig,
                          tanktop: {
                            ...tempOrderItemConfig.tanktop,
                            size: e.target.value,
                          },
                        })
                      }
                    >
                      {clotheSizes.map((item) => (
                        <option value={item}>{item}</option>
                      ))}
                    </CustomSelect>
                  </td>
                  <td>
                    <CustomSelect
                      value={tempOrderItemConfig.tanktop.qty}
                      onChange={(e) =>
                        setTempOrderItemConfig({
                          ...tempOrderItemConfig,
                          tanktop: {
                            ...tempOrderItemConfig.tanktop,
                            qty: e.target.value,
                          },
                        })
                      }
                    >
                      {quantitiesPerPiece.map((item) => (
                        <option key={item}>{item}</option>
                      ))}
                    </CustomSelect>
                  </td>
                </tr>

                {/* Clothe */}
                <tr>
                  <td>
                    <img src={vest} alt="Clothe Icon" />
                  </td>
                  <td>
                    <CustomSelect
                      value={tempOrderItemConfig.vest.size}
                      onChange={(e) =>
                        setTempOrderItemConfig({
                          ...tempOrderItemConfig,
                          vest: {
                            ...tempOrderItemConfig.vest,
                            size: e.target.value,
                          },
                        })
                      }
                    >
                      {clotheSizes.map((item) => (
                        <option value={item}>{item}</option>
                      ))}
                    </CustomSelect>
                  </td>
                  <td>
                    <CustomSelect
                      value={tempOrderItemConfig.vest.qty}
                      onChange={(e) =>
                        setTempOrderItemConfig({
                          ...tempOrderItemConfig,
                          vest: {
                            ...tempOrderItemConfig.vest,
                            qty: e.target.value,
                          },
                        })
                      }
                    >
                      {quantitiesPerPiece.map((item) => (
                        <option key={item}>{item}</option>
                      ))}
                    </CustomSelect>
                  </td>
                </tr>
              </tbody>
            </OrderItemTable>

            {/* Buttons Section */}
            <PopupButtonsContainer>
              <ActionButton href="" onClick={handlePopupClose}>
                <FontAwesomeIcon icon={faTrash} />
                <ActionButtonText marginRight>Cancel</ActionButtonText>
              </ActionButton>

              <ActionDivider />

              <ActionButton href="" onClick={handleAddOrderItem}>
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
            <TextInput
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </TextInputContainer>

          <TextInputContainer small>
            <TextInputLabel htmlFor="number">Number</TextInputLabel>
            <TextInput
              centered
              id="number"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
            />
          </TextInputContainer>

          <ButtonAddOrder
            href="javascript:void(0)"
            onClick={validateAndOpenPopup}
          >
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
            <td>
              <img src={tshirt} alt="Clothe Icon" />
            </td>
            <td>
              <img src={tshirtLong} alt="Clothe Icon" />
            </td>
            <td>
              <img src={shorts} alt="Clothe Icon" />
            </td>
            <td>
              <img src={pants} alt="Clothe Icon" />
            </td>
            <td>
              <img src={tanktop} alt="Clothe Icon" />
            </td>
            <td>
              <img src={vest} alt="Clothe Icon" />
            </td>
            <td>-</td>
          </tr>
        </TableHeadOrderList>
        <TableBodyOrderList>

          {/* Empty list message */}
          {orderListItems.length === 0 && (
            <tr><td colSpan={9} align="center">No orders yet.</td></tr>
          )}

          {orderListItems.map((item) => (
            <tr key={item.name}>
              <td width={180}>{item.name}</td>
              <td>{item.number}</td>
              <td>
                {(item.tshirt.qty > 0 && item.tshirt.size !== '')
                  ? item.tshirt.qty + '-' + item.tshirt.size
                  : "-"
                }
              </td>
              <td>
              {(item.tshirtLong.qty > 0 && item.tshirtLong.size !== '')
                  ? item.tshirtLong.qty + '-' + item.tshirtLong.size
                  : "-"
                }
              </td>
              <td>
              {(item.shorts.qty > 0 && item.shorts.size !== '')
                  ? item.shorts.qty + '-' + item.shorts.size
                  : "-"
                }
              </td>
              <td>
              {(item.pants.qty > 0 && item.pants.size !== '')
                  ? item.pants.qty + '-' + item.pants.size
                  : "-"
                }
              </td>
              <td>
              {(item.tanktop.qty > 0 && item.tanktop.size !== '')
                  ? item.tanktop.qty + '-' + item.tanktop.size
                  : "-"
                }
              </td>
              <td>
              {(item.vest.qty > 0 && item.vest.size !== '')
                  ? item.vest.qty + '-' + item.vest.size
                  : "-"
                }
              </td>
              <td>
                <a href="#!">{<FontAwesomeIcon icon={faTrash} />}</a>
              </td>
            </tr>
          ))}
        </TableBodyOrderList>
      </TableOrderList>
    </>
  )
}

export default Main;