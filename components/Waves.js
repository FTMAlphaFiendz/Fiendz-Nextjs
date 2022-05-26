const Waves = ({ fillColor, className }) => {
  return (
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        className={`${!className ? "editorial" : className}`}
        preserveAspectRatio="none"
        viewBox="0 24 150 28"
      >
        <defs>
          <path
            id="gentle-wave"
            d="M-160 44c30 0 58-18 88-18s58 18 88 18 58-18 88-18 58 18 88 18v44h-352z"
          ></path>
        </defs>
        <g className="parallax1">
          <use x="50" y="3" fill={fillColor} xlinkHref="#gentle-wave"></use>
        </g>
        <g className="parallax2">
          <use x="50" y="9" fill={fillColor} xlinkHref="#gentle-wave"></use>
        </g>
        <g className="parallax3">
          <use x="50" y="6" fill={fillColor} xlinkHref="#gentle-wave"></use>
        </g>
      </svg>
    </div>
  );
};

export default Waves;
