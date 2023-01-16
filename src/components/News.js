import React, {useEffect, useState} from "react";
import NewsItem from "./NewsItem";
import PropTypes from "prop-types";
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) =>{
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState([true])
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)


 
  const updateNews = async() => {
    props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pagesize=${props.pageSize}`;
    setLoading(true);
    let data = await fetch(url);
    props.setProgress(70);
    let parsedata = await data.json();
    setArticles(parsedata.articles);
    setTotalResults(parsedata.totalResults);
    setLoading(false);
    props.setProgress(100);

  }
  useEffect(() => {
    document.title = `${props.category}-NewsApp`;
    updateNews();
  }, [])
  
  const fetchMoreData = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pagesize=${props.pageSize}`;
    let data = await fetch(url);
    setPage(page + 1);    
    let parsedata = await data.json();
    setArticles(articles.concat(parsedata.articles));
    setTotalResults(parsedata.totalResults);
  };

    return (
      <>
          <h1 className="text-center" style={{marginTop:"70px"}}>
            NewsApp - Top Headlines ({props.category})
          </h1>
          {loading && <Spinner/>}
          <InfiniteScroll
            dataLength={articles.length}
            next={fetchMoreData}
            hasMore={articles.length !== totalResults}
            loader={<Spinner/>}
          >
            <div className="container">
              <div className="row">
                {articles.map((element) => {
                  return (
                    <div className="col-md-4" key={element.index}>
                      <NewsItem
                        title={element.title ? element.title.slice(0, 50) : ""}
                        description={
                          element.description
                            ? element.description.slice(0, 100)
                            : ""
                        }
                        imageUrl={
                          element.urlToImage
                            ? element.urlToImage
                            : "https://akm-img-a-in.tosshub.com/indiatoday/2023-01/mars%20sample%20return.gif?VersionId=Aav6viGUADS8lx8cuegKfG8ETRHTDrnv"
                        }
                        newsUrl={element.url}
                        author={element.author}
                        date={element.publishedAt}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </InfiniteScroll>
      </>
    );
}

  News.defaultProps = {
      country: "in",
      pageSize: "10",
      category: "science",
  };

  News.propTypes = {
      country: PropTypes.string,
      pageSize: PropTypes.number,
      category: PropTypes.string,
  };


export default News;
