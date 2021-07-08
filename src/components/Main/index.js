import React, {useState} from 'react';
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
  LanguageContiner,
  LanguageList,
  ButtonShowLanguages,
} from './styles';

// Clothing Icons
import ClothingIcons from '../../clothinIcons';

// Custom Components
import CustomButton from '../CustomButton';
import CustomInput from '../CustomInput';
import PopupClothingConfig from '../PopupClothingConfig';

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
  const [languageListVisible, setLanguageListVisible] = useState(false);
  const [itemIdToUpdate, setItemIdToUpdate] = useState(null);
  const [orderListItems, setOrderListItems] = useState([]);
  const [getPopupGlobalItemsConfig, setPopupGlobalItemsConfig] = useState(
    popupGlobalItemsConfig,
  );

  const {t} = useTranslation();

  const validateAndOpenPopup = () => setOpenedPopup(true);

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
    setLanguageListVisible(false);
  };

  const languages = [
    {
      title: 'Português',
      country_code: 'br',
    },
    {
      title: 'English',
      country_code: 'us',
    },
    {
      title: 'Spañol',
      country_code: 'es',
    },
  ];

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

  const popupData = {
    thead: [
      {key: '1', text: t('CLOTHE'), fixedWidth: '60'},
      {key: '2', text: t('SIZE'), fixedWidth: '90'},
      {key: '3', text: t('QUANTITY')},
    ],
  };

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
        <LanguageContiner>
          <ButtonShowLanguages
            onClick={() => setLanguageListVisible(!languageListVisible)}>
            <FontAwesomeIcon icon={faLanguage} />
          </ButtonShowLanguages>
          {languageListVisible && (
            <LanguageList>
              {languages.map((lang) => (
                <li key={lang.country_code}>
                  <a
                    href="#!"
                    onClick={() => updateLanguage(lang.country_code)}>
                    <span
                      className={`flag-icon flag-icon-${lang.country_code}`}
                    />
                    {lang.title}
                  </a>
                </li>
              ))}
            </LanguageList>
          )}
        </LanguageContiner>

        <FormContainer>
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
        </FormContainer>

        <ImportExportContainer>
          {/* Import Button */}
          <ActionButton href="">
            <FontAwesomeIcon icon={faUpload} />
            <ActionButtonText marginRight>{t('IMPORT')}</ActionButtonText>
          </ActionButton>

          <ActionDivider />

          {/* Download Button */}
          <ActionButton href="">
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
              <img src={ClothingIcons.tshirt} alt="Clothe Icon" />
            </td>
            <td>
              <img src={ClothingIcons.tshirtLong} alt="Clothe Icon" />
            </td>
            <td>
              <img src={ClothingIcons.shorts} alt="Clothe Icon" />
            </td>
            <td>
              <img src={ClothingIcons.pants} alt="Clothe Icon" />
            </td>
            <td>
              <img src={ClothingIcons.tanktop} alt="Clothe Icon" />
            </td>
            <td>
              <img src={ClothingIcons.vest} alt="Clothe Icon" />
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

              {item.clothingConfig.map((clotheItem) => (
                <td key={clotheItem.key}>
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
