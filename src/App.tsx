import "@/App.css";
import { Article, Articles, defaultArticles } from "@/model/Articles";
import axios from "axios";
import { useState } from "react";

type Response = {
  data: {
    status: string;
    totalResults: number;
    articles: Articles;
  };
};

function App() {
  const [count, setCount] = useState(0);
  const [articles, setArticles] = useState(defaultArticles);

  const request = async () => {
    // const url =
    //   "https://newsapi.org/v2/top-headlines?" +
    //   "country=us&" +
    //   `apiKey=${apiKey}`;
    const url = "https://quiet-ocean-29539.herokuapp.com/";
    // const url = "http://localhost:8080";
    const res = await axios.request<Response, Response>({
      method: "get",
      url,
      // headers: {
      //   "Content-Type": "application/json;charset=UTF-8",
      //   "Access-Control-Allow-Origin": "*", // Could work and fix the previous problem, but not in all APIs
      // },
    });
    console.log("res ", res);
    const articles = res.data.articles;
    console.log("res ", articles);
    setArticles(articles);
  };

  const showDescription = (arti: Article) => {
    const newArticle = articles?.map(article =>
      article.title === arti.title
        ? {
            ...arti,
            description: article.description ?? "no description",
            showDescription: !article.showDescription,
          }
        : article
    );
    setArticles(newArticle ?? null);
  };

  return (
    <div className="App">
      <h1>News List</h1>
      <div className="card">
        <button onClick={() => setCount(count => count + 1)}>
          count is {count}
        </button>
        <button onClick={() => request()}>fetch</button>
      </div>
      <ul>
        {articles &&
          articles.map(article => (
            <li key={article.url}>
              <button onClick={() => showDescription(article)}>
                {article.title}
              </button>
              <div>{article.showDescription && article.description}</div>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default App;
