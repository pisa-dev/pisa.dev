import { Text } from "../Text";
import { Accordion } from "../Accordion";

const faqs = [
  {
    question: "What's the best thing about Switzerland?",
    answer:
      "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
  },
  {
    question: "What's the best thing about Switzerland?",
    answer:
      "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
  },
  {
    question: "What's the best thing about Switzerland?",
    answer:
      "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
  },
  {
    question: "What's the best thing about Switzerland?",
    answer:
      "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
  },
];

export const FAQSection = () => {
  const elements = faqs.map((faq) => {
    const preview = (
      <Text className="leading-7" weight="medium" bright>
        {faq.question}
      </Text>
    );
    const content = <Text className="leading-7">{faq.answer}</Text>;
    return { preview, content, key: faq.question };
  });

  return (
    <div className="mb-10 px-6">
      <Text as="h2" size="larger" weight="bold" bright>
        Frequently asked questions
      </Text>
      <Accordion elements={elements} />
    </div>
  );
};
