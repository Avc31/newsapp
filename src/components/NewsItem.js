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
    const truncatedDescription = truncateText(description, 15);

    return (
        <div className="my-3">
            <a href={newsUrl} style={{ textDecoration: 'none', color: 'inherit', display: 'block'}}>
            <div className="card">
                <img src={!imageUrl ? "https://via.placeholder.com/600x400.png?text=World+News" : imageUrl} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title fs-5">{truncatedTitle}  </h5>
                    <p className="card-text">{truncatedDescription}</p>
                    <p className="card-text"><small className="text-muted">{!author ? "Unknown" : author} |  {new Date(date).toGMTString()}</small></p>
                </div>
            </div>
            </a>
        </div>
    )

}

export default NewsItem