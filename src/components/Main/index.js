import React, {useState, useEffect} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {useToasts} from 'react-toast-notifications';
import {v4 as uuidv4} from 'uuid';
import 'flag-icon-css/css/flag-icon.min.css';

import {
  faUpload,
  faDownload,
  faPlus,
  faTrash,
  faPen,
  faSave,
  faLanguage,
} from '@fortawesome/free-solid-svg-icons';

// Multilanguage implementation
import i18n from 'i18next';
import {useTranslation, initReactI18next} from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';

import {
  MainContainer,
  FormContainer,
  ImportExportContainer,
  ActionButton,
  ActionButtonText,
  ActionDivider,
  TableOrderList,
  TableHeadOrderList,
  TableBodyOrderList,
  PopupOverlay,
  PopupContainer,
  PopupForm,
  PopupButtonsContainer,
  NameNumberEditingMode,
  LanguageBox,
  FormBox,
} from './styles';

// Clothing Icons
import ClothingIcons from '../../clothinIcons';
import Utils from '../../Utils';

// Custom Components
import CustomButton from '../CustomButton';
import CustomInput from '../CustomInput';
import PopupClothingConfig from '../PopupClothingConfig';
import ButtonChangeLanguage from '../ButtonChangeLanguage';

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(HttpApi)
  .init({
    fallbackLng: 'en',
    detection: {
      order: ['cookie', 'localStorage', 'htmlTag', 'path'],
      caches: ['cookie'],
    },
    backend: {
      loadPath: '/assets/locales/{{lng}}/translation.json',
    },
    react: {useSuspense: false},
  });

function Main() {
  const popupGlobalItemsConfigEmptySample = [
    {
      id: '1',
      name: 'tshirt',
      size: '',
      quantity: 0,
      icon: ClothingIcons.tshirt,
    },
    {
      id: '2',
      name: 'tshirtLong',
      size: '',
      quantity: 0,
      icon: ClothingIcons.tshirtLong,
    },
    {
      id: '3',
      name: 'shorts',
      size: '',
      quantity: 0,
      icon: ClothingIcons.shorts,
    },
    {
      id: '4',
      name: 'pants',
      size: '',
      quantity: 0,
      icon: ClothingIcons.pants,
    },
    {
      id: '5',
      name: 'tanktop',
      size: '',
      quantity: 0,
      icon: ClothingIcons.tanktop,
    },
    {
      id: '6',
      name: 'vest',
      size: '',
      quantity: 0,
      icon: ClothingIcons.vest,
    },
  ];

  const popupGlobalItemsConfig = popupGlobalItemsConfigEmptySample;

  const {addToast} = useToasts();
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [openedPopup, setOpenedPopup] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [itemIdToUpdate, setItemIdToUpdate] = useState(null);
  const [orderListItems, setOrderListItems] = useState([]);
  const [getPopupGlobalItemsConfig, setPopupGlobalItemsConfig] = useState(
    popupGlobalItemsConfig,
  );

  const {t} = useTranslation();

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        console.log('Popup closed by ESC key.');
        setOpenedPopup(false);
      }
    };

    window.addEventListener('keydown', handleEsc);

    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  const handlePopupClose = (e) => {
    e.preventDefault();
    setOpenedPopup(false);
    setEditMode(false);
    setItemIdToUpdate(null);
    setName('');
    setNumber('');
    setPopupGlobalItemsConfig(popupGlobalItemsConfigEmptySample);
  };

  // CHEFK IF IS EMPTY
  const isPopupItemsEmpty = () => {
    let totalPiecesInOrder = 0;

    getPopupGlobalItemsConfig.map((item) => {
      totalPiecesInOrder += parseInt(item.quantity);
      return item;
    });

    return totalPiecesInOrder === 0;
  };

  const handleUpdateItem = (e) => {
    e.preventDefault();

    // validate
    const isEmptyList = isPopupItemsEmpty();

    if (isEmptyList) {
      // show toast
      addToast(t('TOAST_EMPTY_LIST_ON_UPDATE'), {
        appearance: 'warning',
        autoDismiss: true,
      });

      return;
    }

    const newUpdatedList = orderListItems.map((item) => {
      if (item.id === itemIdToUpdate) {
        // item found
        return {
          id: item.id,
          name,
          number,
          clothingConfig: [...getPopupGlobalItemsConfig],
        };
      }

      return item;
    });

    setEditMode(false);
    setName('');
    setNumber('');
    setItemIdToUpdate(null);
    setOrderListItems(newUpdatedList);
    setOpenedPopup(false);

    addToast(t('TOAST_ITEM_UPDATED'), {
      appearance: 'success',
      autoDismiss: true,
    });
  };

  const clearForm = () => {
    setName('');
    setNumber('');
    setPopupGlobalItemsConfig(popupGlobalItemsConfigEmptySample);
  };

  const handleAddOrderItem = (e) => {
    e.preventDefault();

    // validate
    const isEmptyList = isPopupItemsEmpty();

    if (isEmptyList) {
      // show toast
      addToast(t('TOAST_EMPTY_LIST_ON_ADD'), {
        appearance: 'warning',
        autoDismiss: true,
      });

      return;
    }

    console.log('List has items! Saving...');

    setOrderListItems([
      ...orderListItems,
      {
        id: uuidv4(),
        name,
        number,
        clothingConfig: getPopupGlobalItemsConfig,
      },
    ]);

    clearForm(); // Clear the inputs
    setOpenedPopup(false);

    addToast(t('TOAST_ITEM_ADDED'), {
      appearance: 'success',
      autoDismiss: true,
    });
  };

  const editOrderListItem = (itemID) => {
    const theItemToEdit = orderListItems.find((item) => item.id === itemID);

    setEditMode(true);
    setName(theItemToEdit.name);
    setNumber(theItemToEdit.number);
    setItemIdToUpdate(itemID);
    setPopupGlobalItemsConfig(theItemToEdit.clothingConfig); // this data is read by popup
    setOpenedPopup(true);
  };

  const deleteOrderListItem = (itemID) => {
    const confirmDelete = window.confirm(t('CONFIRM_REMOVE_ITEM_FROM_LIST'));
    if (!confirmDelete) return;

    const updatedList = orderListItems.filter((item) => item.id !== itemID);
    setOrderListItems(updatedList);
    console.log('Item removed: ', itemID);
  };

  const updateLanguage = (countryCode) => {
    i18n.changeLanguage(countryCode);
  };

  // UPDATE INFORMATIONS IN POPUP WINDOW
  const handleChangePopupInformations = (
    itemParam,
    selectedSize = null,
    selectedQuantity = null,
  ) => {
    const updatedGlobalItemsConfig = getPopupGlobalItemsConfig.map((item) => {
      if (item.id === itemParam.id) {
        return {
          ...item,
          size: selectedSize !== null ? selectedSize : item.size,
          quantity:
            selectedQuantity !== null ? selectedQuantity : item.quantity,
        };
      }

      return item;
    });

    // update the state
    setPopupGlobalItemsConfig(updatedGlobalItemsConfig);
  };

  // HANDLE CLOSE POPUP
  const closePopupOnClickOverlay = (id) => {
    if (id === 'popup-overlay') setOpenedPopup(false);
  };

  // DOWNLOAD ORDER LIST FILE AS CSV
  const handleDownloadCSVFile = () => {
    console.log('prepare and download');
    // let csvContent = '';
    // Utils.DownloadTextFile('file.csv', 'the csv content here');
    // if (orderListItems.length === 0) return;

    // orderListItems.map((orderItem) => {
    //   console.log(orderItem);
    //   csvContent += `${}`;
    //   return orderItem;
    // });
  };

  const popupData = {
    thead: [
      {key: 1, text: t('CLOTHE'), fixedWidth: '60'},
      {key: 2, text: t('SIZE'), fixedWidth: '90'},
      {key: 3, text: t('QUANTITY')},
    ],
  };

  const clothingIconsForOrderListTable = [
    {id: 1, icon: ClothingIcons.tshirt},
    {id: 2, icon: ClothingIcons.tshirtLong},
    {id: 3, icon: ClothingIcons.shorts},
    {id: 4, icon: ClothingIcons.pants},
    {id: 5, icon: ClothingIcons.tanktop},
    {id: 6, icon: ClothingIcons.vest},
  ];

  return (
    <>
      {/* POPUP SECTION */}
      <PopupOverlay
        id="popup-overlay"
        visible={openedPopup}
        onKeyPress={(e) => closePopupOnPressESC(e.key)}
        onClick={(e) => closePopupOnClickOverlay(e.target.id)}>
        <PopupContainer>
          <PopupForm>
            <h3>{t('CONFIGURE_ORDER')}</h3>

            {/* Name and Number when editing */}
            {editMode && (
              <NameNumberEditingMode>
                <CustomInput
                  id="name"
                  value={name}
                  label={t('NAME')}
                  handleChange={(e) => setName(e.target.value)}
                />

                <CustomInput
                  small
                  centered
                  id="number"
                  value={number}
                  label={t('NUMBER')}
                  handleChange={(e) => setNumber(e.target.value)}
                />
              </NameNumberEditingMode>
            )}

            <PopupClothingConfig
              theadData={popupData.thead}
              tbodyData={getPopupGlobalItemsConfig}
              tbodyDataOnChange={handleChangePopupInformations}
              maxQuantityPerPiece={50}
            />

            {/* Buttons Section */}
            <PopupButtonsContainer>
              <ActionButton href="" onClick={handlePopupClose}>
                <FontAwesomeIcon icon={faTrash} />
                <ActionButtonText marginRight>{t('CANCEL')}</ActionButtonText>
              </ActionButton>

              <ActionDivider />

              <ActionButton
                href=""
                onClick={editMode ? handleUpdateItem : handleAddOrderItem}>
                <ActionButtonText marginLeft>{t('CONFIRM')}</ActionButtonText>
                <FontAwesomeIcon icon={faSave} />
              </ActionButton>
            </PopupButtonsContainer>
          </PopupForm>
        </PopupContainer>
      </PopupOverlay>

      {/* MAIN SECTION */}
      <MainContainer>
        <FormContainer>
          <LanguageBox>
            <ButtonChangeLanguage
              icon={faLanguage}
              handleChange={updateLanguage}
            />
          </LanguageBox>

          <FormBox>
            <CustomInput
              id="name"
              value={name}
              label={t('NAME')}
              handleChange={(e) => setName(e.target.value)}
            />

            <CustomInput
              small
              centered
              id="number"
              value={number}
              label={t('NUMBER')}
              handleChange={(e) => setNumber(e.target.value)}
            />

            <CustomButton
              text={t('ORDER')}
              icon={faPlus}
              handleClick={(e) => {
                setOpenedPopup(true);
                e.preventDefault();
              }}
            />
          </FormBox>
        </FormContainer>

        <ImportExportContainer>
          {/* Import Button */}
          <ActionButton href="#!">
            <FontAwesomeIcon icon={faUpload} />
            <ActionButtonText marginRight>{t('IMPORT')}</ActionButtonText>
          </ActionButton>

          <ActionDivider />

          {/* Download Button */}
          <ActionButton href="#!" onClick={handleDownloadCSVFile}>
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

            {clothingIconsForOrderListTable.map((iconItem) => (
              <td key={iconItem.id}>
                <img src={iconItem.icon} alt="SISBot CLothing Icon" />
              </td>
            ))}

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

          {/* Generate the table rows, showing the order list */}
          {orderListItems.map((item) => (
            <tr key={item.id} data-id={item.id}>
              <td width={180}>{item.name}</td>
              <td>{item.number}</td>

              {item.clothingConfig.map((clotheItem) => (
                <td key={clotheItem.id}>
                  {clotheItem.quantity > 0 && clotheItem.size !== ''
                    ? `${clotheItem.quantity}-${clotheItem.size}`
                    : '-'}
                </td>
              ))}

              <td>
                <a href="#!" onClick={() => editOrderListItem(item.id)}>
                  <FontAwesomeIcon icon={faPen} />
                </a>
              </td>

              <td>
                <a href="#!" onClick={() => deleteOrderListItem(item.id)}>
                  <FontAwesomeIcon icon={faTrash} />
                </a>
              </td>
            </tr>
          ))}
        </TableBodyOrderList>
      </TableOrderList>
    </>
  );
}

export default Main;
