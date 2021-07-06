import React, { createRef, useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useToasts } from 'react-toast-notifications'
import { v4 as uuidv4 } from 'uuid'

import 'flag-icon-css/css/flag-icon.min.css'

import {
  faUpload,
  faDownload,
  faPlus,
  faTrash,
  faPen,
  faSave,
  faLanguage,
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
  NameNumberEditingMode,
  LanguageContiner,
  LanguageList,
  ButtonShowLanguages,
} from './styles'

import tshirt from '../../images/icons/tshirt.png'
import tshirtLong from '../../images/icons/tshirt-long.png'
import shorts from '../../images/icons/shorts.png'
import pants from '../../images/icons/pants.png'
import tanktop from '../../images/icons/tanktop.png'
import vest from '../../images/icons/vest.png'

import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';
import i18next from 'i18next'


i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(HttpApi)
  .init({
    fallbackLng: "en",
    detection: {
      order: ['cookie', 'localStorage', 'htmlTag', 'path'],
      caches: ['cookie']
    },
    backend: {
      loadPath: '/assets/locales/{{lng}}/translation.json',
    },
    react: { useSuspense: false }
  });


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
  }

  const { addToast } = useToasts()
  const [name, setName] = useState('')
  const [number, setNumber] = useState('')
  const [openedPopup, setOpenedPopup] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [languageListVisible, setLanguageListVisible] = useState(false);
  const [itemIdToUpdate, setItemIdToUpdate] = useState(null)
  const [tempOrderItemConfig, setTempOrderItemConfig] = useState({
    ...orderItemEmptyTemplate,
  })

  const [orderListItems, setOrderListItems] = useState([])
  const {t} = useTranslation();

  useEffect(() => {
    // initial settup
    // will run once    
  }, [])

  const validateAndOpenPopup = () => setOpenedPopup(true)

  const handlePopupClose = (e) => {
    e.preventDefault()
    setOpenedPopup(false)
    setEditMode(false)
    setItemIdToUpdate(null);
    setName('');
    setNumber('');
    setTempOrderItemConfig(orderItemEmptyTemplate);
  }

  const isPopupItemsEmpty = () => {
    let totalPiecesInOrder = 0
    const {tshirt, tshirtLong, tanktop, shorts, pants} = tempOrderItemConfig;
    const clothesOnly = {
      tshirt,
      tshirtLong,
      tanktop,
      shorts,
      pants
    };

    Object.entries(clothesOnly).map((item) => {
      // sum all pieces to check if is empty order
      const { qty } = item[1]
      totalPiecesInOrder += parseInt(qty)
    })

    return totalPiecesInOrder == 0
  }

  const handleUpdateItem = (e) => {
    e.preventDefault()

    // validate
    const isEmptyList = isPopupItemsEmpty()

    if (isEmptyList) {
      // show toast
      addToast(t('TOAST_EMPTY_LIST_ON_UPDATE'), {
        appearance: 'warning',
        autoDismiss: true,
      })

      return
    }

    // continue process to update
    const updatedItemInformations = {
      ...tempOrderItemConfig,
      name,
      number,
    }

    const newUpdatedList = orderListItems.map((item) => {
      if (item.id === itemIdToUpdate) {
        // item found
        return {
          id: item.id,
          ...updatedItemInformations,
        }
      }

      return item;
    })

    setEditMode(false)
    setName('')
    setNumber('')
    setItemIdToUpdate(null)
    setOrderListItems(newUpdatedList)
    setOpenedPopup(false)

    addToast(t('TOAST_ITEM_UPDATED'), {
      appearance: 'success',
      autoDismiss: true,
    })
  }

  const handleAddOrderItem = (e) => {
    e.preventDefault()

    // validate
    const isEmptyList = isPopupItemsEmpty()

    if (isEmptyList) {
      // show toast
      addToast(t('TOAST_EMPTY_LIST_ON_ADD'), {
        appearance: 'warning',
        autoDismiss: true,
      })

      return
    }

    console.log('List has items! Saving...')

    setOrderListItems([
      ...orderListItems,
      {
        id: uuidv4(),
        name,
        number,
        ...tempOrderItemConfig,
      },
    ])

    // Clear the inputs
    setName('')
    setNumber('')
    setTempOrderItemConfig({ ...orderItemEmptyTemplate })

    // close popup
    setOpenedPopup(false)

    // show toast
    addToast(t('TOAST_ITEM_ADDED'), {
      appearance: 'success',
      autoDismiss: true,
    })
  }

  const editOrderListItem = (itemID) => {
    console.log('Edit the idem: ', itemID)
    const theItemToEdit = orderListItems.find((item) => item.id === itemID)

    setName(theItemToEdit.name)
    setNumber(theItemToEdit.number)
    setItemIdToUpdate(itemID)
    setEditMode(true)
    setTempOrderItemConfig(theItemToEdit) // this data is read by popup
    setOpenedPopup(true)
  }

  const deleteOrderListItem = (itemID) => {
    const confirmDelete = window.confirm(t('CONFIRM_REMOVE_ITEM_FROM_LIST'));
    if (!confirmDelete) return;

    const updatedList = orderListItems.filter(item => item.id !== itemID);
    setOrderListItems(updatedList);
    console.log('Item removed: ', itemID);
  }

  const updateLanguage = countryCode => {
    i18next.changeLanguage(countryCode);
    setLanguageListVisible(false);
  }

  const languages = [
    {
      title: 'Português',
      country_code: 'br'
    },
    {
      title: 'English',
      country_code: 'us'
    },
    {
      title: 'Spañol',
      country_code: 'es'
    },
  ];

  return (
    <>
      {/* POPUP SECTION */}
      <PopupOverlay visible={openedPopup}>
        <PopupContainer>
          <PopupForm>
            <h3>{t('CONFIGURE_ORDER')}</h3>

            {/* Name and Number when editing */}
            {editMode && (
              <NameNumberEditingMode>
              <TextInputContainer>
                <TextInputLabel htmlFor="name">{t('NAME')}</TextInputLabel>
                <TextInput
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </TextInputContainer>

              <TextInputContainer small>
                <TextInputLabel htmlFor="number">{t('NUMBER')}</TextInputLabel>
                <TextInput
                  centered
                  id="number"
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                />
              </TextInputContainer>
            </NameNumberEditingMode>
            )}

            <OrderItemTable>
              <thead>
                <tr>
                  <td width="60">{t('CLOTHE')}</td>
                  <td width="90">{t('SIZE')}</td>
                  <td>{t('QUANTITY')}</td>
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
                        <option value={item} key={item}>
                          {item}
                        </option>
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
                        <option value={item} key={item}>
                          {item}
                        </option>
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
                        <option value={item} key={item}>
                          {item}
                        </option>
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
                        <option key={item} value={item}>
                          {item}
                        </option>
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
                        <option value={item} key={item}>
                          {item}
                        </option>
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
                        <option key={item} value={item}>
                          {item}
                        </option>
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
                        <option value={item} key={item}>
                          {item}
                        </option>
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
                        <option key={item} value={item}>
                          {item}
                        </option>
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
                        <option value={item} key={item}>
                          {item}
                        </option>
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
                        <option key={item} value={item}>
                          {item}
                        </option>
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
                <ActionButtonText marginRight>{t('CANCEL')}</ActionButtonText>
              </ActionButton>

              <ActionDivider />

              <ActionButton
                href=""
                onClick={editMode ? handleUpdateItem : handleAddOrderItem}
              >
                <ActionButtonText marginLeft>{t('CONFIRM')}</ActionButtonText>
                <FontAwesomeIcon icon={faSave} />
              </ActionButton>
            </PopupButtonsContainer>
          </PopupForm>
        </PopupContainer>
      </PopupOverlay>

      {/* MAIN SECTION */}
      <MainContainer>
        <LanguageContiner>
          <ButtonShowLanguages onClick={() => setLanguageListVisible(!languageListVisible)}>
            <FontAwesomeIcon icon={faLanguage} />
          </ButtonShowLanguages>
          {languageListVisible && (
            <LanguageList>            
              { languages.map(lang => (
                <li key={lang.country_code}>
                  <a href="#!" onClick={() => updateLanguage(lang.country_code)}>
                    <span className={`flag-icon flag-icon-${lang.country_code}`}></span>
                    {lang.title}
                  </a>
                </li>
              )) }
            </LanguageList>
          )}
        </LanguageContiner>

        <FormContainer>          
          <TextInputContainer>
            <TextInputLabel htmlFor="name">{t('NAME')}</TextInputLabel>
            <TextInput
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </TextInputContainer>

          <TextInputContainer small>
            <TextInputLabel htmlFor="number">{t('NUMBER')}</TextInputLabel>
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
            <ButtonAddOrderText>{t('ORDER')}</ButtonAddOrderText>
          </ButtonAddOrder>
        </FormContainer>

        <ImportExportContainer>
          {/* Import Button */}
          <ActionButton href="javascript:void(0)">
            <FontAwesomeIcon icon={faUpload} />
            <ActionButtonText marginRight>{t('IMPORT')}</ActionButtonText>
          </ActionButton>

          <ActionDivider />

          {/* Download Button */}
          <ActionButton href="javascript:void(0)">
            <ActionButtonText marginLeft>{t('DOWNLOAD')}</ActionButtonText>
            <FontAwesomeIcon icon={faDownload} />
          </ActionButton>
        </ImportExportContainer>
      </MainContainer>

      {/* Order list table */}
      <TableOrderList>
        <TableHeadOrderList>
          <tr>
            <td>{t('NAME')}</td>
            <td>{t('NUMBER')}</td>
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
            <td>{t('EDIT')}</td>
            <td>{t('DELETE')}</td>
          </tr>
        </TableHeadOrderList>
        <TableBodyOrderList>
          {/* Empty list message */}
          {orderListItems.length === 0 && (
            <tr>
              <td colSpan={11} align="center">
              {t('NO_ORDERS')}
              </td>
            </tr>
          )}

          {orderListItems.map((item) => (
            <tr key={item.id}>
              <td width={180}>{item.name}</td>
              <td>{item.number}</td>
              <td>
                {item.tshirt.qty > 0 && item.tshirt.size !== ''
                  ? item.tshirt.qty + '-' + item.tshirt.size
                  : '-'}
              </td>
              <td>
                {item.tshirtLong.qty > 0 && item.tshirtLong.size !== ''
                  ? item.tshirtLong.qty + '-' + item.tshirtLong.size
                  : '-'}
              </td>
              <td>
                {item.shorts.qty > 0 && item.shorts.size !== ''
                  ? item.shorts.qty + '-' + item.shorts.size
                  : '-'}
              </td>
              <td>
                {item.pants.qty > 0 && item.pants.size !== ''
                  ? item.pants.qty + '-' + item.pants.size
                  : '-'}
              </td>
              <td>
                {item.tanktop.qty > 0 && item.tanktop.size !== ''
                  ? item.tanktop.qty + '-' + item.tanktop.size
                  : '-'}
              </td>
              <td>
                {item.vest.qty > 0 && item.vest.size !== ''
                  ? item.vest.qty + '-' + item.vest.size
                  : '-'}
              </td>
              <td>
                <a href="#!" onClick={() => editOrderListItem(item.id)}>
                  {<FontAwesomeIcon icon={faPen} />}
                </a>
              </td>
              <td>
                <a href="#!" onClick={() => deleteOrderListItem(item.id)}>
                  {<FontAwesomeIcon icon={faTrash} />}
                </a>
              </td>
            </tr>
          ))}
        </TableBodyOrderList>
      </TableOrderList>
    </>
  )
}

export default Main
