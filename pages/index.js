// This is the Link API
import Link from 'next/link';
import fetch from 'isomorphic-unfetch';
import SearchForm from '../components/SearchForm';



const defaultsource = 'rte,the-irish-times,bbc-news';

const apiKey = 'e1e01a091a654742bea0e01559d5f00b';



//const url = `https://newsapi.org/v2/top-headlines?sources=${source}&apiKey=${apiKey}`;

async function getNews(url) {
  try{
    const res = await fetch(url);
    const data = await res.json();
    return (data);
  } catch (error) {
    return (error);
  }
} 

function limitTitleWordCount(originalTitle){
  var stringr = "";
  if(originalTitle.length < 75){
    return originalTitle;
  }
  else{
    for(var i = 0; i < 75; i ++){
      stringr+= originalTitle.charAt(i);
    }

  }

  return stringr + "...";
  
}

function cleanDate(data) {
  var date = new Date(data);
  var months = ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
  var year = date.getFullYear();
  var month = months[date.getMonth()];
  var day = date.getDate();

  
  var formattedDate = "Date published: " + day + ' ' + month + ' ' + year

  //var formattedDate = day + '-' + month + '-' + year
  return formattedDate;
}

export default class News extends React.Component {
  

  constructor(props) {
    super(props)
    this.state = {
      newsSource: "",
      url: "",
      articles: []
    }
  }

  setNewsSource = (input) => {
    this.setState({
      newsSource: input,
      //sort by most popular
      url: `https://newsapi.org/v2/everything?q=${input}&sortBy=popularity&apiKey=${apiKey}`
    })
  }


render() {
  
  if (this.state.articles.length == 0) {
    this.state.articles = this.props.articles;
  }
  return(
    <div>

  
      <center>
      <div className="searchBar">
      <SearchForm setNewsSource = {this.setNewsSource}/>
      </div>
      
      <br></br>
      
      <h3>{this.state.newsSource.split("-").join(" ")}</h3>
      </center>

      <div>
         
        {this.state.articles.map((article, index) => (
          <section>
          {!article.urlToImage
          
          ?<h2>Sorry,<br/>Image not found for this news story</h2>
          :<img src={article.urlToImage} className="img-article"></img>
          
          }
          
          <p className="author">{article.source.name} <br/>{cleanDate(article.publishedAt)}</p>
          <p><Link as={`/post/${article.title}`} href={{ pathname: '/post', query: { object: JSON.stringify(article) } }}><a className="titleLink">{limitTitleWordCount(article.title)}</a></Link></p>
        </section>
        ))}
      </div>


        <style jsx>{`
          section{
            
            width: 30%;
            height: 17em;
           
            background-color: #FEFEFE;
            padding: 1em;
            margin 1em;
            margin-left: 4em;
            padding-bottom: 6em;
            float: left;
           
          }

          container{
            margin-left: 10em;
          }
          .author{
            font-style:strong;
            font-size: 0.8em;
          }
          .img-article{
            width: 100%;
          }

          .titleLink{
            font-style:bold;
            font-size: 1.4em;
            text-decoration:none;
            color: #000000;
          }

          a:hover { 
            background-color: yellow;
            text-decoration: underline;
        }
        a { background-color: #FEFEFE; }

        a:visited { 
          background-color: yellow;  
       }
          
        `}</style>
    </div>
  )
  }
  
  static async getInitialProps(response) {

    const initUrl = `https://newsapi.org/v2/top-headlines?sources=${defaultsource}&apiKey=${apiKey}`;

    
    const data = await getNews(initUrl);

    
    if (Array.isArray(data.articles)) {
      return {
        articles: data.articles
      }
    }
    
    else {
      console.error(data)
      if (response) {
        response.statusCode = 400
        response.end(data.message);
      }
    }
  } 

  async componentDidUpdate(prevProps, prevState) {

    if (this.state.url !== prevState.url) {

      const data = await getNews(this.state.url);

      if (Array.isArray(data.articles)) {
        this.state.articles = data.articles;
        this.setState(this.state);
      }
      else {
        console.error("testing")
        console.error(data)
        if (response) {
          response.statusCode = 400
          response.end(data.message);
         }
       }
    }
  } 


}
 

  