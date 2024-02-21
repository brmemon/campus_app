import React from 'react'

const Auth = ({ children }) => {
    const auth = isAuthenticated();


    useEffect(() => {
      if (!auth) {
        return redirect("/");
      }
    }, []);


    if (!auth) {
      return null;
    }
    return (
        <>
          {children}
        </>
      );
}

export default Auth