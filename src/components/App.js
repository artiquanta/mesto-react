import { useState } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import { formAvatar, formProfile, formAddCard } from '../utils/utils';

function App() {
  const [isEditProfilePopupOpen, openPopupProfile] = useState(false);
  const [isAddPlacePopupOpen, openPopupAddCards] = useState(false);
  const [isEditAvatarPopupOpen, openPopupAvatar] = useState(false);
  const [formContent, setFormContent] = useState('');
  const [popupFormName, setPopupFormName] = useState('');
  const [selectedCard, selectCard] = useState({});

  // Открытие модального окна изменения аватара
  function handleEditAvatarClick() {
    openPopupAvatar(true);
    setPopupFormName('avatar');
    setFormContent(formAvatar);
  }

  // Открытие модального окна редактирования профиля
  function handleEditProfileClick() {
    openPopupProfile(true);
    setPopupFormName('profile');
    setFormContent(formProfile);
  }

  // Открытие модального окна добавления карточки
  function handleAddPlaceClick() {
    openPopupAddCards(true);
    setPopupFormName('cards');
    setFormContent(formAddCard);
  }

  // Закрытие модального окна
  function closeAllPopups() {
    openPopupAddCards(false);
    openPopupAvatar(false);
    openPopupProfile(false);
    setFormContent('');
    selectCard({});
    setPopupFormName('');
  }

  // Открытие модального окна с просмотром изображения карточки
  function handleCardClick(card) {
    selectCard(card);
  }

  return (
    <div className="page">
      <Header />
      <Main onEditAvatar={handleEditAvatarClick}
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onCardClick={handleCardClick} />
      <Footer />
      <PopupWithForm
        isOpen={isEditProfilePopupOpen | isAddPlacePopupOpen | isEditAvatarPopupOpen}
        name={popupFormName}
        onClose={closeAllPopups}>{formContent}</PopupWithForm>
      <ImagePopup
        card={selectedCard}
        onClose={closeAllPopups} />
    </div>
  );
}

export default App;