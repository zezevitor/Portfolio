import { useState } from 'react';

const Projects = () => {
  const [projects, setProjects] = useState([
    {
      name: 'Wordhunter',
      github: 'https://github.com/zezevitor/Word_Hunter',
      jsx: (
        <p>Wordhunter</p>
      )
    },
    {
      name: 'Javamon',
      github: 'https://github.com/zezevitor/Javamon',
      jsx: (
        <p>Javamon</p>
      )
    },
    {
      name: 'Clicker',
      github: 'https://github.com/zezevitor/Clicker',
      jsx: (
        <p>Clicker</p>
      )
    }
  ]);

  const [activeProject, setActiveProject] = useState(null);

  return (
    <div className='Components Projects'>
      <div className='projectList'>
        <ul>
          {projects.map((project) => (
            <li 
            className='project'
            onMouseEnter={() => setActiveProject(project)}
            >
              <label>
                <div>
                  {project.name}
                </div>
              </label>
            </li>
          ))}
        </ul>
      </div>
      <div className='projectDetail'>
        {activeProject ? (
          <div>
            {activeProject.jsx} 
            <a href={activeProject.github} className='fa fa-github' style={{ fontSize: '300%' }} target='_blank' />
          </div>
        ) : (
          <p>
            Escolha um projeto <br/> para mais detalhes
          </p>
        )}
      </div>
    </div>
  );
};

export default Projects;