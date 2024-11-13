import { useEffect } from "react";
import { FiUploadCloud } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

function Banner() {

  const navigate = useNavigate();

  useEffect(() => {
    const dragArea = document.querySelector(".FileContainer");
    const dragText = document.querySelector(".Instruction");
    const FileButton = document.querySelector(".FileButton");
    const Input = document.querySelector("input");

    const handleDragOver = (event: Event) => {
      event.preventDefault();
      if (dragText) {
        dragText.textContent = "Release to Upload";
      }
    };

    const handleDragLeave = (event: Event) => {
      if (dragText) {
        dragText.textContent = "drag or drop";
      }
    };

    const handleDrop = (event: DragEvent) => {
      event.preventDefault();
      const file = event.dataTransfer?.files[0];
      if (file) {
        displayImage(file);
      }
    };

    const displayImage = (file: File) => {
      const fileType = file?.type;
      const validExtensions = [
        "image/svg",
        "image/png",
        "image/jpg",
        "image/gif",
        "image/jpeg",
      ];
      if (fileType && validExtensions.includes(fileType)) {
        const fileReader = new FileReader();
        fileReader.onload = () => {
          const fileURL = fileReader.result;
          const imgTag = `<img src="${fileURL}" alt=""/>`;
          if (dragArea) {
            dragArea.innerHTML = imgTag;
          }
        };
        fileReader.readAsDataURL(file);
      } else {
        alert("Invalid file type");
      }
    };

    dragArea?.addEventListener("dragover", handleDragOver);

    dragArea?.addEventListener("dragleave", handleDragLeave);

    dragArea?.addEventListener("drop", handleDrop as EventListener);

    FileButton?.addEventListener("click", () => {
      if (Input) {
        Input.click();
      }
    });

    Input?.addEventListener("change", (event) => {
      const input = event.target as HTMLInputElement;
      const file = input.files?.[0];
      if (file) {
        displayImage(file);
      }
    });

    return () => {
      if (dragArea) {
        dragArea.removeEventListener("dragover", handleDragOver);
        dragArea.removeEventListener("dragleave", handleDragLeave);
        dragArea.removeEventListener("drop", handleDrop as EventListener);
      }
    };
  }, []);

  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col md:flex-row bg-slate-50 max-w-[1280px] w-full">
        <div className="max-w-[640px] w-full bg-slate-50 py-5 lg:py-10 px-12">
          <h1 className="text-[29.5px] font-semibold mb-4">Personal Color Analysis</h1>
          <p>
            Our{" "}
            <span className="text-pink-600">
              Al-powered color analysis tool
            </span>{" "}
            helps you discover the colors that enhance your natural beauty,
            match your unique features, and fit your personal style.
            <br />
            <br />
            Upload your photo get instant recommendations for your perfect color
            palette
          </p>
          <div className="FileContainer w-full bg-white rounded flex flex-col justify-center items-center cursor-pointer py-10 mt-3 border-dashed border-2 border-gray-300">
            <FiUploadCloud />
            <input type="file" className="hidden" />
            <p>
              <span className="text-pink-600 FileButton">Click to upload</span>{" "}
              or <span className="Instruction">drag and drop</span>
            </p>
            <p>SVG, PNG, JPG or GIF</p>
          </div>
          <button className="w-full bg-pink-500 text-white p-2 rounded mt-4" onClick={()=>navigate('/selectcolor')}>
            Create your Palette
          </button>
        </div>

        <div className="w-full h-[300px] sm:h-[350px] md:max-w-[640px] md:h-[500px] flex justify-center items-center">
          <img className="object-cover h-full w-full" src="https://img.freepik.com/premium-photo/color-palette-catalogue-with-brush-design-projects_1240525-69515.jpg" alt="" />
        </div>
      </div>
    </div>
  );
}

export default Banner;
