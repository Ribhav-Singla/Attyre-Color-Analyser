import Banner from "@/custom_components/Banner";
import FeatureCard from "@/custom_components/FeatureCard";
import { Features } from "@/Data";

function Homepage() {
  return (
    <>
      <Banner />
      <div className="mt-16 flex flex-col justify-center items-center mx-5 xl:mx-0">
        <div className="max-w-[640px] w-full text-center">
          <h1 className="text-pink-600 mt-1 text-lg">Our capabilities</h1>
          <h1 className="text-3xl font-bold mt-1">
            Why Use Our Color Analysis Tool?
          </h1>
          <p className="mt-2">
            Your personal color palette is more than just a range of shades;
            it's a path to feeling confident, radiant, and truly yourself. Our
            advanced color analysis tool reveals colors that harmonize with your
            unique skin tone, eye color, and hair color, making it easier to
            choose tones that enhance your natural beauty.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-12 gap-5 md:gap-10 mb-10">
          {Features.map((item) => {
            return (
              <div className="grid col-span-12 sm:col-span-6 lg:col-span-4">
                <FeatureCard
                  heading={item.heading}
                  description={item.description}
                />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Homepage;