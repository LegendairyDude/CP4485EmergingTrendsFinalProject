import React from 'react'
import style from '../profile.module.css'

const ProfileEntry = ({ petType, petDescription, generatedName }) => {
  return (
    <li className={style.userEntriesList}>
        <p className={style.userEntryListItem}>Animal Species: {petType}</p>
        <p className={style.userEntryListItem}>Pets Description: {petDescription}</p>
        <p className={style.userEntryListItem}>Generated Pet Name's: {generatedName}</p>
    </li>
  )
}

export default ProfileEntry