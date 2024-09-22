import { ReactNode } from 'react';

type BackdropProps = {
  children: ReactNode;
  onCloseModal: () => void;
};

export default function Backdrop({ children, onCloseModal }: BackdropProps) {
  return (
    <main>
      <div
        onClick={onCloseModal}
        className=' top-0 left-0 absolute z-[50] bg-black opacity-30 h-screen w-screen'
      ></div>
      {children}
    </main>
  );
}
