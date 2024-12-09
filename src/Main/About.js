import photo from '../assets/about.jpg'

const About = () => {
  return (
    <div class='Components About'>
      <h1 class='aboutTitle'>Sobre Mim</h1>
      <div class='aboutPhoto'>
        <img src={ photo } alt='Minha Foto' />
      </div>
      <div class='aboutContent'>
        <p>Atualmente graduando no Instituto Federal Catarinense de Blumenau. Sou um desenvolvedor apaixonado por tecnologia e design.</p>
      </div>
    </div>
  );
};

export default About;