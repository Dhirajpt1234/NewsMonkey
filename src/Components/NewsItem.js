import React from 'react'

const NewsItem = (props) => {


    const { title, description, imageUrl, newsUrl, date, author } = props;

    return (
        <div>
            <div className="card m-3" style={{ width: "18rem" }}>
                <span style={{ zIndex: "2" }} class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger ">
                    {author ? author.slice(0, 20) : "author"}
                    <span class="visually-hidden"></span>
                </span>
                <img src={imageUrl} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{title}...</h5>
                    {/* <h6> <span class="badge bg-info">{source}</span></h6> */}
                    <p className="card-text">{description.slice(0, 65)}...</p>
                    <p class="card-text"><small class="text-muted">{new Date(date).toGMTString()} <br />{author} </small></p>
                    {/* <p class="card-text"><small class="text-muted"> {author} </small></p> */}
                    <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-primary">Read More</a>
                </div>
            </div>

        </div>
    )

}

export default NewsItem
