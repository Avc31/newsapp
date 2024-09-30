import React from 'react'

const LatestNewsItem = (props)=> {
        let { title, description, imageUrl, newsUrl, author, date, source } = props;
        return (
            <div className="my-3">
                <div className="card border-0 fs-6">
                    
                    {/* <img src={!imageUrl ? "https://fdn.gsmarena.com/imgroot/news/21/08/xiaomi-smart-home-india-annoucnements/-476x249w4/gsmarena_00.jpg" : imageUrl} className="card-img-top" alt="..." /> */}
                    <div className="card-body p-0">
                        <h5 className="card-title fs-6">{title}  </h5>
                        {/* <p className="card-text">{description}</p> */}
                        <p className="card-text"><small className="text-muted">{!author ? "Unknown" : author} |  {new Date(date).toGMTString()}</small></p>
                        {/* <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read More</a> */}
                    </div>
                </div>
            </div>
        )
     
}

export default LatestNewsItem