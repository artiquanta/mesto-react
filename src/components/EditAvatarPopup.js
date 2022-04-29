import { memo, useRef, useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const { isOpen, onClose, onUpdateAvatar, isProcessing } = props;
  const inputAvatarRef = useRef();

  // Состояния валидации
  const [formValid, setFormValidity] = useState(false);
  const [inputValidity, setInputValidity] = useState(false);
  const [inputErrorText, setInputErrorText] = useState('');

  const submitButtonStatus = isProcessing ? 'Сохранение...' : 'Сохранить';

  // При изменении состояния валидности полей ввода, обновляем состояние валидности формы
  useEffect(() => {
    setInputValidity(true);
    setFormValidity(false);
    inputAvatarRef.current.value = '';
  }, [isOpen]);

  // Обработчик поля ввода
  function handleChange(evt) {
    if (evt.target.validity.valid) {
      setInputValidity(true);
      setFormValidity(true);
      setInputErrorText('');
    } else {
      setInputValidity(false);
      setFormValidity(false);
      setInputErrorText(evt.target.validationMessage);
    }
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateAvatar({
      avatar: inputAvatarRef.current.value
    });
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <>
        <h2 className="popup__heading popup__heading_type_left-side">Обновить аватар</h2>
        <label className="popup__field">
          <input type="url" placeholder="Сслыка на картинку" name="link" className={`popup__input ${inputValidity ? '' : 'popup__input_state_error'}`}
            id="avatar-link-input" required ref={inputAvatarRef} onChange={handleChange} />
          <span className={`popup__input-error ${inputValidity ? '' : 'popup__input-error_active'}`}>{inputErrorText}</span>
        </label>
        <button className={`popup__submit-btn popup__submit-btn_place_avatar ${formValid ? '' : 'popup__submit-btn_inactive'}`} type="submit" disabled={formValid ? false : true} >{submitButtonStatus}</button>
      </>
    </PopupWithForm>
  );
}

export default memo(EditAvatarPopup);