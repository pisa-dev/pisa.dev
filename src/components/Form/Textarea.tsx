import { forwardRef, HTMLProps, Ref } from "react";
import cls from 'classnames';
import { FieldError } from "react-hook-form";
import { errorStyle } from "./styles";

type Props = HTMLProps<HTMLTextAreaElement> & { error?: FieldError };

const _Textarea = (
  props: Props,
  ref: Ref<HTMLTextAreaElement>
) => {
  const { error, ...inputProps } = props;
  return (
    <textarea
      ref={ref}
      {...inputProps}
      className={cls(
        'block w-full rounded-md border shadow-sm dark:bg-slate-800 sm:text-sm',
        props.className,
        { 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 dark:border-slate-600': !error },
        { [errorStyle]: props.error }
      )}
    />
  );
};

export const Textarea = forwardRef(_Textarea);
