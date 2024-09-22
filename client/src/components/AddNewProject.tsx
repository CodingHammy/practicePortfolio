import { ChangeEvent, FormEvent, useState } from 'react';
import { ProjectFormType } from '../types/project';
import axios from 'axios';

interface Props {
  onCloseModal: () => void;
}

export default function AddNewProject({ onCloseModal }: Props) {
  const [isloading, setisloading] = useState(false);
  const [formdata, setFormData] = useState<ProjectFormType>({
    name: '',
    repoLink: '',
    siteLink: '',
    image: '',
    blurb: '',
    tech: [],
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prevData => {
        const newTech = checked
          ? // after changed checks if checked
            [...prevData.tech, value]
          : //   if checked add value
            prevData.tech.filter(tech => tech !== value);
        return { ...prevData, tech: newTech };
      });
    } else {
      setFormData(prevData => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setisloading(true);
    try {
      const response = await axios.post(
        'http://localhost:5000/api/projects',
        formdata,
      );
      console.log('success', response.data);
      setFormData({
        name: '',
        repoLink: '',
        siteLink: '',
        image: '',
        blurb: '',
        tech: [],
      });
      onCloseModal();
    } catch (error) {
      console.error('Error', error);
    }
    setisloading(false);
  };

  return (
    <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[99] bg-slate-400 w-3/4 h-5/6 rounded-xl '>
      {isloading ? (
        <p className='h-full text-2xl font-bold flex items-center justify-center'>
          Posting. . .
        </p>
      ) : (
        <form
          onSubmit={handleSubmit}
          className='flex text-black flex-col gap-2  justify-center w-4/5 m-auto h-full  flex-col-child'
        >
          <label className=''>
            Project name*
            <input
              type='text'
              name='name'
              value={formdata.name}
              onChange={handleChange}
            />
          </label>
          <label>
            Github repository Url*
            <input
              type='url'
              name='repoLink'
              value={formdata.repoLink}
              onChange={handleChange}
            />
          </label>
          <label>
            Live Website Url*
            <input
              type='url'
              name='siteLink'
              value={formdata.siteLink}
              onChange={handleChange}
            />
          </label>
          <label>
            Image Url*
            <input
              type='url'
              name='image'
              value={formdata.image}
              onChange={handleChange}
            />
          </label>
          <label>
            Description*
            <textarea
              className='min-h-28'
              name='blurb'
              value={formdata.blurb}
              onChange={handleChange}
            />
          </label>
          <h2 className='text-center'>List all technologies used</h2>
          <div className='flex  justify-between text-lg gap-40'>
            <div className='flex flex-col'>
              {['Css', 'Javascript', 'React', 'Tailwind', 'TypeScript'].map(
                el => {
                  return (
                    <label key={el}>
                      <input
                        type='checkbox'
                        name='technologies'
                        value={el}
                        //   seeing if its checked in the formdata.tech
                        checked={formdata.tech.includes(el)}
                        onChange={handleChange}
                      />
                      {el}
                    </label>
                  );
                },
              )}
            </div>
            <div className='flex flex-col'>
              {['Nodejs', 'Nextjs', 'Express', 'Mongodb'].map(el => {
                return (
                  <label key={el}>
                    <input
                      type='checkbox'
                      name='technologies'
                      value={el}
                      checked={formdata.tech.includes(el)}
                      onChange={handleChange}
                    />
                    {el}
                  </label>
                );
              })}
            </div>
          </div>
          <button type='submit'>Submit</button>
        </form>
      )}
    </div>
  );
}
