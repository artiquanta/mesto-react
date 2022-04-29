import { useState, useEffect } from 'react';
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
  const [isEditProfilePopupOpen, openPopupProfile] = useState(false);
  const [isAddPlacePopupOpen, openPopupAddCards] = useState(false);
  const [isEditAvatarPopupOpen, openPopupAvatar] = useState(false);
  const [isPopupWithConfirmationOpen, openPopupConfirmation] = useState(false);
  const [selectedCard, selectCard] = useState({});
  const [cardDeleteId, setCardDeleteId] = useState('');
  const [currentUser, setCurrentUser] = useState({});
  const [cards, addCard] = useState([]);
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
        addCard(existingCards => [...existingCards, ...cardsData]);
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
        addCard((state) => state.map(currentCard => currentCard._id === card._id ? newCard : currentCard));
      })
      .catch(err => showError(err));
  }

  // Обработчик нажатия кнопки удаления карточки
  function handleCardDeleteClick(cardId) {
    setCardDeleteId(cardId);
    openPopupConfirmation(true);
  }

  // Обработчик удаления карточки из модального окна
  function handleCardDelete() {
    api.removeCard(cardDeleteId)
      .then(() => {
        addCard((state) => state.filter(currentCard => currentCard._id !== cardDeleteId));
        closeAllPopups();
      })
      .catch(err => showError(err));
  }

  // Открытие модального окна изменения аватара
  function handleEditAvatarClick() {
    openPopupAvatar(true);
  }

  // Открытие модального окна редактирования профиля
  function handleEditProfileClick() {
    openPopupProfile(true);
  }

  // Открытие модального окна добавления карточки
  function handleAddPlaceClick() {
    openPopupAddCards(true);
  }

  // Закрытие модального окна
  function closeAllPopups() {
    setProcessStatus(false);
    openPopupAddCards(false);
    openPopupAvatar(false);
    openPopupProfile(false);
    openPopupConfirmation(false);
    selectCard({});
    setCardDeleteId('');
  }

  // Открытие модального окна с просмотром изображения карточки
  function handleCardClick(card) {
    selectCard(card);
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
      });
  }

  // Добавление карточки места
  function handleAddPlaceSubmit({ name, link }) {
    setProcessStatus(true);
    api.addNewCard(name, link)
      .then(newCard => {
        addCard([newCard, ...cards]);
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
        />
        <PopupError
          errorData={errorData} />
        <Loader
          isLoading={isLoading} />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;