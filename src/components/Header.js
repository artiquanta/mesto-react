import { memo } from 'react';

function Header() {
  return (
    <header className="header page__section">
      <div className="header__logo"></div>
    </header>
  );
}

export default memo(Header);