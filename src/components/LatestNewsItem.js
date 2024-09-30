import React from 'react'
import formatDistanceToNow from 'date-fns/formatDistanceToNow';


const formatDateAgo = (date) => {
    return formatDistanceToNow(new Date(date), { addSuffix: true });
};

const LatestNewsItem = (props)=> {
        let { title, description, imageUrl, newsUrl, author, date, source } = props;
        return (
            <div className="my-3">
                <div className="card border-0 fs-6">
                    
                    <div className="card-body p-0">
                        <h5 className="card-title fs-6">{title}  </h5>
                        <p className="card-text"><small className="text-muted">{!author ? "Unknown" : author} |  {formatDateAgo(date)}</small></p>
                    </div>
                </div>
            </div>
        )
     
}

export default LatestNewsItem