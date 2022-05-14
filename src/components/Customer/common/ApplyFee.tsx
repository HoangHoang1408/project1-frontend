import { Dispatch, FC, SetStateAction } from "react";
import Modal from "../../layout/Modal";

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}
const ApplyFee: FC<Props> = ({ open, setOpen }) => {
  return (
    <Modal open={open} setOpenModal={setOpen} size="sm">
      <div className="flex flex-col space-y-3 w-full p-2 text-slate-800 font-semibold">
        <h1 className="text-2xl font-bold text-green-600 pb-2">Apply Fee</h1>
        <div className="flex justify-between">
          <h1>Shipping Fee</h1>
          <h1 className="text-green-600">{1}$</h1>
        </div>
        <div className="flex flex-col space-y-1">
          <div className="flex justify-between">
            <h1>Service Fee</h1>
            <h1 className="text-green-600">{0.2}$</h1>
          </div>
          <p className="text-sm text-slate-500">
            This fee will contribute to encourage drivers, help us improve
            delivery services to better serve our customers, increase
            incentives, and help with restaurant selection.
          </p>
        </div>
        <button
          onClick={() => setOpen(false)}
          className="px-4 py-2 text-white font-bold bg-green-500 hover:bg-green-600 rounded transition"
        >
          Got it
        </button>
      </div>
    </Modal>
  );
};

export default ApplyFee;
