import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { BsSunFill, BsFillMoonFill } from "react-icons/bs";
import Link from "next/link";

const links = [
  { text: "Home", link: "/" },
  { text: "About", link: "/about" },
  { text: "Projects", link: "/projects" },
];

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  const switchTheme = () => {
    if (isMounted) {
      setTheme(theme === "light" ? "dark" : "light");
    }
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <nav className="flex justify-center justify-between items-center bg-transparent text-white w-screen min-h-12 h-12 px-5 md:px-20 shadow-xl">
      <ul>
        {links.map((link, i) => {
          return (
            <Link href={`${link.link}`}>
              <li className="inline-block px-2 cursor-pointer">{link.text}</li>
            </Link>
          );
        })}
      </ul>
      <ThemeButton theme={theme} switchTheme={switchTheme} />
    </nav>
  );
};

const ThemeButton = ({ theme, switchTheme }) => {
  if (theme === "dark") {
    return (
      <button
        onClick={switchTheme}
        className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mx-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
      >
        <BsSunFill />
      </button>
    );
  } else {
    return (
      <button
        onClick={switchTheme}
        className="text-white bg-lightPrimary hover:bg-lightAccent focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mx-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
      >
        <BsFillMoonFill />
      </button>
    );
  }
};

export default Navbar;
