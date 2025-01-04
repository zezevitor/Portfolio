import React, { useRef } from "react";
import Header from "./Header";
import Main from "./Main/Main";
import Footer from "./Footer";

function App() {
  const refs = {
    projects: useRef(null),
    about: useRef(null),
    contact: useRef(null),
  };

  const scrollTo = (s) => {
    refs[s]?.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="App">
      <Header refs={refs} scrollTo={scrollTo} />
      <Main refs={refs} scrollTo={scrollTo} />
      <Footer />
    </div>
  );
}

export default App;
