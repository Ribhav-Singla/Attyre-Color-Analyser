import { AdvancedPreferences } from "@/Data";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";


function SelectColor() {
  const [AdvancedPreferencesOptions, setAdvancedPreferencesOptions] = useState({
    colorIntensity: "",
    seasonalPreferences: "",
    occasionPreferences: "",
    personalStyle: "",
  });

  const handleAdvancedPreferenceOption = (name: string, option: string) => {
    if (
      AdvancedPreferencesOptions[
        name as keyof typeof AdvancedPreferencesOptions
      ] === option
    ) {
      setAdvancedPreferencesOptions((prev) => ({ ...prev, [name]: "" }));
    } else {
      setAdvancedPreferencesOptions((prevState) => ({
        ...prevState,
        [name]: option,
      }));
    }
  };

  useEffect(() => {
    const EyeButton = document.querySelector("#EyeButton");
    const pickColor = ()=>{
      
    }

    if (EyeButton) {
      EyeButton.addEventListener("click", pickColor);
    }
    return () => {
      if (EyeButton) {
        EyeButton.removeEventListener("click", pickColor);
      }
    };
  }, []);

  return (
    <div className="mt-5 mb-5">
      <div className="mx-5 xl:mx-0">
        <h1 className="font-semibold text-2xl">Select Your Colors</h1>
        <p className="mt-2 text-gray-700">
          Use the color picker tool to identify your hair, skin, and eye colors.
          For hair and skin, choose the primary tones without focusing on
          highlights or shadows. For eyes, select the most prominent color,
          typically found in the center of the iris.
        </p>
        <div className="mt-5 flex justify-center items-center gap-5 md:gap-10">
          <div className="max-w-[300px] h-[300px] sm:max-w-[400px] sm:h-[400px] md:max-w-[500px] md:h-[450px] w-full bg-slate-100 flex justify-center items-center">
            <img
              className="object-cover h-full w-full"
              src="https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp"
              alt=""
            />
            {/* <p>Image</p> */}
          </div>
          <div className="flex flex-col justify-center items-center gap-5">
            <div className="flex flex-col gap-1 justify-center items-center">
              <div
                className="h-12 w-12 bg-green-600 rounded-full cursor-pointer"
                id="EyeButton"
              ></div>
              <h1>Skin</h1>
            </div>
            <div className="flex flex-col gap-1 justify-center items-center">
              <div
                className="h-12 w-12 bg-pink-600 rounded-full cursor-pointer"
                id="HairButton"
              ></div>
              <h1>Hair</h1>
            </div>
            <div className="flex flex-col gap-1 justify-center items-center">
              <div
                className="h-12 w-12 bg-red-600 rounded-full cursor-pointer"
                id="EyeButton"
              ></div>
              <h1>Eye</h1>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <button className="bg-pink-500 text-white p-2 rounded mt-10 max-w-sm w-full">
            Generate Palette
          </button>
        </div>
      </div>
      <br />
      <br />
      <div className="mx-5 xl:mx-0">
        <h1 className="font-semibold text-xl md:text-2xl mb-5">
          Advanced Preferences - Optional
        </h1>
        {AdvancedPreferences.map((item) => {
          return (
            <div className="mt-5">
              <h1 className="text-lg font-semibold">{item.label}</h1>
              <p className="text-gray-700 mb-1">{item.description}</p>
              <hr />
              <div className="mt-2 flex flex-wrap justify-start items-start gap-3">
                {item.options.map((opt) => {
                  return (
                    <Badge
                      variant="secondary"
                      className={`p-2 text-sm rounded-2xl cursor-pointer select-none ${
                        AdvancedPreferencesOptions[
                          item.name as keyof typeof AdvancedPreferencesOptions
                        ] === opt
                          ? `bg-pink-100 outline outline-2 outline-pink-200 text-pink-600`
                          : `text-gray-700`
                      }`}
                      onClick={() => {
                        handleAdvancedPreferenceOption(item.name, opt);
                      }}
                    >
                      {opt}
                    </Badge>
                  );
                })}
              </div>
            </div>
          );
        })}
        <div className="flex justify-center items-center">
          <button className="bg-pink-500 text-white p-2 rounded mt-10 max-w-sm w-full">
            Generate Palette
          </button>
        </div>
      </div>
    </div>
  );
}

export default SelectColor;
