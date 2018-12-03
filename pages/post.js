import {withRouter} from 'next/router'


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
function Page({ router: { query } }) {
    const objectContent = JSON.parse(query.object);
    return(
    <div>       
    <section>
    <h1>{objectContent.title}</h1>
    <img src={objectContent.urlToImage} alt="article image" className="img-article"></img>
    
      <p className="contentDesc">{objectContent.description}</p>
      <p>{objectContent.content} <a href={objectContent.url}target="_blank">Read the full article at {objectContent.source.name}</a></p>
        <p className="author">{cleanDate(objectContent.publishedAt)}<br/>Source: {objectContent.source.name}</p>

        </section>

        <style jsx>{`
        
          section{
            width: 100%;
            background-color: #FAFAFA;
            text-align: center;
            padding-top: 2em;
          }
          .author{
            font-style:strong;
            font-size: 0.8em;
            
          }
          .img-article{
            width: 30%;
          }
          
          .contentDesc{
            font-weight:bold;
          }
          
        `}</style>

    </div>

    
    
)
    };

   
export default withRouter(Page);