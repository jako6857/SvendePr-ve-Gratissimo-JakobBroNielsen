import { getTestimonialsData } from "../api/testimonials";
import { useEffect, useState } from "react";
import "../scss/Testimonials.scss";

function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  useEffect(() => {
    getTestimonialsData("testimony")
      .then((data) => setTestimonials(data))
      .catch((error) =>
        console.error("Fejl ved hentning af testimonials:", error),
      );
  }, []);

  useEffect(() => {
    if (testimonials.length <= 1) return; // Hvis der kun er en testimonial, skal vi ikke ændre activeIndex

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    //vores timer som automatik skifter testimonial hvert 5 sekund.

    //retunerer et helt clean interval på timeren samme med længden, så den altid ved hvor langt i processen den er.
    return () => clearInterval(timer);
  }, [testimonials.length]);

  if (testimonials.length === 0) return null;

  const current = testimonials[activeIndex];

  //her retunerer vi bare vores view med det data vi kan få fra vores api tilhørende testimonials :) fx. current.title...
  return (
    <section className="testimonials container">
      <div className="testimonial">
        <h2 className="testimonials-title">{current.title}</h2>
        <article className="testimonials-content">{current.content}</article>
        <p className="testimonials-name"> {current.name}</p>
      </div>

      <div className="testimonials-dots">
        {testimonials.map((t, index) => (
          <button
            key={t.id}
            className={index === activeIndex ? "active" : ""}
            onClick={() => setActiveIndex(index)}
          />
        ))}
      </div>
    </section>
  );
}

export default Testimonials;
