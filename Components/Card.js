import Image from "next/image";

const Card = ({ obj1 }) => {
  let arr = "[";

  for (let b of obj1.station_path) {
    arr = arr + b + ", ";
  }
  arr = arr.substring(0, arr.length - 2) + "]";

  return (
    <div className="card">
      <div className="card1">
        <div className="card11">
          <Image
            src={obj1.map_url ? obj1.map_url : "https://picsum.photos/536/354"}
            width="296"
            height="148"
          ></Image>
        </div>
        <div className="card12">
          <div className="carddiv">
            <h3 className="cardh3">Ride Id : </h3>
            <h3 className="cardh3">{obj1.id}</h3>
          </div>
          <div className="carddiv">
            <h3 className="cardh3">Origin Station : </h3>
            <h3 className="cardh3">{obj1.origin_station_code}</h3>
          </div>
          <div className="carddiv">
            <h3 className="cardh3">station_path : </h3>
            <h3 className="cardh3">{arr}</h3>
          </div>
          <div className="carddiv">
            <h3 className="cardh3">Date : </h3>
            <h3 className="cardh3">{obj1.date}</h3>
          </div>
          <div className="carddiv">
            <h3 className="cardh3">Distance : </h3>
            <h3 className="cardh3">{obj1.distance}</h3>
          </div>
        </div>
      </div>
      <div className="card2">
        <h4 className="cardh4">{obj1.city}</h4>
        <h4 className="cardh4">{obj1.state}</h4>
      </div>
    </div>
  );
};

export default Card;
