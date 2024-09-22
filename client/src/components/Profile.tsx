import profile from '../assets/profile.png';

export default function Profile() {
  return (
    <>
      <div className='flex flex-col items-center gap-2 mt-2 text-center px-6 pt-2 pb-3 rounded-3xl'>
        <img
          className='rounded-full w-44 border-primary border-2 '
          src={profile}
          alt=''
        />
        <div>
          <h2 className='text-2xl font-extrabold'>WILL HAMILTON</h2>
          <div>Mern Stack Developer</div>
        </div>
        <div>
          {/* links to linkdin, github, */}
          {/* https://chatgpt.com/share/66e9dc0d-9f34-8010-ae25-c5434364f9ad
          link to chatgpt ideas bottom of page
          */}
        </div>
      </div>
      <div className='text-center flex flex-col w-4/6 gap-2'>
        <h2>Personal Statement</h2>
        <p className='text-sm'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo
          atque nostrum consequuntur nisi animi blanditiis soluta amet,
          consectetur velit minus reprehenderit, cum, et necessitatibus
          asperiores ea ut accusantium neque eum dolor ratione! Odio ducimus
          porro tenetur illum quam id accusamus consectetur officiis, doloremque
          a totam. Odit voluptatum iure autem rem quibusdam ea doloribus
          cupiditate quos exercitationem sed! Aliquid, dolorem. Adipisci ipsum
          doloremque, non sed necessitatibus similique deserunt commodi
          aspernatur veniam dicta! Accusantium error provident dignissimos
          explicabo, provident nesciunt. Quis corporis doloribus iste numquam
        </p>
      </div>
    </>
  );
}
