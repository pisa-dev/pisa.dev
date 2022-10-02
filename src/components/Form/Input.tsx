import { forwardRef, HTMLProps, Ref } from "react";

const _Input = (
  props: HTMLProps<HTMLInputElement>,
  ref: Ref<HTMLInputElement>
) => {
  return (
    <input
      ref={ref}
      {...props}
      className={`block w-full min-w-0 flex-1 rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 dark:border-slate-600 dark:bg-slate-800 sm:text-sm ${props.className}`}
    />
  );
};

export const Input = forwardRef(_Input);
