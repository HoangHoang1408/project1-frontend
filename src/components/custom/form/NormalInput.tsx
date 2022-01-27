import { FC, HTMLInputTypeAttribute } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

export interface NormaInputProps {
  registerObject: UseFormRegisterReturn;
  labelString: string;
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
  errorMessage: string | undefined;
  className?: string;
}

export const NormalInput: FC<NormaInputProps> = (props) => {
  const {
    registerObject,
    errorMessage,
    labelString,
    placeholder,
    type,
    className,
  } = props;
  return (
    <div className={"flex flex-col " + className || ""}>
      <label htmlFor={labelString}>{labelString}</label>
      <input
        {...registerObject}
        id={labelString}
        type={type}
        placeholder={placeholder}
        className="px-2 py-2 border border-green-500 outline-none rounded-sm font-semibold text-sm"
      ></input>
      <p className="text-xs text-red-600">{errorMessage}</p>
    </div>
  );
};
