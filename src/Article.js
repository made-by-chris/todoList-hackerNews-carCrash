import React, {useEffect} from "react"




function MoreInfo({article}) {
  useEffect(()=>{
    console.log(article)
  },[])
  return (
    <div className="moreInfo" >
      <p>link: <a target="_blank" href={article.url}>{article.text}</a></p>
      <p>created_at: {article.created_at}</p>
      <p>author: {article.author}</p>
    </div>
  )
}

export default function Article({ article, selectedIndex, index, completeArticle, removeArticle, expand }) {
  return (
    <div
      className="article"
      style={{ textDecoration: article

.isCompleted ? "line-through" : "" }}
    >
      {article.num_comments}
      {article.text}
      <div>
        {selectedIndex === index ? <MoreInfo article={article}/> : ""}
        <button onClick={() => completeArticle(index)}>finished reading</button>
        <button onClick={() => expand(index)}>More Info</button>
        <button onClick={() => removeArticle(index)}>x</button>
      </div>
    </div>
  );
}
