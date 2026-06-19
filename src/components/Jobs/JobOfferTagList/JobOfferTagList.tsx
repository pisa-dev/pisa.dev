import { FC } from "react";

export const JobOfferTagList: FC<{
  tags: string[];
  limit?: number;
}> = ({ tags, limit }) => {
  return (
    <ul className="flex flex-wrap items-center gap-2">
      {tags.slice(0, limit).map((tag, i) => (
        <li
          key={i}
          className="p-[2px] text-xs font-bold rounded-md bg-gradient-brand text-transparent"
        >
          <div className="py-1 px-2 rounded-[4px] s-full w-full bg-white dark:bg-slate-800">
            <div className="bg-gradient-brand bg-clip-text">{tag}</div>
          </div>
        </li>
      ))}
    </ul>
  );
};
