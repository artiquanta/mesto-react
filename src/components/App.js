import { useState, useEffect, memo } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import api from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import PopupWithConfirmation from './PopupWithConfirmation';
import PopupError from './PopupError';
import Loader from './Loader';

function App() {
  const [isEditProfilePopupOpen, setPopupProfileOpen] = useState(false);
  const [isAddPlacePopupOpen, setPopupAddCardsOpen] = useState(false);
  const [isEditAvatarPopupOpen, setPopupAvatarOpen] = useState(false);
  const [isPopupWithConfirmationOpen, setPopupConfirmationOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [cardDeleteId, setCardDeleteId] = useState('');
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isProcessing, setProcessStatus] = useState(false);
  const [isLoading, setLoadingStatus] = useState(true);
  const [errorData, setErrorData] = useState({});

  // Загрузка первоначальных данных с сервера
  useEffect(() => {
    Promise.all([
      api.getCurrentUser(),
      api.getInitialCards()
    ])
      .then(([userData, cardsData]) => {
        setCurrentUser(userData);
        setCards(existingCards => [...existingCards, ...cardsData]);
        setLoadingStatus(false);
      })
      .catch(err => {
        showError(err);
        setLoadingStatus(false);
      });
  }, []);

  // Обработчик кнопки лайка
  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id) ? true : false;

    (isLiked ? api.removeLike(card._id) : api.addLike(card._id))
      .then(newCard => {
        setCards((state) => state.map(currentCard => currentCard._id === card._id ? newCard : currentCard));
      })
      .catch(err => showError(err));
  }

  // Обработчик нажатия кнопки удаления карточки
  function handleCardDeleteClick(cardId) {
    setCardDeleteId(cardId);
    setPopupConfirmationOpen(true);
  }

  // Обработчик удаления карточки из модального окна
  function handleCardDelete() {
    setProcessStatus(true);
    api.removeCard(cardDeleteId)
      .then(() => {
        setCards((state) => state.filter(currentCard => currentCard._id !== cardDeleteId));
        closeAllPopups();
      })
      .catch(err => showError(err));
  }

  // Открытие модального окна изменения аватара
  function handleEditAvatarClick() {
    setPopupAvatarOpen(true);
  }

  // Открытие модального окна редактирования профиля
  function handleEditProfileClick() {
    setPopupProfileOpen(true);
  }

  // Открытие модального окна добавления карточки
  function handleAddPlaceClick() {
    setPopupAddCardsOpen(true);
  }

  // Закрытие модального окна
  function closeAllPopups() {
    setProcessStatus(false);
    setPopupAddCardsOpen(false);
    setPopupAvatarOpen(false);
    setPopupProfileOpen(false);
    setPopupConfirmationOpen(false);
    setSelectedCard({});
    setCardDeleteId('');
  }

  // Открытие модального окна с просмотром изображения карточки
  function handleCardClick(card) {
    setSelectedCard(card);
  }

  // Обновление профиля пользователя
  function handleUpdateUser({ name, about }) {
    setProcessStatus(true);
    api.updateUserProfile(name, about)
      .then(newData => {
        setCurrentUser(newData);
        closeAllPopups();
      })
      .catch(err => showError(err));
  }

  // Обновление автара пользователя
  function handleUpdateAvatar({ avatar }) {
    setProcessStatus(true);
    api.updateAvatar(avatar)
      .then(newData => {
        setCurrentUser(newData);
        closeAllPopups();
      })
      .catch(err => showError(err));
  }

  // Добавление карточки места
  function handleAddPlaceSubmit({ name, link }) {
    setProcessStatus(true);
    api.addNewCard(name, link)
      .then(newCard => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(err => showError(err));
  }

  // Отображение ошибки при запросе к серверу
  function showError(errorData) {
    setProcessStatus(false);
    setErrorData(errorData);

    // интервал скрытия модального окна с ошибкой
    setTimeout(() => {
      setErrorData({});
    }, 7000);
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header />
        <Main
          cards={cards}
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDeleteClick} />
        <Footer />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isProcessing={isProcessing} />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isProcessing={isProcessing} />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          isProcessing={isProcessing} />
        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups} />
        <PopupWithConfirmation
          isOpen={isPopupWithConfirmationOpen}
          onClose={closeAllPopups}
          onCardDelete={handleCardDelete}
          isProcessing={isProcessing}
        />
        <PopupError
          errorData={errorData} />
        <Loader
          isLoading={isLoading} />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default memo(App);