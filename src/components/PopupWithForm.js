import { memo } from "react";

function PopupWithForm(props) {
  const { isOpen, onClose, onSubmit, children } = props;

  return (
    <div className={`popup ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__overlay" onClick={onClose}></div>
      <div className="popup__container popup__container_content_form">
        <button className="popup__close-btn" onClick={onClose} />
        <form className="popup__inputs" onSubmit={onSubmit} noValidate>
          {children}
        </form>
      </div>
    </div>
  );
}

export default memo(PopupWithForm);