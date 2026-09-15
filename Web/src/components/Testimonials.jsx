import { getTestimonialsData } from "../api/testimonials";
import { useEffect, useState } from "react";

function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
  useEffect(() => {
    getTestimonialsData("testimonials")
      .then((data) => setTestimonials(data))
      .catch((error) =>
        console.error("Fejl ved hentning af testimonials:", error),
      );
  }, []);

  return (
    <section className="testimonials">
      <div className="testimonials-container">
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="testimonial">
            <h2>{testimonial.title}</h2>
            <p>{testimonial.text}</p>
            <p>- {testimonial.author}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Testimonials;
