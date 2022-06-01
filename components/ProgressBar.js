const ProgressBar = ({ completed }) => {
  const fillerStyles = {
    width: `${completed}%`,
  };

  return (
    <div className="progress-bar-container bg-purple w-10/12 md:w-8/12 rounded-2xl">
      <div
        style={fillerStyles}
        className="h-full progress-bar-filler rounded-xl"
      >
        <span className="progress-animation">{`${completed}%`}</span>
      </div>
    </div>
  );
};

export default ProgressBar;
