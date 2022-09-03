import React, { Component, useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {

    // const makeFirstLetterCapital = (s) => {
    //     return s[0].toUppercase() + s.slice(1);
    // }

    const [article, setArticle] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [totalresults, setTotalresults] = useState(0);

    // class start
    // constructor(props) {
    //     super(props);
    //     // console.log("this is a contructor");
    //     this.state = {
    //         article: [],
    //         loading: false,
    //         page: 1,
    //         totalResults: 0
    //     };
    //     // document.title = `NewsMonk - ${this.makeFirstLetterCapital(this.props.category)}`;
    //     document.title = `NewsMonk - ${this.props.category}`;
    // }
    // class end


    // async componentDidMount = () => {
    //     // this.state.setProgress(0);
    //     // console.log("its a component did mount !")
    //     let url = `https://newsapi.org/v2/top-headlines?country=us&category=${props.category}&apiKey=${props.apiKey}&pageSize=${this.props.pageSize}`;
    //     this.setState({ loading: true })
    //     let data = await fetch(url);
    //     let parsedData = await data.json();
    //     // this.setState({ loading: false })
    //     this.setState({
    //         article: parsedData.articles,
    //         totalResults: parsedData.totalResults,
    //         loading: false
    //     })
    //     // this.state.setProgress(100);
    // }

    


    useEffect(async () => {
        document.title = `NewsMonk - ${props.category}`;
        // document.title = `NewsMonk - ${props.category[0].toUppercase() + props.category.slice(1)}`;
        let url = `https://newsapi.org/v2/top-headlines?country=us&category=${props.category}&apiKey=${props.apiKey}&pageSize=${props.pageSize}`;
        // this.setState({ loading: true })
        let data = await fetch(url);
        let parsedData = await data.json();
        // console.log(parsedData);
        console.log(data)
        setArticle(parsedData.articles);
        setTotalresults(parsedData.totalResults);
        setLoading(false);



    }, []);




    // handleNextPage = async () => {
    //     console.log("next button")
    //     if ((this.state.page + 1) <= (Math.ceil(this.state.totalResults / 20))) {
    //         // console.log("its a component did mount !")
    //         let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=c3d07ccd5302460798dd69e6bd04aa42&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
    //         this.setState({ loading: true })

    //         let data = await fetch(url);
    //         let parsedData = await data.json();
    //         // console.log(data);
    //         console.log(parsedData);
    //         this.setState({
    //             article: parsedData.articles,
    //             page: this.state.page + 1,
    //             loading: false
    //         })
    //     }
    //     else {
    //         console.log("no more pages required")
    //         alert("You have reached to the last page !")

    //     }
    // }

    // handlePrevPage = async () => {
    //     console.log('prev button ')
    //     console.log("next button")

    //     // console.log("its a component did mount !")

    //     if (this.state.page <= 1) {
    //         alert("you are already at first page !")
    //     }
    //     else {


    //         let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=c3d07ccd5302460798dd69e6bd04aa42&page=${this.state.page - 1}&pageSize=5`;
    //         this.setState({ loading: true })
    //         let data = await fetch(url);
    //         let parsedData = await data.json();
    //         // console.log(data);
    //         console.log(parsedData);
    //         this.setState({
    //             article: parsedData.articles,
    //             page: this.state.page - 1,
    //             loading: false
    //         })
    //     }
    // }

    // fetchMoreData = async () => {
    //     // a fake async api call like which sends
    //     // 20 more records in 1.5 secs
    //     this.setState({

    //         page: this.state.page + 1
    //     })
    //     let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=${this.props.apiKey}&page=${this.state.page + 1}&pageSize=5`;
    //     // this.setState({ loading: true })
    //     let data = await fetch(url);
    //     let parsedData = await data.json();
    //     // console.log(data);
    //     console.log(parsedData);
    //     this.setState({
    //         article: this.state.article.concat(parsedData.articles),
    //         totalResults: this.totalResults
    //         // loading: false
    //     })

    // };

    const fetchMoreData = async () => {
        setPage(page + 1);
        let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=${props.apiKey}&page=${page + 1}&pageSize=5`;
        let data = await fetch(url);
        let parsedData = await data.json();
        setArticle(article.concat(parsedData.articles));
        setTotalresults(totalresults);
    };

    return (<>
        {/* <div className='container' > */}
        <div className='container my-3'>
            <h1 className= "" style={{ marginTop: "100px", marginBottom: "20px", textAlign: "center" }}>
                Top News HeadLines
            </h1>

            {/* {this.state.loading && < Spinner />} */}

            <InfiniteScroll
                dataLength={article.length}
                next={fetchMoreData}
                hasMore={article.length !== totalresults}
                loader={<Spinner />}>
                <div className='container'>
                    <div className="row">
                        {article.map((element) => ( // here don't use curly braces. its a fun but dont return anything.
                            <div className="col-md-4" key={element.url} >
                                < NewsItem author={element.author} source={element.source.name} date={element.publishedAt} title={element.title ? element.title : " here is the news with no title😂😂 "} description={element.description ? element.description : " "} newsUrl={element.url} imageUrl={element.urlToImage ? element.urlToImage : "https://media-cldnry.s-nbcnews.com/image/upload/newscms/2018_21/2442281/og-nbcnews1200x630.png"} />
                            </div>
                        ))
                        }
                    </div>
                </div>

            </InfiniteScroll >


            {/* previous and next butttons  */}

            {/* <div className='my-3 d-flex justify-content-between'>
                    <button type="button" onClick={this.handlePrevPage} className="btn btn-secondary">&larr;  Previous </button>
                    <button type="button" onClick={this.handleNextPage} className="btn btn-secondary">Next &rarr; </button>
                </div> */}


        </div >
        {/* </div> */}

    </>
    )
}

export default News
