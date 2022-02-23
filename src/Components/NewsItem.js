import React, { Component } from 'react'

export class NewsItem extends Component {
    render() {

        let { title, description, imageUrl, newsUrl, date, author } = this.props;
        return (
            <div>
                <div className="card m-3" style={{ width: "18rem" }}>
                    <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {author ? author : "author"} 
                        <span class="visually-hidden"></span>
                    </span>
                    <img src={imageUrl} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}...</h5>
                        {/* <h6> <span class="badge bg-info">{source}</span></h6> */}
                        <p className="card-text">{description.slice(0, 65)}...</p>
                        <p class="card-text"><small class="text-muted">{new Date(date).toGMTString()} <br/>{author} </small></p>
                        {/* <p class="card-text"><small class="text-muted"> {author} </small></p> */}
                        <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-primary">Read More</a>
                    </div>
                </div>

            </div>
        )
    }
}

export default NewsItem
