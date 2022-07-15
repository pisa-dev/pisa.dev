import { FC } from "react";
import { IoMdSend } from "react-icons/io";
import { CgSpinner } from "react-icons/cg";

export interface SubmitProps {
  onBack?: () => void;
  required?: boolean;
  filled?: boolean;
  loading?: boolean;
}

export const Submit: FC<SubmitProps> = ({
  onBack,
  filled,
  required,
  loading,
}) => (
  <div className="flex gap-4">
    {onBack && (
      <button
        type="button"
        className="inline-flex items-center rounded-md border border-transparent bg-gray-50 px-4 py-2 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:bg-slate-800 dark:text-white"
        onClick={onBack}
      >
        Indietro
      </button>
    )}
    <button
      type="submit"
      className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
      disabled={loading || (required && !filled)}
    >
      {loading ? (
        <CgSpinner className="mr-2 animate-spin" />
      ) : (
        <IoMdSend className="mr-2" />
      )}
      {!required && !filled ? "Salta" : "Invia"}
    </button>
  </div>
);
