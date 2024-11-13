import ColorCard from "@/custom_components/ColorCard";
import Spinner from "@/custom_components/Spinner";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface COLORCARD {
  color_name: string;
  hex_code: string;
  usage: string;
  description: string;
}

interface PALETTEDATA {
  palette_Name: string;
  palette_Description: string;
  recommended_colors: COLORCARD[];
  colors_to_avoid: COLORCARD[];
}

function PersonalizedPalette() {
  const [paletteData, setPaletteData] = useState<PALETTEDATA | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedData = localStorage.getItem("paletteData");
    if (storedData) {
      try {
        const parsedData: PALETTEDATA = JSON.parse(storedData);
        setPaletteData(parsedData);
        setLoading(false);
      } catch (error) {
        console.error("Error parsing palette data", error);
      }
    }
  }, []);

  if (!paletteData || loading) {
    return (
      <div className="flex justify-center items-center h-[100vh]">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="mt-5 mx-5 xl:mx-0">
      <h1 className="text-2xl font-semibold">Your Personalized Palette</h1>
      <br />
      <h1 className="text-[#F63D68] text-xl font-semibold">
        {paletteData.palette_Name}
      </h1>
      <p className="mt-3 text-gray-700">{paletteData.palette_Description}</p>
      <br />
      <h1 className="text-lg font-semibold">Recommended Colors</h1>
      <div className="mt-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-y-5 PaletteContainer">
        {paletteData.recommended_colors.map((obj: COLORCARD,idx) => {
          return (
            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
                transition: {
                  delay: 0.5,
                },
              }}
              className="grid col-span-1"
              key={idx}
            >
              <ColorCard
                color_name={obj.color_name}
                hex_code={obj.hex_code}
                usage={obj.usage}
                description={obj.description}
              />
            </motion.div>
          );
        })}
      </div>
      <br />
      <h1 className="text-lg font-semibold mt-5">Colors to Avoid</h1>
      <div className="mt-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-y-5 mb-10 PaletteContainer">
        {paletteData.colors_to_avoid.map((obj: COLORCARD,idx) => {
          return (
            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
                transition: {
                  delay: 0.5,
                },
              }}
              className="grid col-span-1"
              key={idx}
            >
              <ColorCard
                color_name={obj.color_name}
                hex_code={obj.hex_code}
                usage={obj.usage}
                description={obj.description}
              />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export default PersonalizedPalette;
