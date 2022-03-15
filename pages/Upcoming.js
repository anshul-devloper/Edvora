import Link from "next/link";
import Head from "next/head";
import Navbar from "../Components/Navbar";
import Card from "../Components/Card";

import { useEffect, useState } from "react";
const Upcoming = () => {
  const [data1, setdata1] = useState([]);
  const [data2, setdata2] = useState([]);

  useEffect(() => {
    let list1 = JSON.parse(localStorage.getItem("anshul"));
    setdata1(list1);

    let list2 = JSON.parse(localStorage.getItem("ans"));
    setdata2(list2);
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

  let date = new Date();
  let count = new Date(date).getTime();

  const past = data2.filter(checkAdult);
  const future = data2.filter(func);
  function checkAdult(ob) {
    return count - new Date(ob.date).getTime() >= 0;
  }
  function func(ob) {
    return count - new Date(ob.date).getTime() < 0;
  }

  const stateArr = [...new Set(future.map((x) => x.state))];
  const cityArr = [...new Set(future.map((x) => x.city))];
  stateArr.unshift("States");
  cityArr.unshift("City");

  return (
    <>
      <Head>
        <title>HomePage</title>
      </Head>

      <Navbar obj={data1} />

      <div className="head">
        <div className="head1">
          <Link href="/">
            <a className="headh3">Nearest rides</a>
          </Link>
          <Link href="/Upcoming">
            <a className="headactive">Upcoming rides</a>
          </Link>
          <Link href="/Past">
            <a className="headh3">Past rides</a>
          </Link>
        </div>

        <div className="head2">
          <select className="selectState">
            {stateArr.map((Ele) => {
              return <option>{Ele}</option>;
            })}
            ;
          </select>
          <select className="selectState">
            {cityArr.map((Ele) => {
              return <option>{Ele}</option>;
            })}
            ;
          </select>
        </div>
      </div>
      <div className="container">
        {future.map((curEle) => {
          return <Card obj1={curEle} />;
        })}
      </div>
    </>
  );
};

export default Upcoming;
