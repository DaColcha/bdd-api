import "./navbar.scss";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="logo">
        
        <span>GLOB GUSTER</span>
      </div>
      <div className="icons">
        <div className="user">
          <img
            src="https://images.pexels.com/photos/11038549/pexels-photo-11038549.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load"
            alt=""
          />
          <span>Alejandra Colcha</span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
