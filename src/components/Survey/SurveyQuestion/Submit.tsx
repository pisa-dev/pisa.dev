import { FC } from "react";
import { IoMdSend } from "react-icons/io";

export interface SubmitProps {
  onBack?: () => void;
  disabled?: boolean;
}

export const Submit: FC<SubmitProps> = ({ onBack, disabled }) => (
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
      className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-30"
      disabled={disabled}
    >
      <IoMdSend className="mr-2" />
      Invia
    </button>
  </div>
);
