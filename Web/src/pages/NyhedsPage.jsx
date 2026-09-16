import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getArticleData } from "../api/articles";
import NewsSection from "../components/NyhedsSektion";

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
    <>
      <div className="nyheds-page container">
        <h1>{article.title}</h1>
        <p>Forfatter: {article.author}</p>
        <img
          src={`http://localhost:4000${article.imageUrl}`}
          alt={article.title}
        />
        <p>{article.content}</p>
      </div>

      <NewsSection amount={6} />
    </>
  );
}
//det her er virkelig smart!!!! her siger vi amount 6 fordi vi siger vi vil have 6 artikler i vores grid i stedet for de originale 3
//som er på forsiden. så behøver vi ikke at sidde og finjustere grid placering på selve nyhedskortene.
export default NyhedsPage;
