import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dispatch, FC, SetStateAction, useEffect, useRef } from "react";

interface Props {
  open: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  className?: string;
  size?: "lg" | "sm";
}

const Modal: FC<Props> = ({
  open,
  children,
  setOpenModal,
  className,
  size = "lg",
}) => {
  const activeClass = open ? " grid" : " hidden";
  const mainClass = `w-full -mt-3 h-full ${className ? className : ""}`;
  const ref = useRef<HTMLDivElement>(null);
  let sizeClass;
  if (size === "lg") sizeClass = "h-full sm:w-10/12 md:w-7/12";
  if (size === "sm") sizeClass = "h-fit sm:w-7/12 md:w-6/12 lg:w-5/12";
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (e.target !== ref.current) return;
      setOpenModal(false);
    };
    window.addEventListener("click", handler);
    return () => {
      window.removeEventListener("click", handler);
    };
  }, [setOpenModal]);
  return (
    <div
      ref={ref}
      className={
        "fixed top-0 left-0 w-full h-screen grid place-items-center bg-gray-400 bg-opacity-20 z-40 py-6 px-4" +
        activeClass
      }
    >
      <div
        className={
          " w-full bg-white flex flex-col items-center justify-between px-4 pt-3 pb-2 rounded-md shadow-md z-50 " +
          sizeClass
        }
      >
        <div className="w-8 h-8 self-end cursor-pointer text-3xl text-slate-600 hover:text-red-600 transition grid place-items-center z-10">
          <FontAwesomeIcon onClick={() => setOpenModal(false)} icon={faTimes} />
        </div>
        <div className={mainClass}>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
