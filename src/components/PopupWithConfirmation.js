import { memo } from "react";
import PopupWithForm from "./PopupWithForm";

function PopupWithConfiramtion(props) {
  const { isOpen, onClose, onCardDelete } = props;

  function handleSubmit(evt) {
    evt.preventDefault();
    onCardDelete();
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <>
        <h2 className="popup__heading popup__heading_type_left-side">Вы уверены?</h2>
        <button className="popup__submit-btn popup__submit-btn_place_confirmation" type="submit">Да</button>
      </>
    </PopupWithForm>
  );
}

export default memo(PopupWithConfiramtion);