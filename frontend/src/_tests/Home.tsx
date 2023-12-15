import React from "react"

export const Home = () => {
  return (
    <>
      <h1>Testing Web Crypto API wrapper</h1>
      
      <h2>Why this way?</h2>
      <p>The module works on top
        of <a href={"https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API"} target={"_blank"}>Web Crypto Api</a> thus it is not
        testable in Jest without polyfills which makes it useless.
      </p>
      
    </>
  )
}
