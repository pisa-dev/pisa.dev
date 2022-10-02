import { forwardRef, HTMLProps, Ref } from "react";

const _Textarea = (
  props: HTMLProps<HTMLTextAreaElement>,
  ref: Ref<HTMLTextAreaElement>
) => (
  <textarea
    ref={ref}
    {...props}
    className={`block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-slate-600 dark:bg-slate-800 sm:text-sm ${props.className}`}
  />
);

export const Textarea = forwardRef(_Textarea);
