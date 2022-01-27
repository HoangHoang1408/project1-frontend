import { FC } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

export interface SelectInputProps {
  registerObject: UseFormRegisterReturn;
  labelString: string;
  errorMessage: string | undefined;
  className?: string;
  optionList: string[];
}

const SelectInput: FC<SelectInputProps> = ({
  registerObject,
  labelString,
  errorMessage,
  className,
  optionList,
}) => {
  return (
    <div className={"flex flex-col " + className || ""}>
      <label htmlFor={labelString}>{labelString}</label>
      <select
        {...registerObject}
        defaultValue={optionList[0]}
        id={labelString}
        className="px-2 py-2 border border-green-500 outline-none rounded-sm text-sm font-semibold"
      >
        {optionList.map((v, i) => {
          return (
            <option key={i} value={v}>
              {v}
            </option>
          );
        })}
      </select>
      <p className="text-xs text-red-600">{errorMessage}</p>
    </div>
  );
};

export default SelectInput;
