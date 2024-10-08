import { useState } from 'react';
import { ProjectType } from '../types/project';

type ProjectProps = ProjectType & {
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
};

export default function Project({
  _id,
  name,
  repoLink,
  siteLink,
  image,
  blurb,
  onDelete,
  onEdit,
}: ProjectProps) {
  const [showConfrimation, setShowConfrimation] = useState(false);

  // -- delete function made in Projects.tsx parent component --
  // closes modal that is opened when user clicks delete button
  // called by button visable when show confrimation is true
  const handleDelete = (id: string) => {
    onDelete(id);
    setShowConfrimation(false);
  };

  const handleEdit = (id: string) => {
    onEdit(id);
  };

  return (
    <section className='flex gap-2 items-center justify-evenly '>
      <div className='realtive border-2 rounded-2xl h-4/5 p-1 md:w-1/2 lg:w-[800px] flex flex-col relative'>
        {/* sets cofirmation to true then user is given abilitie to call delete function */}
        <button
          onClick={() => setShowConfrimation(true)}
          className='absolute top-3 right-3 z-10 opacity-80 shadow-2xl shadow-yellow-600 bg-white p-3 rounded-full hover:bg-gray-300 duration-200'
        >
          🗑
        </button>
        {/* opens patch modal */}
        <button
          onClick={() => handleEdit(_id)}
          className='absolute top-3 left-3 z-10 opacity-80 shadow-2xl shadow-yellow-600 bg-white p-3 rounded-full hover:bg-gray-300 duration-200'
        >
          ✏
        </button>

        {/* main content, image, title, links to github and live website, STILL NEEDS TECH IMAGE ADDDED */}
        <div className='h-1/4'>
          <img
            className='rounded-t-xl h-40 contain-content w-full'
            src={image}
            alt=''
          />
        </div>
        <div className='h-1/2 gap-2 flex flex-col my-3'>
          <div className='flex justify-between mt-2 mx-3'>
            <a href={repoLink}>github</a>
            <a href={siteLink}>live</a>
          </div>
          <h2 className='text-center font-extrabold text-xl'>{name}</h2>
          <p className='text-sm text-center '>{blurb}</p>
        </div>

        {/* replaces main content with confirmation if user wants to delete project */}
        {showConfrimation && (
          <div className='flex items-center justify-center flex-col absolute top-0 left-0 w-full h-full bg-white rounded-xl z-[99] gap-4'>
            <h2 className='text-black text'>
              ARE YOU SURE YOU WANT TO DELETE?
            </h2>
            <div className='flex gap-6'>
              <button
                onClick={() => handleDelete(_id)}
                className='bg-red-600 rounded-lg border border-red-900 p-3'
              >
                Yes Delete
              </button>
              <button
                onClick={() => setShowConfrimation(false)}
                className='bg-blue-600 rounded-lg border border-blue-900 p-3'
              >
                No Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
