const MainButton = ({ link, text, icon }) => {
  return (
    <button
      className={`link-button bg-white p-3 font-freckle w-150 text-center flex items-center justify-center text-border m-2 button-border px-5`}
      onClick={() => {
        if (!link) return;
        window.open(link);
      }}
    >
      {icon && <span className="text-2xl mr-1 button-text">{icon}</span>}
      <span className="button-text">{text}</span>
    </button>
  );
};

export default MainButton;
