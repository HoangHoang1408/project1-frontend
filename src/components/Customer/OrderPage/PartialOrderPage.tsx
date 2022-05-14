import { FC } from "react";

interface PartialPageProps {
  headerName?: string;
}
export const PartialOrderPage: FC<PartialPageProps> = ({
  children,
  headerName,
}) => {
  return (
    <div className="w-full max-w-2xl rounded text-slate-800 bg-white shadow">
      {headerName && (
        <h1 className="px-4 py-3 text-lg font-semibold border-b border-slate-200">
          {headerName}
        </h1>
      )}
      <div className="px-4 py-3">{children}</div>
    </div>
  );
};
