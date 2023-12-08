//pet name generator page to hold petname form/generator component
import React, { useState } from "react";
import PetNameGenerator from "./components/PetNameGenerator";
import NavBar from "./components/NavBar";
import style from './generator.module.css'


const Generator = () => {
  return (
    <>
      <NavBar />
      <div className={style.pageContainer}>
        <h1 className={`${style.genPageTitle} ${style.titleBackground}`}>Generate A Pet Name</h1>
        <div className={style.nameGenForm}><PetNameGenerator /></div>
        
      </div>
    </>
  );
};

export default Generator;
