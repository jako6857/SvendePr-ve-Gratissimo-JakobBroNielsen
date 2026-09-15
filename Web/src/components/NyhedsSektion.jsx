import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getArticleData } from "../api/articles";

//vores funtion til at hente 3 tilfældige artikler fra vores api
//samt bruger vi ... (spread Operator) for at lave en kopi af arrayet, så vi ikke ændrer på det originale array
//og slice gør bare at vi tage de første 3 elemter fra det array vi lige har blandet
function getRandomThree(articles) {
  const shuffled = [...articles].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 3);
}

function NewsSection() {
  const [featuredArticles, setFeaturedArticles] = useState([]);

  useEffect(() => {
    //getArticleData henter vi fra api/articles.js, hvor vi har logikken til at hente de oprigtige artikler fra api.
    getArticleData("articles").then((data) => {
      setFeaturedArticles(getRandomThree(data));
    });
  }, []);

  return (
    <section className="news-section">
      <h2>Udvalgte Nyheder</h2>

      <div className="news-grid">
        {featuredArticles.map((article) => (
          <Link
            to={`/nyheder/${article.id}`}
            key={article.id}
            className="news-card"
          >
            <img src={article.imageUrl} alt={article.title} />
            <p className="news-meta">{article.author}</p>
            <h3>{article.title}</h3>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default NewsSection;
