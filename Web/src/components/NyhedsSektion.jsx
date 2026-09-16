import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getArticleData } from "../api/articles";
import "../scss/NewsSection.scss";

//vores funtion til at hente 3 tilfældige artikler fra vores api
//samt bruger vi ... (spread Operator) for at lave en kopi af arrayet, så vi ikke ændrer på det originale array
//og slice gør bare at vi tage de første 3 elemter fra det array vi lige har blandet

function getRandomAmount(articles, amount) {
  const shuffled = [...articles].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, amount);
}

function formatDate(dateString) {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.getMonth() + 1; //+1 fordi getMonth() returnere 0-11
  return `d. ${day}/${month}`; //vi bruger `` fordi det er en string hvor vi skal bruge variabler
}
function NewsSection({ amount = 3 }) {
  const [featuredArticles, setFeaturedArticles] = useState([]);

  useEffect(() => {
    //getArticleData henter vi fra api/articles.js, hvor vi har logikken til at hente de oprigtige artikler fra api.
    getArticleData("articles").then((data) => {
      setFeaturedArticles(getRandomAmount(data, amount));
      console.log(amount);
    });
  }, []);

  return (
    <section className="news-section ">
      <div className="news-container container">
        <h2>Udvalgte Nyheder</h2>
        <div className="news-grid">
          {featuredArticles.map((article) => (
            <Link
              to={`/nyheder/${article.id}`}
              key={article.id}
              className="news-card"
            >
              <img
                src={`http://localhost:4000${article.imageUrl}`}
                alt={article.title}
              />
              <p className="news-meta">
                {formatDate(article.createdAt)} - {article.author}
              </p>
              <p className="news-title">{article.title}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default NewsSection;
