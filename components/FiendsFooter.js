const FiendsFooter = () => {
  const images = [
    "/images/fiendz/fiend-1.png",
    "/images/fiendz/fiend-2.png",
    "/images/fiendz/fiend-3.png",
    "/images/fiendz/fiend-4.png",
    "/images/fiendz/fiend-5.png",
  ];
  const lastImageIdx = images.length - 1;
  return (
    <div className="flex space-between absolute bottom-0 fiendz-f">
      {images.map((image, i) => {
        return (
          <div
            key={i}
            className={`${i === 1 && "hidden md:block"} ${
              i === lastImageIdx && "hidden md:block"
            }`}
          >
            <img src={image} alt={image} />
          </div>
        );
      })}
    </div>
  );
};

export default FiendsFooter;
