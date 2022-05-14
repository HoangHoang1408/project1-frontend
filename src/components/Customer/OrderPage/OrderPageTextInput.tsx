import { FC, HTMLInputTypeAttribute } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

export interface OrderPageTextInputProps {
  labelText: string;
  id: string;
  type: HTMLInputTypeAttribute;
  placeholder?: string;
  registerObject: UseFormRegisterReturn;
  error?: string;
  disabled?: boolean;
}
export const OrderPageTextInput: FC<OrderPageTextInputProps> = ({
  id,
  labelText,
  type,
  placeholder,
  registerObject,
  error,
  disabled,
}) => {
  const cursor = !disabled
    ? "cursor-text hover:border-green-500"
    : "cursor-not-allowed";
  return (
    <div className="flex flex-col space-y-1">
      <label htmlFor={id} className="font-semibold">
        {labelText}
      </label>
      <div className="flex flex-col">
        <input
          {...registerObject}
          id={id}
          type={type}
          placeholder={placeholder}
          className={
            "outline-none py-2 px-2 border border-slate-300 rounded focus:border-green-500 " +
            cursor
          }
        />
        {error && <span className="text-red-500 text-xs">{error}</span>}
      </div>
    </div>
  );
};
