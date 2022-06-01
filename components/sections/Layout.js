import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <>
      <div className="flex flex-col">
        <Navbar />
        <main>{children}</main>
      </div>
    </>
  );
};

export default Layout;
