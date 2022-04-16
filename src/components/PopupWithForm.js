function PopupWithForm(props) {
  return (
    <div className={`popup ${props.isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__overlay" onClick={props.onClose}></div>
      <div className="popup__container popup__container_content_form">
        <button className="popup__close-btn" onClick={props.onClose} />
        <form className="popup__inputs" name={props.name} onSubmit={props.onClose} noValidate>
          {props.children}
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;