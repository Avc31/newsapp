import React, { useEffect, useState } from 'react';
import NewsItem from './NewsItem';
import PropTypes from 'prop-types';
import { MockData } from './MockData';

const News = ({ country = 'us', category = 'general', apiKey, pageSize = 4, searchQuery = '' }) => {
  const [headlines, setHeadlines] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  // Capitalizes the first letter of the category for display
  const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);

  // Function to fetch news and update state
  const updateNews = async () => {
    try {
      setLoading(true); // Set loading to true before fetching

      // Construct the query param based on searchQuery or category
      const queryParam = searchQuery ? `q=${searchQuery}` : `q=${category}`;
      const url = `https://newsapi.org/v2/everything?${queryParam}&apiKey=${apiKey}&pageSize=${pageSize}&page=${page}`;

      const response = await fetch(url);

      if (response.ok) {
        const parsedData = await response.json();

        if (parsedData.articles) {
          setHeadlines((prevHeadlines) => {
            const newHeadlines = parsedData.articles;

            // Filter out duplicate articles using a Set
            const existingUrls = new Set(prevHeadlines.map(article => article.url));
            const uniqueNewHeadlines = newHeadlines.filter(article => !existingUrls.has(article.url));

            return [...prevHeadlines, ...uniqueNewHeadlines]; // Append unique new articles
          });
        }
      } else {
        console.warn('API call failed, using mock data');
        // Fallback to mock data in case of non-200 response
        fallbackToMockData();
      }
    } catch (error) {
      console.error('Error fetching news, using mock data:', error);
      fallbackToMockData(); // Use mock data on error
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  // Function to handle mock data fallback
  const fallbackToMockData = () => {
    setHeadlines((prevHeadlines) => {
      const newHeadlines = MockData.articles;

      // Filter out duplicate articles using a Set
      const existingUrls = new Set(prevHeadlines.map(article => article.url));
      const uniqueNewHeadlines = newHeadlines.filter(article => !existingUrls.has(article.url));

      return [...prevHeadlines, ...uniqueNewHeadlines]; // Append unique new articles
    });
  };

  // Effect to update news whenever the page or search query changes
  useEffect(() => {
    // Reset headlines and page number when searchQuery changes
    if (searchQuery) {
      setHeadlines([]);
      setPage(1);
    }
    updateNews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, searchQuery]);

  // Function to load more news (increment page number)
  const loadMoreNews = () => setPage((prev) => prev + 1);

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
  apiKey: PropTypes.string.isRequired,
  searchQuery: PropTypes.string
};

export default News;
