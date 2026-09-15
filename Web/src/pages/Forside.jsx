import SearchBar from "../components/SearchBar";
import CategoryGrid from "../components/CategoryGrid";
import NewsSection from "../components/NyhedsSektion";
import Testimonials from "../components/Testimonials";

function Forside() {
  return (
    <>
      <SearchBar />
      <CategoryGrid />
      <NewsSection />
      <Testimonials />
    </>
  );
}

export default Forside;
