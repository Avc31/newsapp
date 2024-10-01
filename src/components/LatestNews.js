import React, { useEffect, useState } from 'react';
import LatestNewsItem from './LatestNewsItem'; // Make sure you have a valid path to your LatestNewsItem component
import PropTypes from 'prop-types';
import { MockData } from './MockData';

const LatestNews = ({ country = 'us', category = 'general', apiKey, latestpageSize = 8 }) => {
  const [headlines, setHeadlines] = useState([]);

  // const updateLatestNews = async () => {
  //   try {
  //     const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&latestpageSize=${latestpageSize}`;
  //     const response = await fetch(url);
  //     const parsedData = await response.json();
  //     setHeadlines(parsedData.articles); // Use 'articles' instead of 'headlines'
  //   } catch (error) {
  //     console.error('Error fetching LatestNews:', error);
  //   }
  // };

  const updateLatestNews = async () => {
    try {
      const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&pageSize=${latestpageSize}`;
      const response = await fetch(url);
  
      // Check if the response is OK (status code 200)
      if (response.ok) {
        const parsedData = await response.json();
        setHeadlines(parsedData.articles); // Use 'articles' from the API response
      } else {
        // If API response is not successful, use mock data
        console.warn('API call failed, using mock data');
        setHeadlines(MockData.articles); // Use mock data as fallback
      }
    } catch (error) {
      // If fetch fails (e.g., network issues, API quota exhausted), use mock data
      console.error('Error fetching LatestNews, using mock data:', error);
      setHeadlines(MockData.articles); // Use mock data as fallback
    }
  };
  

  useEffect(() => {
    updateLatestNews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Remove the comment here to avoid the eslint warning

  return (
    <div className='container' style={{marginTop:'100px'}}>
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

LatestNews.propTypes = {
  country: PropTypes.string,
  latestpageSize: PropTypes.number,
  category: PropTypes.string,
};

export default LatestNews;
