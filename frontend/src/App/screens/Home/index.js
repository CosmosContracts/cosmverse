import Collections from "./Collections";
import Hero from "./Hero";
import HotBid from "../../components/HotBid";
import Popular from "./Popular";
import React from "react";
import Selection from "./Selection";

//import Discover from "./Discover";



const Home = () => {
  return (
    <>
      <Hero />
      <Selection />
      <Popular />
      <HotBid classSection="section" />
      <Collections />  
    </>
  );
};

export default Home;