import { FC } from "react";
import { Disclosure } from "@headlessui/react";
import { Text } from "../Text";
import { AiFillCaretRight, AiFillCaretDown } from "react-icons/ai";

interface AccordionProps {
  elements: {
    key: string;
    preview: React.ReactNode;
    content: React.ReactNode;
  }[];
}

export const Accordion: FC<AccordionProps> = ({ elements }) => {
  return (
    <dl className="mt-4 space-y-6 divide-y divide-gray-100/10">
      {elements.map((el) => (
        <Disclosure as="div" key={el.key} className="pt-6">
          {({ open }) => (
            <>
              <dt>
                <Disclosure.Button className="flex w-full items-start justify-between text-left text-gray-900">
                  {el.preview}
                  <Text
                    className="ml-6 flex h-7 items-center"
                    weight="semibold"
                  >
                    {open ? <AiFillCaretDown /> : <AiFillCaretRight />}
                  </Text>
                </Disclosure.Button>
              </dt>
              <Disclosure.Panel as="dd" className="mt-2 pr-12">
                {el.content}
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      ))}
    </dl>
  );
};
