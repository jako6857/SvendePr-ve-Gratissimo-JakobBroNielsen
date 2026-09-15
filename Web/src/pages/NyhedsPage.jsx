import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getArticleData } from "../api/articles";

function NyhedsPage() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    getArticleData("articles").then((data) => {
      const found = data.find((article) => article.id === Number(id));
      setArticle(found);
    });
  }, [id]);

  if (!article) return <p>Indlæser...</p>;

  return (
    <div className="nyheds-page">
      <h1>{article.title}</h1>
      <p>Forfatter: {article.author}</p>
      <img
        src={`http://localhost:4000${article.imageUrl}`}
        alt={article.title}
      />
      <p>{article.content}</p>
    </div>
  );
}

export default NyhedsPage;
