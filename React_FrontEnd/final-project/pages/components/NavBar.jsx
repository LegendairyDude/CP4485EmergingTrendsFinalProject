// components/Navbar.js
import Link from "next/link";
import Image from "next/image";
import styles from "./NavBar.module.css";
import { getProviders, signIn, signOut, useSession } from 'next-auth/react'
import { useEffect, useState } from "react";
//nav with google auth
const Navbar = () => {
  // const isUserLoggedIn = true
  // get session data
  const {data: session } = useSession()
 //state to retrieve and store providers (auth)
  const [providers, setProviders] = useState(null)

  //drop down menu frm usr icon in mobile view
  const [toggleDropDown, setToggleDropdown] = useState(false)

  //hacky way to get user icon link to work in desktop but disabel in mobile
  const isDesktop = typeof window !== 'undefined' && window.innerWidth > 720; //must match mobile nav in css to be smmoth

  useEffect(() => {
    //await and set the provider response for user
    const registerProviders = async () => {
      const response = await getProviders()
      setProviders(response)
    }

    //call function
    registerProviders()
  }, [])


  //nav bar html
  return (
    <nav className={styles.navbar}>
      {/* <ul className={styles.navList}>
        <li className={`${styles.navItem} ${styles.navLogo}`}> */}
          <Link href="/" className={styles.navLink}>
            <div className={styles.navImg}>
              {/* app logo / random stock reshot vector img  */}
              <Image
                src="/images/reshot-icon-pet-heart.svg"
                alt="logo"
                width={30}
                height={30}
                className={styles.logoImage}
              />
              <span>Purfect Name</span>
            </div>
           </Link>
        {/* </li>
        <li className={styles.navItem}>
          <Link href="/generator" className={styles.navLink}>
            Generator
          </Link>
        </li>
      </ul> */}

      {/* {alert(session?.user)} */}
      {/* {alert(providers)} */}
      
      {/* Create pet name btn only displays after sign in to allow for user id to be logged with entry */}
      {/* db still needs to log user */}
      {/* desktop Nav */}
          <div className={styles.deskTopNav}>
            {session?.user ? (
              <div className={styles.deskTopGenBtnContainer}>
                <Link href="/generator"
                className={styles.deskTopNavGenBtn}>
                  Create Pet Name
                </Link>

                <button type="button" onClick={() => {}} className={styles.signOutBtn}>Sign Out</button>

                  
                
              </div>
            ) : (<>{providers && Object.values(providers).map((provider) => (
              <button type="button" key={provider.name} onClick={() => signIn(provider.id)}
              className={styles.deskTopSignInBtn}>
                  Sign In
              </button>
            ))}</>)}
          </div>

          {/* MobileNav */}
          <div className={styles.mobileNavBarContainer}> 
              {session?.user ? (
                <div className={styles.mobileProfileImg}>
                  <Link  href={isDesktop ? "/profile" : "#"}>
                  <Image
                src={session?.user.image}
                alt="profile image"
                width={30}
                height={30}
                className={styles.mobileProfileImg}
                onClick={() => setToggleDropdown(!toggleDropDown)}
              /></Link>
              {toggleDropDown && (<div className={styles.dropDownMenuContainer}>
                
                <Link href='/profile'
                className={styles.dropDownLink}
                onClick={() => setToggleDropdown(false)}>
                  My Profile
                </Link>
                <Link href='/generator'
                className={styles.dropDownLink}
                onClick={() => setToggleDropdown(false)}>
                  Create Pet Name
                </Link>
                <Link href='/profile'
                className={styles.dropDownLink}
                onClick={() => {setToggleDropdown(false) 
                signOut()}}>
                  Sign Out
                </Link>
              </div>)}
                </div>
                ) : (<>{providers && Object.values(providers).map((provider) => (
                <button type="button" key={provider.name} onClick={() => signIn(provider.id)}
                className={styles.signInBtn}>
                    Sign In
                </button>
              ))}</>)}
          </div>
    </nav>
  );
};

export default Navbar;


