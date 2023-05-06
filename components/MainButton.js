import { motion } from "framer-motion";

const MainButton = ({ link, text, icon, closeModal }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className={`link-button bg-white p-3 font-freckle w-[150px] text-center flex items-center justify-center text-border m-2 button-border px-3`}
      onClick={() => {
        if (link) {
          window.open(link);
        }
        if (closeModal) {
          closeModal();
        }
      }}
    >
      {icon && <span className="text-2xl mr-1">{icon}</span>}
      <span className="">{text}</span>
    </motion.button>
  );
};

export default MainButton;
