import { Dispatch, FC, SetStateAction } from "react";
import Modal from "./Modal";
interface Props {
  openConfirmModal: boolean;
  setOpenConfirmModal: Dispatch<SetStateAction<boolean>>;
  setConfirm: Dispatch<SetStateAction<boolean | null>>;
  continueButtonText: string;
  closeButtonText: string;
}
const ConfirmModal: FC<Props> = ({
  openConfirmModal,
  setOpenConfirmModal,
  setConfirm,
  continueButtonText,
  closeButtonText,
  children,
}) => {
  return (
    <Modal open={openConfirmModal} setOpenModal={setOpenConfirmModal} size="sm">
      <div className="text-slate-600 font-semibold text-lg grid place-items-center h-full pb-2">
        <div className="flex flex-col justify-center items-center space-y-6 h-full w-full md:w-3/4">
          {children}
          <div className="flex space-x-6 justify-center">
            <button
              onClick={() => setOpenConfirmModal(false)}
              className="text-lg font-bold text-white px-6 py-2 rounded bg-green-500 hover:bg-green-600 transition"
            >
              {closeButtonText}
            </button>
            <button
              onClick={() => {
                setConfirm(true);
                setOpenConfirmModal(false);
              }}
              className="text-lg font-bold text-white px-6 py-2 rounded bg-blue-500 hover:bg-blue-600 transition"
            >
              {continueButtonText}
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
