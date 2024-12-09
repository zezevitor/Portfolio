import photo from '../assets/foto.jpg'

const Start = ({ scrollTo }) => {
    return (
        <div className='Components Start'>
            <div className='title'>
                <h1>
                    <i>Back</i>-end <br />
                    Developer
                </h1>
            </div>
            <div className='photo'>
                <img src={ photo } alt='foto.jpg' />
            </div>
            <div className='startButtons'>
                <button className='startButtom' onClick={() => scrollTo("projects")}>Projetos</button>
                <button className='startButtom' onClick={() => scrollTo("about")}>Sobre</button>
                <button className='startButtom' onClick={() => scrollTo("contact")}>Contatos</button>
            </div>
        </div>
    );
};

export default Start;