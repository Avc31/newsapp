import React from 'react'

const NewsItem = (props) => {
    let { title, description, imageUrl, newsUrl, author, date, source } = props;

    // Function to truncate text to a specific word limit
    const truncateText = (text, limit) => {
        if (!text) return '';
        const words = text.split(' ');
        if (words.length > limit) {
            return words.slice(0, limit).join(' ') + '...';
        }
        return text;
    };

    const truncatedTitle = truncateText(title, 10);
    const truncatedDescription = truncateText(description, 25);

    return (
        <div className="my-3">
            <div className="card">
                <img src={!imageUrl ? "https://fdn.gsmarena.com/imgroot/news/21/08/xiaomi-smart-home-india-annoucnements/-476x249w4/gsmarena_00.jpg" : imageUrl} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title fs-5">{truncatedTitle}  </h5>
                    <p className="card-text">{truncatedDescription}</p>
                    <p className="card-text"><small className="text-muted">{!author ? "Unknown" : author} |  {new Date(date).toGMTString()}</small></p>
                    <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read More</a>
                </div>
            </div>
        </div>
    )

}

export default NewsItem