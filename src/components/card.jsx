import React from 'react';
import './card.css'; 

const Card = ({ id, title, type, profileImage }) => {
  return (
    <div className="card">
      <div className="first">
        <h3 className="title">{id}</h3>
        <div className="profile-image">
          {/* <img src={profileImage} alt="Profile" /> */}
        </div>
      </div>
      <div className="second">
        <h2 className="header">{title}</h2>
      </div>
      <div className="third">
        <div className="exclamation-outer">
          <div className="exclamation-main">!</div>
        </div>
        <div className="tag">{type}</div>
      </div>
    </div>
  );
};

export default Card;
