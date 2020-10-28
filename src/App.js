import React, { useState, useEffect } from "react";
import "./App.css";
import Article from "./Article";
import ArticleForm from "./ArticleForm";

function App() {
  const [articles, setArticles] = useState([]);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(1)

  useEffect(() => {
    console.log("articlelist changed!");
  }, [articles]);

  useEffect(() => {
    fetch("https://hn.algolia.com/api/v1/search?query=penguins")
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        const newArticles = response.hits
          .map((result) => ({
            created_at: result.created_at,
            author: result.author,
            text: result.title,
            url: result.url,
            num_comments: result.num_comments,
            isCompleted: false,
          }))
          .sort((a, b) => (a.num_comments > b.num_comments ? -1 : 1));
        setArticles(newArticles);
        setQuery(response.query);
      });
  }, []);

  const expandArticle = (index) => {
    setSelectedIndex(index);
  }

  const addArticle = (text) => {
    const newArticles = [...articles, { text }];
    setArticles(newArticles);
  };

  const completeArticle = (index) => {
    const newArticles = [...articles];
    newArticles[index].isCompleted = !newArticles[index].isCompleted;
    setArticles(newArticles);
  };

  const removeArticle = (index) => {
    const newArticles = [...articles];
    newArticles.splice(index, 1);
    setArticles(newArticles);
  };

  return (
    <div className="app">
      <div className="article-list">
        <h1>{query}</h1>
        {articles.map((article, index) => (
          <Article
            expand={expandArticle}
            key={index}
            selectedIndex = {selectedIndex}
            index={index}
            article={article}
            completeArticle={completeArticle}
            removeArticle={removeArticle}
          />
        ))}
        <ArticleForm addArticle={addArticle} />
      </div>
    </div>
  );
}

export default App;
