import Image from "next/image";
import Searchbar from "../components/Searchbar";
import HeroCarousel from "../components/HeroCarousel";
import { getAllProducts } from "@/lib/actions/index";
import ProductCard from "@/components/ProductCard";
const Home = async () => {
  const allProducts = await getAllProducts();

  return (
    <>
      <section className=" px-6 md:px-20 py-24 border-2 border-red-500 ">
        <div className="flex max-xl:flex-col gap-16">
          <div className="flex flex-col justify-center">
            <p className="small-text">
              Smart Shopping Begins Here Frugal Fox
              <Image
                src="/assets/icons/arrow-right.svg"
                alt="arrow-right"
                width={16}
                height={16}
              />
            </p>
            <h1 className="head-text">
              Unleash the Power of{" "}
              <span className="text-primary">Frugal Fox</span>
            </h1>
            <p className="mt-6">
              Seamlessly track and analyze the best deals on your favorite
              products as our intuitive system keeps an eye on price changes
              across a variety of sources.
            </p>
            <Searchbar />
          </div>
          <HeroCarousel />
        </div>
      </section>

      <section className="trending-section">
        <h2 className="section-text">Trending</h2>

        <div className="flex flex-wrap gap-x-8 gap-y-16">
          {allProducts?.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </section>
    </>
  );
};

export default Home;
