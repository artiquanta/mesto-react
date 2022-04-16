import React from "react";

function ImagePopup(props) {
  const card = props.card; // Текущая карточка

  return (
    <div className={`popup popup_type_image ${card ? 'popup_opened' : ''}`}>
      <div className="popup__overlay" onClick={props.onClose}></div>
      <div className="popup__container popup__container_content_image">
        <button className="popup__close-btn" onClick={props.onClose} />
        <figure className="popup__figure">
          <img src={`${card.link}`} alt={`${card.name}.`} className="popup__photo" />
          <figcaption className="popup__caption">{card.name}</figcaption>
        </figure>
      </div>
    </div>
  );
}

export default ImagePopup;