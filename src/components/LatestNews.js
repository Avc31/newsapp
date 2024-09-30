import React, { useEffect, useState } from 'react';
import LatestNewsItem from './LatestNewsItem'; // Make sure you have a valid path to your LatestNewsItem component
import PropTypes from 'prop-types';

const LatestNews = (props) => {
  const [headlines, setHeadlines] = useState([]);

  const updateLatestNews = async () => {
    try {
      const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&pageSize=${props.pageSize}`;
      const response = await fetch(url);
      const parsedData = await response.json();
      setHeadlines(parsedData.articles); // Use 'articles' instead of 'headlines'
    } catch (error) {
      console.error('Error fetching LatestNews:', error);
    }
  };

  useEffect(() => {
    updateLatestNews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Remove the comment here to avoid the eslint warning

  return (
    <div className='container' style={{marginTop:'80px'}}>
      <h2 className='widget__title'>JUST IN</h2>
      <div className='row'>
        {headlines.map((element) => (
          <div className='col-md-12' key={element.url}>
            <LatestNewsItem
              title={element.title}
              description={element.description}
              imageUrl={element.urlToImage}
              LatestNewsUrl={element.url}
              date={element.publishedAt}
              author={element.author}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

LatestNews.defaultProps = {
  country: 'us',
  pageSize: 8,
  category: 'general',
};

LatestNews.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default LatestNews;
