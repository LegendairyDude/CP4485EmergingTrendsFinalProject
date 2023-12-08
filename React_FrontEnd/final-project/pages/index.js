/*homepage */
import React, { useEffect, useState } from "react";
import Link from "next/link";
import NavBar from "./components/NavBar";
import style from "./index.module.css";

function index() {
  return (
    <>
      <NavBar />
      <div className={style.welcomeContainer}>
        <h1 className={`${style.welcomeMsg} ${style.titleBackground}`}>Welcome!</h1>
        <h1 className={`${style.titleMsg} ${style.titleBackground}`}>Ultimate Pet Name Generator</h1>
        <p className={`${style.siteBrief} ${style.titleBackground}`}>
          Find the purfect name for your non-human companion in just a matter of
          moments
        </p>
        <Link href="/generator" className={style.generateLinkBtn}>
          Find the name for your pal now!
        </Link>
      </div>
    </>

    // <div>
    //   <h1>Welcome to the Ultimate Pet Name Generator!</h1>
    //   <Link href="/generator">Get Your Purfect Pet Name Now</Link>
    // </div>
  );
}

export default index;
