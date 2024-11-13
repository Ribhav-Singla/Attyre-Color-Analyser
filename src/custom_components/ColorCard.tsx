function ColorCard({
  color_name,
  hex_code,
  usage,
  description,
}: {
  color_name: string;
  hex_code: string;
  usage: string;
  description: string;
}) {
  return (
    <div className="w-[140px] md:w-[160px] lg:w-[180px]">
      <div
        className="w-[140px] h-[160px] md:w-[160px] md:h-[160px] lg:w-[180px] lg:h-[180px] rounded"
        style={{ backgroundColor: hex_code }}
      ></div>
      <h1 className="font-semibold">{color_name}</h1>
      <p className="font-normal">{usage}</p>
      <p className="font-light">{description}</p>
    </div>
  );
}

export default ColorCard;
