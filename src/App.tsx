import { apiKey } from "@/../secret/apiKey";
import "@/App.css";
import axios from "axios";
import { useState } from "react";

type Response = {
  data: { articles: Articles };
};

type Article = {
  author: string | null;
  content: string | null;
  description: string | null;
  publishedAt: string | null;
  source: { id: string; name: string } | null;
  title: string | null;
  url: string | null;
  urlToImage: string | null;
  showDescription?: boolean;
};
type Articles = Article[] | null;

const defaultArticles: Articles = null;

function App() {
  const [count, setCount] = useState(0);
  const [articles, setArticles] = useState(defaultArticles);

  const request = async () => {
    const url =
      "https://newsapi.org/v2/top-headlines?" +
      "country=us&" +
      `apiKey=${apiKey}`;
    const res = await axios.request<Response, Response>({ method: "get", url });
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
      <ul>
        {articles &&
          articles.map(article => (
            <li>
              <button onClick={() => showDescription(article)}>
                {article.title}
              </button>
              <div>{article.showDescription && article.description}</div>
            </li>
          ))}
      </ul>
      <div className="card">
        <button onClick={() => setCount(count => count + 1)}>
          count is {count}
        </button>
        <button onClick={() => request()}>fetch</button>
      </div>
    </div>
  );
}

export default App;
