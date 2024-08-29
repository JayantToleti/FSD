// to use this copy this and paste to NewsFeed.js

import React, { useEffect, useState, useRef, useCallback } from 'react';
import ArticleCard from '../components/ArticleCard';
import LoadingSpinner from '../components/LoadingSpinner';

const NewsFeed = () => {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef();

  const fetchArticles = useCallback(async () => {
    if (loading) return; // Prevent multiple fetches
    setLoading(true);
    console.log(`Fetching page ${page}...`);
    try {
      const response = await fetch(
        `https://newsapi.org/v2/top-headlines?country=us&pageSize=10&page=${page}&apiKey=${process.env.REACT_APP_NEWS_API_KEY}`
      );
      const data = await response.json();

      // If the data.articles is empty, set hasMore to false
      if (data.articles.length === 0) {
        setHasMore(false);
      } else {
        setArticles((prevArticles) => [...prevArticles, ...data.articles]);
      }

      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  }, [page, loading]);

  useEffect(() => {
    if (hasMore) {
      fetchArticles();
    }
  }, [fetchArticles, hasMore]);

  const lastArticleElementRef = useCallback(
    (node) => {
      if (loading || !hasMore) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          console.log('Last element in view, loading more...');
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  return (
    <div className="news-feed">
      {articles.map((article, index) => {
        if (articles.length === index + 1) {
          return (
            <div ref={lastArticleElementRef} key={article.title}>
              <ArticleCard
                title={article.title}
                description={article.description}
              />
            </div>
          );
        } else {
          return (
            <ArticleCard
              key={article.title}
              title={article.title}
              description={article.description}
            />
          );
        }
      })}
      {loading && <LoadingSpinner />}
      {!hasMore && <div>No more articles to load.</div>}
    </div>
  );
};

export default NewsFeed;
