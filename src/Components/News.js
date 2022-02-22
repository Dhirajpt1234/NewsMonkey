import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
export class News extends Component {

    constructor() {
        super();
        // console.log("this is a contructor");
        this.state = {
            article: [],
            loading: false,
            page: 1
            

        };
    }

    async componentDidMount() {
        // console.log("its a component did mount !")
        let url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=c3d07ccd5302460798dd69e6bd04aa42&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true })
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({loading : false})
       

        // console.log(data);
        // console.log(parsedData);
        this.setState({ article: parsedData.articles, totalResults: parsedData.totalResults , loading: false })

    }

    handleNextPage = async () => {
        console.log("next button")
        if ((this.state.page + 1) <= (Math.ceil(this.state.totalResults / 20))) {
            // console.log("its a component did mount !")
            let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=c3d07ccd5302460798dd69e6bd04aa42&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
            this.setState({ loading: true })

            let data = await fetch(url);
            let parsedData = await data.json();
            // console.log(data);
            console.log(parsedData);
            this.setState({
                article: parsedData.articles,
                page: this.state.page + 1,
                loading : false
            })
        }
        else {
            console.log("no more pages required")
            alert("You have reached to the last page !")

        }
    }

    handlePrevPage = async () => {
        console.log('prev button ')
        console.log("next button")

        // console.log("its a component did mount !")

        if (this.state.page <= 1) {
            alert("you are already at first page !")
        }
        else {


            let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=c3d07ccd5302460798dd69e6bd04aa42&page=${this.state.page - 1}&pageSize=5`;
            this.setState({loading : true})
            let data = await fetch(url);
            let parsedData = await data.json();
            // console.log(data);
            console.log(parsedData);
            this.setState({
                article: parsedData.articles,
                page: this.state.page - 1,
                loading : false
            })
        }
    }

    render() {

        return (

            <div className='container my-3'>
                <h1 className='my-3'>
                    Top News HeadLines
                </h1>
                {this.state.loading && < Spinner />}

                <div className="row">
                    { !this.state.loading && this.state.article.map((element) => ( // here don't use curly braces. its a fun but dont return anything .
                        <div className="col-md-4" key={element.url} >
                            < NewsItem title={element.title ? element.title : " here is the news with no title😂😂 "} description={element.description ? element.description : " "} newsUrl={element.url} imageUrl={element.urlToImage ? element.urlToImage : "https://media-cldnry.s-nbcnews.com/image/upload/newscms/2018_21/2442281/og-nbcnews1200x630.png"} />
                        </div>
                    ))
                    }
                </div>

                <div className='my-3 d-flex justify-content-between'>
                    <button type="button" onClick={this.handlePrevPage} className="btn btn-secondary">&larr;  Previous </button>
                    <button type="button" onClick={this.handleNextPage} className="btn btn-secondary">Next &rarr; </button>
                </div>
            </div >


        )
    }
}

export default News
