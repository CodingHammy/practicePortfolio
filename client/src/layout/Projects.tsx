import { useEffect, useState } from 'react';

import Project from '../components/Project';
import { ProjectFormType, ProjectType } from '../types/project';
import ProjectForm from '../components/ProjectForm';
import Backdrop from '../components/Backdrop';
import axios from 'axios';

interface ApiResponse {
  success: boolean;
  data: ProjectType[];
}

export default function Projects() {
  const [projects, setProjects] = useState<ProjectType[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [projectToEditId, setProjectToEditId] = useState('');
  const [projectForEdit, setProjectForEdit] = useState<ProjectFormType>();

  //  -- Fetches project from backend --
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

  const handleRunFetch = async () => {
    await fetchProjects();
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // -- deletes project by id and refreshes afterwards --
  // passed to porject.tsx to delete correct project

  const deleteProject = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5000/api/projects/${id}`);
      setProjects(prevProjects =>
        prevProjects.filter(project => project._id !== id),
      );
      console.log('Project Deleted');
    } catch (error) {
      console.error('error deleting Project', error);
    }
  };

  // -- closes modal and backdrop --
  // passed to backdrop.tsx, AddNewProject.tsx
  const onCloseModal = () => {
    setShowModal(false);
  };

  const handlePutRequest = (id: string) => {
    setShowModal(true);
    const projectToEdit = projects.find(
      project => project._id === id,
    ) as ProjectType;

    const {
      _id: EditID,
      name,
      repoLink,
      siteLink,
      image,
      blurb,
      tech,
    } = projectToEdit;
    setProjectForEdit({ name, repoLink, siteLink, image, blurb, tech });

    setProjectToEditId(EditID);
  };

  const handleAddNewProject = () => {
    setShowModal(true);
    setProjectForEdit(undefined);
  };

  return (
    <main className='h-screen flex flex-col gap-5  items-center  '>
      {/* button to open modal disappears while modal is visable */}
      {!showModal && (
        <button onClick={handleAddNewProject}>Add New Project</button>
      )}
      {/* modal for adding new and patching project */}
      {showModal && (
        <Backdrop onCloseModal={() => setShowModal(false)}>
          <ProjectForm
            onCloseModal={onCloseModal}
            initialData={projectForEdit}
            id={projectToEditId}
            triggerFetch={handleRunFetch}
          />
        </Backdrop>
      )}
      {/* list of all projects */}
      <div className='gap-0.5 flex-col flex'>
        {Array.isArray(projects) &&
          projects.map(item => {
            return (
              <Project
                onDelete={deleteProject}
                onEdit={handlePutRequest}
                key={item._id}
                {...item}
              />
            );
          })}
      </div>
    </main>
  );
}
