const MainButton = ({ link, text, icon, closeModal }) => {
  return (
    <button
      className={`link-button bg-white p-3 font-freckle w-150 text-center flex items-center justify-center text-border m-2 button-border px-3`}
      onClick={() => {
        if (link) {
          window.open(link);
        }
        if (closeModal) {
          closeModal();
        }
      }}
    >
      {icon && <span className="text-2xl mr-1 button-text">{icon}</span>}
      <span className="button-text">{text}</span>
    </button>
  );
};

export default MainButton;
