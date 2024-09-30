import React, { useEffect, useState } from 'react';
import NewsItem from './NewsItem'; 
import PropTypes from 'prop-types';

const News = (props) => {
  const [headlines, setHeadlines] = useState([]);

  const updateNews = async () => {
    try {
      const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&pageSize=${props.pageSize}`;
      const response = await fetch(url);
      const parsedData = await response.json();
      setHeadlines(parsedData.articles); 
    } catch (error) {
      console.error('Error fetching news:', error);
    }
  };

  useEffect(() => {
    updateNews();
  }, []); 

  return (
    <div className='container' style={{marginTop:'80px'}}>
      <h2>FactsGlobe Headlines</h2>
      <div className='row'>
        {headlines.map((element) => (
          <div className='col-md-6' key={element.url}>
            <NewsItem
              title={element.title}
              description={element.description}
              imageUrl={element.urlToImage}
              newsUrl={element.url}
              date={element.publishedAt}
              author={element.author}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

News.defaultProps = {
  country: 'us',
  pageSize: 8,
  category: 'general',
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;
