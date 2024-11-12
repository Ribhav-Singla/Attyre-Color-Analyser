import { RiServiceLine } from "react-icons/ri";

function FeatureCard({
  heading,
  description,
}: {
  heading: String;
  description: String;
}) {
  return (
    <div className="max-w-xs flex flex-col justify-center items-center p-2 py-3">
      {/* icon link can also be provided */}
      <RiServiceLine size={25} className="text-pink-500" />
      <p className="text-center font-bold mt-1">{heading}</p>
      <p className="text-center mt-1">{description}</p>
    </div>
  );
}

export default FeatureCard;
