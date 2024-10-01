import React, { useEffect, useState } from 'react';
import NewsItem from './NewsItem';
import PropTypes from 'prop-types';
import { MockData } from './MockData';

const News = ({ country = 'us', category = 'general', apiKey, pageSize = 4 }) => {
  const [headlines, setHeadlines] = useState([]);
  const [loadedHeadlines, setLoadedHeadlines] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  // const updateNews = async () => {
  //   try {
  //     setLoading(true);
  //     const url = `https://newsapi.org/v2/everything?country=${country}&category=${category}&apiKey=${apiKey}&pageSize=${pageSize}&page=${page}`;
  //     const response = await fetch(url);
  //     const parsedData = await response.json();

  //     if (parsedData.articles) {
  //       // Combine current headlines with new ones
  //       setHeadlines((prevHeadlines) => {
  //         const newHeadlines = parsedData.articles;

  //         // Create a Set of URLs to filter out duplicates
  //         const existingUrls = new Set(prevHeadlines.map(article => article.url));

  //         // Filter out duplicates
  //         const uniqueNewHeadlines = newHeadlines.filter(article => !existingUrls.has(article.url));

  //         return [...prevHeadlines, ...uniqueNewHeadlines]; // Append unique new articles
  //       });
  //     }
  //   } catch (error) {
  //     console.error('Error fetching news:', error);
  //   } finally {
  //     setLoading(false); // Reset loading status
  //   }
  // };

  const updateNews = async () => {
    try {
      setLoading(true); // Set loading state to true while fetching
  
      // const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&pageSize=${pageSize}&page=${page}`;
      const url = `https://newsapi.org/v2/everything?q=${category}&apiKey=${apiKey}&pageSize=${pageSize}&page=${page}`;
      const response = await fetch(url);
  
      // Check if the response is OK (status code 200)
      if (response.ok) {
        const parsedData = await response.json();
  
        if (parsedData.articles) {
          setHeadlines((prevHeadlines) => {
            const newHeadlines = parsedData.articles;
  
            // Create a Set of URLs to filter out duplicates
            const existingUrls = new Set(prevHeadlines.map(article => article.url));
  
            // Filter out duplicates
            const uniqueNewHeadlines = newHeadlines.filter(article => !existingUrls.has(article.url));
  
            return [...prevHeadlines, ...uniqueNewHeadlines]; // Append unique new articles
          });
        }
      } else {
        // If the API response is not OK, use mock data
        console.warn('API call failed, using mock data');
        setHeadlines((prevHeadlines) => {
          const newHeadlines = MockData.articles;
  
          // Create a Set of URLs to filter out duplicates
          const existingUrls = new Set(prevHeadlines.map(article => article.url));
  
          // Filter out duplicates
          const uniqueNewHeadlines = newHeadlines.filter(article => !existingUrls.has(article.url));
  
          return [...prevHeadlines, ...uniqueNewHeadlines]; // Append unique new articles
        });
      }
    } catch (error) {
      // In case of fetch failure (e.g., quota exhausted or network error), use mock data
      console.error('Error fetching news, using mock data:', error);
  
      setHeadlines((prevHeadlines) => {
        const newHeadlines = MockData.articles;
  
        // Create a Set of URLs to filter out duplicates
        const existingUrls = new Set(prevHeadlines.map(article => article.url));
  
        // Filter out duplicates
        const uniqueNewHeadlines = newHeadlines.filter(article => !existingUrls.has(article.url));
  
        return [...prevHeadlines, ...uniqueNewHeadlines]; // Append unique new articles
      });
    } finally {
      setLoading(false); // Reset loading status
    }
  };


  useEffect(() => {
    updateNews();
  }, [page]); // 

  const loadMoreNews = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <div className='container' style={{ marginTop: '100px' }}>
      <h2>FactsGlobe - {capitalizeFirstLetter(category)}</h2>
      <div className='row'>
        {headlines.map((element) => (
          <div className='col-md-4' key={element.url}>
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
      {loading && <p>Loading...</p>}
      <button
        className='btn widget__title'
        onClick={loadMoreNews}
        disabled={loading} // Disable the button while loading
        style={{ marginTop: '20px' }}
      >
        See More Stories
      </button>
    </div>
  );
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;
