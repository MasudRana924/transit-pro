import PopularCompanies from "../../components/home/PopularCompanies";
import TopRoutes from "../../components/home/TopRoutes";
import WhyChooseUs from "../../components/home/WhyChooseUs";
import SearchBuses from "../Bus/SearchBuses";

const Home = () => {
  return (
    <div className="w-full">
      <SearchBuses/>
      <TopRoutes/>
      <PopularCompanies/>
      <WhyChooseUs/>
    </div>
  );
};

export default Home;