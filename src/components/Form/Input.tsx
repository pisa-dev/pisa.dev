import { forwardRef, HTMLProps, Ref } from "react";
import { FieldError } from "react-hook-form";
import cls from 'classnames';
import { errorStyle } from "./styles";

type Props = HTMLProps<HTMLInputElement> & { error?: FieldError }

const _Input = (
  props: Props,
  ref: Ref<HTMLInputElement>,
) => {
  return (
    <input
      ref={ref}
      {...props}
      className={cls(
        'block w-full min-w-0 flex-1 rounded-md sm:text-sm dark:bg-slate-800',
        props.className,
        { 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 dark:border-slate-600': !props.error },
        { [errorStyle]: props.error }
      )}
    />
  );
};

export const Input = forwardRef(_Input);
