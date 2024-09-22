import { useEffect, useState } from 'react';

import Project from '../components/Project';
import { ProjectType } from '../types/project';
import AddNewProject from '../components/AddNewProject';
import Backdrop from '../components/Backdrop';

interface ApiResponse {
  success: boolean;
  data: ProjectType[];
}

export default function Projects() {
  const [projects, setProjects] = useState<ProjectType[]>([]);
  const [toggleAddNewInput, setToggleAddNewInput] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/projects');
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const result: ApiResponse = await res.json();
        setProjects(result.data);
      } catch (error) {
        console.log('error fetching projects', error);
      }
    };
    fetchProjects();
  }, []);

  const onCloseModal = () => {
    setToggleAddNewInput(false);
  };
  //   const addHandler = () => {};

  return (
    <main className='h-screen flex flex-col gap-5  items-center  '>
      {!toggleAddNewInput && (
        <button onClick={() => setToggleAddNewInput(!toggleAddNewInput)}>
          Add New Project
        </button>
      )}
      {toggleAddNewInput && (
        <Backdrop onCloseModal={() => setToggleAddNewInput(false)}>
          <AddNewProject onCloseModal={onCloseModal} />
        </Backdrop>
      )}
      <div className='gap-0.5 flex-col flex'>
        {Array.isArray(projects) &&
          projects.map(item => {
            return <Project key={item._id} {...item} />;
          })}
      </div>
    </main>
  );
}
