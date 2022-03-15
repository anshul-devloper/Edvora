export const getStaticProps = async () => {
  const res1 = await fetch("https://assessment.api.vweb.app/user");
  const data1 = await res1.json();
  const res2 = await fetch("https://assessment.api.vweb.app/rides");
  const data2 = await res2.json();
  return {
    props: {
      data1,
      data2,
    },
  };
};
import { useEffect, useState } from "react";
import Link from "next/link";
import Head from "next/head";
import Navbar from "../Components/Navbar";
import Card from "../Components/Card";

const home = ({ data1, data2 }) => {
  useEffect(() => {
    localStorage.setItem("anshul", JSON.stringify(data1));
    localStorage.setItem("ans", JSON.stringify(data2));
  }, []);

  const needle = data1.station_code;

  for (let object of data2) {
    let closest = object.station_path.reduce((a, b) => {
      return Math.abs(b - needle) < Math.abs(a - needle) ? b : a;
    });
    object.distance = Math.abs(closest - needle);
  }

  data2.sort(function (a, b) {
    return a.distance - b.distance;
  });

  const [info, setinfo] = useState(data2);

  // let date = new Date();
  // let count = new Date(date).getTime();

  // const past = data2.filter(checkAdult);
  // const future = data2.filter(func);
  // function checkAdult(ob) {
  //   return count - new Date(ob.date).getTime() >= 0;
  // }
  // function func(ob) {
  //   return count - new Date(ob.date).getTime() < 0;
  // }

  const stateArr = [...new Set(data2.map((x) => x.state))];
  const cityArr = [...new Set(data2.map((x) => x.city))];
  stateArr.unshift("States");
  cityArr.unshift("City");
  const [newCity, setnewCity] = useState(cityArr);

  const handler = (e) => {
    console.log(e.target.value);
    let val = e.target.value;
    if (val == "States") {
      setinfo(data2);
      setnewCity(cityArr);
    } else {
      const newArr = data2.filter(abc);

      function abc(Obj) {
        return Obj.state == val;
      }
      setinfo(newArr);

      const newcityArr = [];
      for (let nn of data2) {
        if (nn.state == val) {
          newcityArr.push(nn.city);
        }
      }
      newcityArr.unshift("City");
      setnewCity(newcityArr);
      console.log(newcityArr);
    }
  };

  const cityhandler = (e) => {
    let val = e.target.value;
    console.log(val);
    if (val == "City") {
      setinfo(data2);
      setnewCity(cityArr);
    } else {
      const newArr = data2.filter(abc);

      function abc(Obj) {
        return Obj.city == val;
      }
      setinfo(newArr);
    }
  };
  return (
    <>
      <Head>
        <title>HomePage</title>
      </Head>

      <Navbar obj={data1} />

      <div className="head">
        <div className="head1">
          <Link href="/">
            <a className="headactive">Nearest rides</a>
          </Link>
          <Link href="/Upcoming">
            <a className="headh3">Upcoming rides</a>
          </Link>
          <Link href="/Past">
            <a className="headh3">Past rides</a>
          </Link>
        </div>

        <div className="head2">
          <select
            className="selectState"
            onChange={(e) => {
              handler(e);
            }}
          >
            {stateArr.map((Ele) => {
              return <option value={Ele}>{Ele}</option>;
            })}
            ;
          </select>
          <select
            className="selectState"
            onChange={(e) => {
              cityhandler(e);
            }}
          >
            {newCity.map((Ele) => {
              return <option value={Ele}>{Ele}</option>;
            })}
            ;
          </select>
        </div>
      </div>

      <div className="container">
        {info.map((curEle) => {
          return <Card obj1={curEle} />;
        })}
      </div>
    </>
  );
};

export default home;
