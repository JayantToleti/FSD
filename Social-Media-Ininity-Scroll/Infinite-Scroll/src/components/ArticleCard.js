import React from 'react';

const ArticleCard = ({ title, description }) => {
  return (
    <div className="article-card">
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
};

export default ArticleCard;
