import Image from "next/image";
const Navbar = ({ obj }) => {
  return (
    <div className="navbar">
      <h1 className="navh1">Edvora</h1>
      <div className="navdiv">
        <h1 className="navdivh1">{obj.name}</h1>
        <div>
          <Image
            src={obj.url ? obj.url : "https://picsum.photos/536/354"}
            width="50"
            height="50"
            className="navimg"
          ></Image>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
