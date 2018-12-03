// This is the Link API
import Link from 'next/link';

import fetch from 'isomorphic-unfetch';


const source = 'gb';

const apiKey = 'e1e01a091a654742bea0e01559d5f00b';



const url = `https://newsapi.org/v2/top-headlines?country=${source}&apiKey=${apiKey}`;
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

//cleanDate(5)

// Pass this content as 'props' to child components
const News = props => (
    <div>
      <center>
        <h2>Top uk news</h2>
        
        </center>
        <div>

          {props.articles.map((article, index) => (
            
            
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
          
        `}</style>
    </div>
  );
  
  News.getInitialProps = async function() {


    const res = await fetch(url)
    const data = await res.json()
  
    console.log(`Show data fetched. Count: ${data.articles.length}`)
  
    return {
      articles: data.articles
    }
  }

 

  
  export default News
