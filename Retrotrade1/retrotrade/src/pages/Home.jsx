import React from "react";
import { Banner } from "./Banner";
import { ViewProducts } from "./ViewProducts";
import { UserNavbar } from "../components/layout/UserNavbar";
import { NewsLetter } from "./NewsLetter";
import { Footer } from "./Footer";
import { NewCollection } from "./NewCollection";

export const Home = () => {
  return (
    <div>
      <UserNavbar/> 
      <Banner />
      <ViewProducts/>
      <NewCollection/>
      <NewsLetter/>
      <Footer/>
    </div>
  );
};
