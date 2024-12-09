import Projects from "./Main/Projects";

const Header = ({ scrollTo }) => {
    return (
        <header>
            <div className="name">
                <p><i>André</i> <b>Bastos</b></p>
            </div>
            <div className="headerButtons">
                <button className="headerButton" onClick={() => scrollTo("projects")}>PROJECTS</button>
                <button className="headerButton" onClick={() => scrollTo("about")}>ABOUT</button>
                <button className="headerButton" onClick={() => scrollTo("contact")}>CONTACT</button>
            </div>
        </header>
    );
};

export default Header