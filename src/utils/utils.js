// Содержимое формы с изменением Аватара пользователя
export const formAvatar =
  <>
    <h2 className="popup__heading popup__heading_type_left-side">Обновить аватар</h2>
    <label className="popup__field">
      <input type="url" placeholder="Сслыка на картинку" name="link" className="popup__input popup__input_type_link"
        id="avatar-link-input" required />
      <span className="popup__input-error avatar-link-input-error"></span>
    </label>
    <button className="popup__submit-btn popup__submit-btn_place_avatar" type="submit">Сохранить</button>
  </>;

// Содержимое формы с обновлением данных профиля
export const formProfile =
  <>
    <h2 className="popup__heading">Редактировать профиль</h2>
    <label className="popup__field">
      <input type="text" placeholder="Имя" name="profileName" className="popup__input popup__input_type_author"
        id="author-input" minLength="2" maxLength="40" required />
      <span className="popup__input-error author-input-error"></span>
    </label>
    <label className="popup__field popup__field_position_bottom">
      <input type="text" placeholder="О себе" name="profileAbout" className="popup__input popup__input_type_activity"
        id="activity-input" minLength="2" maxLength="200" required />
      <span className="popup__input-error activity-input-error"></span>
    </label>
    <button className="popup__submit-btn popup__submit-btn_place_edit-profile" type="submit">Сохранить</button>
  </>;

// Содержимое формы с добавлением данных пользователя
export const formAddCard =
  <>
    <h2 className="popup__heading popup__heading_type_left-side">Новое место</h2>
    <label className="popup__field">
      <input type="text" placeholder="Название" name="title" className="popup__input popup__input_type_place"
        id="place-input" minLength="2" maxLength="30" required />
      <span className="popup__input-error place-input-error"></span>
    </label>
    <label className="popup__field popup__field_position_bottom">
      <input type="url" placeholder="Сслыка на картинку" name="link" className="popup__input popup__input_type_link"
        id="link-input" required />
      <span className="popup__input-error link-input-error"></span>
    </label>
    <button className="popup__submit-btn popup__submit-btn_place_cards" type="submit">Создать</button>
  </>;

// Содержимое формы с подтверждением удаления карточки
export const formConfirmation =
  <>
    <h2 className="popup__heading popup__heading_type_left-side">Вы уверены?</h2>
    <button className="popup__submit-btn popup__submit-btn_place_confirmation" type="submit">Да</button>
  </>;