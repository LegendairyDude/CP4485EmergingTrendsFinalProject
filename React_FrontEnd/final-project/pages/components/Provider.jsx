import React from 'react'
import { SessionProvider } from 'next-auth/react'


//wrap session around all of react app (children) to allow for authenticated access
//BTNs on nav bar will not appear to generate a name until signed 
const Provider = ({children, session}) => {
  return (
    <SessionProvider session={session}>
        {children}
    </SessionProvider>
  )
}

export default Provider