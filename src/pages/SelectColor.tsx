import { AdvancedPreferences } from "@/Data";
import { Badge } from "@/components/ui/badge";
import Spinner from "@/custom_components/Spinner";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function SelectColor() {
  const navigate = useNavigate();
  const ImageURL = localStorage.getItem("ImageURL") || "";

  const [AdvancedPreferencesOptions, setAdvancedPreferencesOptions] = useState({
    colorIntensity: "",
    seasonalPreferences: "",
    occasionPreferences: "",
    personalStyle: "",
  });
  const [selectedOptions, setSelectedOptions] = useState({
    skin: "#f5d6c6",
    hair: "#5a3e2b",
    eye: "#4682b4",
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
    const SkinButton = document.querySelector("#SkinButton");
    const HairButton = document.querySelector("#HairButton");
    const EyeButton = document.querySelector("#EyeButton");
    const Image = document.querySelector("img");

    const offscreenCanvas = document.createElement("canvas");
    const offscreenCtx = offscreenCanvas.getContext("2d");

    let currentSelection: string = "eye";

    if (Image) {
      Image.onload = () => {
        offscreenCanvas.width = Image.width;
        offscreenCanvas.height = Image.height;
        if (offscreenCtx) {
          offscreenCtx.drawImage(Image, 0, 0, Image.width, Image.height);
        }
      };

      Image.addEventListener("click", (event) => {
        const rect = Image.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        if (offscreenCtx) {
          const pixelData = offscreenCtx.getImageData(x, y, 1, 1).data;
          const colorHex = `#${(
            (1 << 24) +
            (pixelData[0] << 16) +
            (pixelData[1] << 8) +
            pixelData[2]
          )
            .toString(16)
            .slice(1)
            .toUpperCase()}`;

          setSelectedOptions((prev) => ({
            ...prev,
            [currentSelection]: colorHex,
          }));
        }
      });
    }

    const pickColor = (type: string) => {
      currentSelection = type;
      if (Image && Image.complete && Image.naturalHeight !== 0) {
        //@ts-ignore
        Image.onload();
      }
    };

    if (EyeButton) {
      EyeButton.addEventListener("click", () => pickColor("eye"));
    }
    if (HairButton) {
      HairButton.addEventListener("click", () => pickColor("hair"));
    }
    if (SkinButton) {
      SkinButton.addEventListener("click", () => pickColor("skin"));
    }

    return () => {
      if (EyeButton) {
        EyeButton.removeEventListener("click", () => pickColor("eye"));
      }
      if (HairButton) {
        HairButton.removeEventListener("click", () => pickColor("hair"));
      }
      if (SkinButton) {
        SkinButton.removeEventListener("click", () => pickColor("skin"));
      }
    };
  }, []);

  const handleGeneratePalette = async () => {
    // checking that eye, hair and eye have colors before calling the api
    if (
      !selectedOptions["skin"] ||
      !selectedOptions["hair"] ||
      !selectedOptions["eye"]
    ) {
      alert("Please the color");
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}`, {
        skin: selectedOptions["skin"],
        hair: selectedOptions["hair"],
        eye: selectedOptions["eye"],
        AdvancedPreferencesOptions,
      });
      if (response && response.data && response.data.JSONRESPONSE)
        localStorage.setItem(
          "paletteData",
          JSON.stringify(response.data.JSONRESPONSE)
        );
      navigate("/palette");
    } catch (error) {
      console.log("error occured while generating the palette: ", error);
    }
  };

  if (!ImageURL) {
    return (
      <div className="flex justify-center items-center h-[100vh]">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="mt-5 mb-5">
      <div className="mx-5 xl:mx-0">
        <h1 className="font-semibold text-2xl">Select Your Colors</h1>
        <p className="mt-2 text-gray-700">
          Use the color picker tool to identify your hair, skin, and eye colors.
          For hair and skin, choose the primary tones without focusing on
          highlights or shadows. For eyes, select the most prominent color,
          typically found in the center of the iris.
        </p>
        <div className="mt-5 flex justify-center items-center gap-5 md:gap-10">
          <div className="max-w-[300px] h-[300px] sm:max-w-[400px] sm:h-[400px] md:max-w-[500px] md:h-[450px] w-full bg-slate-100 flex justify-center items-center">
            <img
              className="object-contain h-full w-full cursor-crosshair"
              src={ImageURL}
              alt=""
            />
          </div>
          <div className="flex flex-col justify-center items-center gap-5">
            <div className="flex flex-col gap-1 justify-center items-center">
              <div
                className="h-12 w-12 rounded-full cursor-pointer"
                style={{
                  backgroundColor:
                    selectedOptions["skin" as keyof typeof selectedOptions],
                }}
                id="SkinButton"
              ></div>
              <div className="flex flex-col justify-center items-center">
                <h1>Skin</h1>
                <p className="text-xs font-semibold">
                  {selectedOptions["skin" as keyof typeof selectedOptions]}
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-1 justify-center items-center">
              <div
                className="h-12 w-12 rounded-full cursor-pointer"
                style={{
                  backgroundColor:
                    selectedOptions["hair" as keyof typeof selectedOptions],
                }}
                id="HairButton"
              ></div>
              <div className="flex flex-col justify-center items-center">
                <h1>Hair</h1>
                <p className="text-xs font-semibold">
                  {selectedOptions["hair" as keyof typeof selectedOptions]}
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-1 justify-center items-center">
              <div
                className="h-12 w-12 rounded-full cursor-pointer"
                style={{
                  backgroundColor:
                    selectedOptions["eye" as keyof typeof selectedOptions],
                }}
                id="EyeButton"
              ></div>
              <div className="flex flex-col justify-center items-center">
                <h1>Eye</h1>
                <p className="text-xs font-semibold">
                  {selectedOptions["eye" as keyof typeof selectedOptions]}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <button
            className="bg-[#F63D68] text-white p-2 rounded mt-10 max-w-sm w-full"
            onClick={handleGeneratePalette}
          >
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
            <div className="mt-5" key={item.name}>
              <h1 className="text-lg font-semibold">{item.label}</h1>
              <p className="text-gray-700 mb-1">{item.description}</p>
              <hr />
              <div className="mt-2 flex flex-wrap justify-start items-start gap-3">
                {item.options.map((opt, idx) => {
                  return (
                    <Badge
                      key={idx}
                      variant="secondary"
                      className={`p-2 text-sm rounded-2xl cursor-pointer select-none ${
                        AdvancedPreferencesOptions[
                          item.name as keyof typeof AdvancedPreferencesOptions
                        ] === opt
                          ? `bg-pink-100 outline outline-2 outline-pink-200 text-[#F63D68]`
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
          <button
            className="bg-[#F63D68] text-white p-2 rounded mt-10 max-w-sm w-full"
            onClick={handleGeneratePalette}
          >
            Generate Palette
          </button>
        </div>
      </div>
    </div>
  );
}

export default SelectColor;
