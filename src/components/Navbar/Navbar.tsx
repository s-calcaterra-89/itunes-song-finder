import "./Navbar.css";

const Navbar = ({ pageTitle }: { pageTitle: string }) => {
  return (
    <div className="page-title-wrapper">
      <h1 className="page-title">{pageTitle}</h1>
    </div>
  );
};

export default Navbar;
