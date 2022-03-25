import React from "react";

function Header() {
  return (
    <header className="header">
      <div className="header__nav">
        <div className="header__nav__item">
          <i className="bx bxs-grid"></i>
        </div>
        <div className="header__nav__item">
          <i className="bx bxs-bar-chart-square"></i>
          <h5>Trello</h5>
        </div>
        <div className="header__nav__item">
          <p>Workspace</p>
          <i className="bx bx-chevron-down"></i>
        </div>
        <div className="header__nav__item">
          <p>Recent</p>
          <i className="bx bx-chevron-down"></i>
        </div>
        <div className="header__nav__item">
          <p>Starred</p>
          <i className="bx bx-chevron-down"></i>
        </div>
        <div className="header__nav__item">
          <p>Templates</p>
          <i className="bx bx-chevron-down"></i>
        </div>
        <div className="header__nav__btn">
          <button>Create</button>
        </div>
      </div>
      <div className="header__box">
          <div className="header__box__item-search">
              <input type="text" />
              <i className='bx bx-search'></i>
          </div>
          <div className="header__box__item">
            <i className='bx bx-info-circle' ></i>
          </div>
          <div className="header__box__item">
            <i className='bx bx-bell'></i>
          </div>
          <div className="header__box__item">
            <div className="header__box__item__avatar">
                <p>PN</p>
            </div>
          </div>
      </div>
    </header>
  );
}

export default Header;
