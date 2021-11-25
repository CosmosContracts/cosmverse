import Collections from "./Collections";
import Description from "./Description";
import Discover from "./Discover";
import Hero from "./Hero";
import HotBid from "../../components/HotBid";
import Popular from "./Popular";
import React from "react";
import Selection from "./Selection";

const Home = () => {
  return (
    <>
      <Hero />
      <Selection />
      <Popular />
      <HotBid classSection="section" />
      <Collections />
      {/* <Discover /> */}
      <Description />
    </>
  );
};

export default Home;
