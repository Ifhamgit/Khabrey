import React, {useEffect,useState} from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";




const News=(props)=> {
const [articles,setArticles]= useState([])
const [loading,setLoading]= useState(true)
const [page,setPage]= useState(1)
const [totalResults,setTotalResults]= useState(0)

 

  const capitalize =(string)=>{
     return string.charAt(0).toUpperCase() + string.slice(1)
  }

  

  const fetchMoreData = async() => {
    
  let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`
  
  let data = await fetch(url)
  console.log(data)
  let parsedData = await data.json()
  console.log(parsedData)  //writing this console is important as it helps in catching of errors from console of the browser.
  setArticles(articles.concat(parsedData.articles))
  setTotalResults(parsedData.totalResults)
   setPage(page+1) 
 
  };


  
  const updateNews=async()=>{
    props.setProgress(10)
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=1&pageSize=${props.pageSize}`
    setLoading(true)
    
    let data = await fetch(url)
    props.setProgress(30)
    console.log(data)
    let parsedData = await data.json()
    props.setProgress(60)
    console.log(parsedData)  //writing this console is important as it helps in catching of errors from console of the browser.
    setArticles(parsedData.articles)
    setLoading(false)
    

    props.setProgress(100)
  }


  useEffect(() => {
    document.title = `${capitalize(props.category)} - khabrey`
    updateNews();
    // eslint-disable-line no-use-before-define
  }, []);

 
   

    return (
      <>
        <h2 className="text-center" style = {{margin:"35px",marginTop:"70px"}}>
          {" "}
          <strong>Khabrey </strong> - Din bhar ki taza <strong>Khabrey</strong> -{capitalize(props.category)}
        </h2>
         {loading && <Spinner/>} 

        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner/>}
        >
       <div className="container my-3">  
        <div className="row">
          
         

            {articles.map((element,index)=>{ 
                return (<div className="col-md-4"  key = {index}>
            
                {/*The grid in bootstrap is of 12 columns, so md-4 means the particular card is taking 4 grids
                                            so in one row there will be equally divided 3 columns. */}
                <NewsItem
                 
                  title={element.title?element.title.slice(0,88):""}
                
                  description={element.description?element.description.slice(0,88):""}
                 
                  imageUrl={element.urlToImage}
                  newsUrl = {element.url}
                  author = {element.author}
                  date = {element.publishedAt}
                  source = {element.source.name} />
                  
              </div>)
              

            })}
          
        </div>
        </div>
        </InfiniteScroll>
        
       
      
      </>

    );
    
  }

  

News.defaultProps = {
  country:"in",
  pageSize:8,
  category:"general"
}
News.propTypes={
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category:PropTypes.string
}
export default News;

