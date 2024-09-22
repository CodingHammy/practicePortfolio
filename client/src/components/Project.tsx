import { ProjectType as ProjectProps } from '../types/project';

export default function Project({
  name,
  repoLink,
  siteLink,
  image,
  blurb,
}: ProjectProps) {
  return (
    <section className='flex gap-2 items-center justify-evenly '>
      <div className='border-2 rounded-2xl h-4/5 p-1 md:w-1/2 lg:w-[800px] flex flex-col'>
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
      </div>
    </section>
  );
}
