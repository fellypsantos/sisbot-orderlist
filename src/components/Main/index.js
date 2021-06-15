import React, { useEffect, useState } from 'react'
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

  const { addToast } = useToasts()
  const [name, setName] = useState('')
  const [number, setNumber] = useState('')
  const [openedPopup, setOpenedPopup] = useState(false)
  const [tempOrderItemConfig, setTempOrderItemConfig] = useState({
    tshirt: { size: 'P', qty: 1 },
    tshirtLong: { size: 'M', qty: 2 },
    shorts: { size: 'G', qty: 3 },
    pants: { size: 'GG', qty: 4 },
    tanktop: { size: '2XG', qty: 5 },
    vest: { size: '3XG', qty: 6 },
  })

  const [orderListItems, setOrderListItems] = useState([
    {
      id: uuidv4(),
      name: 'Fellp Santos',
      number: '404',
      tshirt: { size: 'PP', qty: 1 },
      tshirtLong: { size: 'P', qty: 2 },
      shorts: { size: 'M', qty: 3 },
      pants: { size: 'G', qty: 4 },
      tanktop: { size: 'GG', qty: 5 },
      vest: { size: 'XG', qty: 6 },
    },
  ])

  useEffect(() => {
    // initial settup
    // will run once
  }, [])

  const validateAndOpenPopup = () => {
    // Validation
    if (name === '' || number === '') {
      alert('Please, fill Name and Number before continue.')
      return
    }

    // Open the popup
    setOpenedPopup(true)
  }

  const handlePopupClose = (e) => {
    e.preventDefault()
    setOpenedPopup(false)
  }

  const handleAddOrderItem = (e) => {
    e.preventDefault()

    // validate

    setOrderListItems([
      ...orderListItems,
      {
        id: uuidv4(),
        name: 'Bianca Santos',
        number: '500',
        tshirt: { size: 'PP', qty: 1 },
        tshirtLong: { size: 'P', qty: 2 },
        shorts: { size: 'M', qty: 3 },
        pants: { size: 'G', qty: 4 },
        tanktop: { size: 'GG', qty: 5 },
        vest: { size: 'XG', qty: 6 },
      },
    ])

    setOpenedPopup(false)

    addToast ('Hello World', {
        appearance: 'success',
        autoDismiss: true,
    })
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
                        <option value={item}>{item}</option>
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
                        <option>{item}</option>
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
                          tshirt: {
                            ...tempOrderItemConfig.tshirtLong,
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
                      value={tempOrderItemConfig.tshirtLong.qty}
                      onChange={(e) =>
                        setTempOrderItemConfig({
                          ...tempOrderItemConfig,
                          tshirt: {
                            ...tempOrderItemConfig.tshirtLong,
                            qty: e.target.value,
                          },
                        })
                      }
                    >
                      {quantitiesPerPiece.map((item) => (
                        <option>{item}</option>
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
                          tshirt: {
                            ...tempOrderItemConfig.shorts,
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
                      value={tempOrderItemConfig.shorts.qty}
                      onChange={(e) =>
                        setTempOrderItemConfig({
                          ...tempOrderItemConfig,
                          tshirt: {
                            ...tempOrderItemConfig.shorts,
                            qty: e.target.value,
                          },
                        })
                      }
                    >
                      {quantitiesPerPiece.map((item) => (
                        <option>{item}</option>
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
                          tshirt: {
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
                          tshirt: {
                            ...tempOrderItemConfig.pants,
                            qty: e.target.value,
                          },
                        })
                      }
                    >
                      {quantitiesPerPiece.map((item) => (
                        <option>{item}</option>
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
                          tshirt: {
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
                          tshirt: {
                            ...tempOrderItemConfig.tanktop,
                            qty: e.target.value,
                          },
                        })
                      }
                    >
                      {quantitiesPerPiece.map((item) => (
                        <option>{item}</option>
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
                          tshirt: {
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
                          tshirt: {
                            ...tempOrderItemConfig.vest,
                            qty: e.target.value,
                          },
                        })
                      }
                    >
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
          {orderListItems.map((item) => (
            <tr>
              <td width={180}>{item.name}</td>
              <td>{item.number}</td>
              <td>
                {item.tshirt.qty}-{item.tshirt.size}
              </td>
              <td>
                {item.tshirtLong.qty}-{item.tshirtLong.size}
              </td>
              <td>
                {item.shorts.qty}-{item.shorts.size}
              </td>
              <td>
                {item.pants.qty}-{item.pants.size}
              </td>
              <td>
                {item.tanktop.qty}-{item.tanktop.size}
              </td>
              <td>
                {item.vest.qty}-{item.vest.size}
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