import { FC, useState } from "react";
export interface Option {
  icon: JSX.Element;
  text: string;
}
export interface OrderPageSelectInputProps {
  labelText: string;
  options: Option[];
}
export const OrderPageSelectInput: FC<OrderPageSelectInputProps> = ({
  labelText,
  options,
}) => {
  const [openOption, setOpenOption] = useState(false);
  const [choosenOption, setChoosenOption] = useState<Option>(options[0]);
  const activeClass = openOption ? " flex" : " hidden";
  return (
    <div className="flex flex-col">
      <label className="font-semibold mb-1">{labelText}</label>
      <div
        onClick={() => setOpenOption((pre) => !pre)}
        className="py-2 border border-slate-300 hover:border-green-500 focus:border-green-500 rounded cursor-pointer relative"
      >
        <div className="flex space-x-3 font-semibold px-3">
          <span className="text-green-500">{choosenOption.icon}</span>
          <span>{choosenOption.text}</span>
        </div>
      </div>
      <div className={"flex-col border border-slate-300 rounded" + activeClass}>
        {options.map((option, i) => (
          <div
            key={i}
            onClick={() => {
              setChoosenOption(option);
              setOpenOption(false);
            }}
            className="flex space-x-3 py-2 px-3 font-semibold cursor-pointer hover:bg-slate-200 rounded"
          >
            <span className="text-green-500">{option.icon}</span>
            <span>{option.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
