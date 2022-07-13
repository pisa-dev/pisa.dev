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
        className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md bg-gray-50 dark:bg-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        onClick={onBack}
      >
        Indietro
      </button>
    )}
    <button
      type="submit"
      className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
      disabled={loading || (required && !filled)}
    >
      {loading ? (
        <CgSpinner className="animate-spin mr-2" />
      ) : (
        <IoMdSend className="mr-2" />
      )}
      {!required && !filled ? "Salta" : "Invia"}
    </button>
  </div>
);
