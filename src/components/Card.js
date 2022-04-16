import React from "react";

function Card(props) {
  const card = props.card; // текущая карточка
  const currentUser = props.currentUser; // идентификатор текущего пользователя

  // Функция-колбэк открытия модального окна просмотра изображения карточки
  function handleImageClick() {
    props.onCardClick(props.card);
  }

  return (
    <li className="cards__item">
      {card.owner._id === currentUser ? <button className="cards__remove-btn" /> : ''}
      <img className="cards__image" src={card.link} alt={`${card.name}.`} onClick={handleImageClick} />
      <div className="cards__description">
        <h2 className="cards__place">{card.name}</h2>
        <div className="cards__likes">
          <button className="cards__like-btn" />
          <p className="cards__like-count">{card.likes.length}</p>
        </div>
      </div>
    </li>
  );
}

export default Card;