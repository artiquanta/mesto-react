import React from "react";
import api from '../utils/Api';
import Card from './Card';

function Main(props) {
  const [userId, setUserId] = React.useState('');
  const [userName, setUserName] = React.useState('');
  const [userDescription, setUserDescription] = React.useState('');
  const [userAvatar, setUserAvatar] = React.useState('');
  const [cards, addCard] = React.useState([]);

  // Получение с сервера информации о текущем пользователе и имеющихся карточках
  React.useEffect(() => {
    Promise.all([
      api.getCurrentUser(),
      api.getInitialCards()
    ])
      .then(([userData, existingCards]) => {
        setUserId(userData._id);
        setUserName(userData.name);
        setUserDescription(userData.about);
        setUserAvatar(userData.avatar);
        addCard(card => [...card, ...existingCards]);
      })
      .catch(err => console.log(`При выполнении запроса произошла ошибка. Код ошибки: ${err.status}`));
  }, []);

  return (
    <main className="content">
      <section className="profile content__profile">
        <div className="profile__info">
          <div className="profile__avatar" onClick={props.onEditAvatar}>
            <div className="profile__avatar-overlay"></div>
            <img src={`${userAvatar}`} alt="Аватар профиля пользователя." className="profile__avatar-img" />
          </div>
          <div className="profile__author-info">
            <div className="profile__control">
              <h1 className="profile__author">{userName}</h1>
              <button className="profile__edit-btn" onClick={props.onEditProfile} />
            </div>
            <p className="profile__activity">{userDescription}</p>
          </div>
        </div>
        <button className="profile__add-btn" onClick={props.onAddPlace} />
      </section>
      <section className="cards-grid">
        <ul className="cards cards-grid__cards">
          {cards.map((card) =>
            <Card
              card={card}
              currentUser={userId}
              onCardClick={props.onCardClick}
              key={card._id}
            />
          )}
        </ul>
      </section>
    </main>
  );
}

export default Main;