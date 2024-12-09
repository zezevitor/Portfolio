import React from "react";
import Start from "./Start";
import Projects from "./Projects";
import About from "./About";
import Contact from "./Contact";
import Rate from "./Rate";
import "./main.css";

const Main = ({ refs, scrollTo }) => {
  return (
    <main>
      <Start scrollTo={scrollTo} />
      <section ref={refs.projects}>
        <Projects />
      </section>
      <section ref={refs.about}>
        <About />
      </section>
      <section ref={refs.contact}>
        <Contact />
      </section>
      <Rate />
    </main>
  );
};

export default Main;
