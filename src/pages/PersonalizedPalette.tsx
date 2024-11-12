import ColorCard from "@/custom_components/ColorCard";

function PersonalizedPalette() {
  return (
    <div>
      <h1 className="text-2xl font-semibold">Your Personalized Palette</h1>
      <br />
      <h1 className="text-pink-600 text-xl font-semibold">Autumn Harmony</h1>
      <p className="mt-3 text-gray-700">
        "A warm, earthy palette that complements the skin's warm undertones,
        emphasizes the depth of darker hair, and enhances the richness of brown
        eyes. This palette is perfect for a classic yet modern look, capturing
        the essence of autumn.
      </p>
      <br />
      <h1 className="text-lg font-semibold">Recommended Colors</h1>
      <div className="mt-2 grid grid-cols-12 gap-y-5">
        <div className="grid col-span-2">
            <ColorCard/>
        </div>
      </div>
      <br />
      <h1 className="text-lg font-semibold mt-5">Colors to Avoid</h1>
      <div className="mt-2 grid grid-cols-12 gap-y-5 mb-10">
        <div className="grid col-span-2">
            <ColorCard/>
        </div>
      </div>
    </div>
  );
}

export default PersonalizedPalette;
