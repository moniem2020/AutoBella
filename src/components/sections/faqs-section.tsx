"use client";

import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { CircleHelp, Minus } from "lucide-react";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const Accordion = AccordionPrimitive.Root;

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item ref={ref} className={cn(className)} {...props} />
));
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "group flex w-full flex-1 items-center justify-between text-left text-xl font-bold text-white transition-all",
        className,
      )}
      {...props}
    >
      {children}
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className={cn(
      "overflow-hidden text-base transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
      className,
    )}
    {...props}
  >
    <div className="pt-4">{children}</div>
  </AccordionPrimitive.Content>
));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

const faqData = [
  {
    id: "item-1",
    question: "Where do you operate?",
    answer:
      "We currently operate in Nasr City, Heliopolis, 1st Settlement, 5th Settlement, Qattamia, Shorouk and Madinaty.",
  },
  {
    id: "item-2",
    question: "Do I need to be present during the wash?",
    answer: "No, just leave the keys and we'll handle the rest.",
  },
  {
    id: "item-3",
    question: "Can I subscribe to a membership plan?",
    answer: "Yes, we offer both client memberships and B2B corporate packages.",
  },
  {
    id: "item-4",
    question: "Is my car safe during the wash?",
    answer:
      "Absolutely. Our team is trained, professional, and fully equipped to handle your car with care.",
  },
  {
    id: "item-5",
    question: "How can I book a wash?",
    answer:
      "You can book directly via WhatsApp, our website, or by scanning the QR code.",
  },
];

const CheckeredBorder = () => (
  <div
    className="h-10 w-full"
    style={{
      backgroundImage:
        "linear-gradient(to right, #C9A961 20px, #1a1a1a 20px), linear-gradient(to right, #1a1a1a 20px, #C9A961 20px)",
      backgroundSize: "40px 20px",
      backgroundPosition: "0 0, 0 20px",
    }}
  />
);

export default function FaqsSection() {
  return (
    <section
      id="faqs"
      className="relative bg-black"
    >
      <CheckeredBorder />
      <div className="mx-auto max-w-[1100px] px-8 py-20 md:px-12">
        <h1
          className="font-display mb-12 text-center text-[3rem] md:text-[4rem] text-[#C9A961]"
        >
          FAQs
        </h1>
        <Accordion type="single" collapsible defaultValue={faqData[0].id}>
          {faqData.map((item) => (
            <AccordionItem
              key={item.id}
              value={item.id}
              className="mb-4 rounded-xl bg-white/5 backdrop-blur-sm p-6 border border-[#C9A961]/20 hover:border-[#C9A961]/40 hover:bg-white/10 transition-all"
            >
              <AccordionTrigger>
                {item.question}
                <div className="relative ml-4 h-6 w-6 flex-shrink-0">
                  <CircleHelp
                    className="absolute h-6 w-6 text-[#C9A961] transition-opacity duration-300 group-data-[state=open]:opacity-0"
                    aria-hidden="true"
                  />
                  <Minus
                    className="absolute h-6 w-6 text-[#C9A961] opacity-0 transition-opacity duration-300 group-data-[state=open]:opacity-100"
                    aria-hidden="true"
                  />
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <p
                  className="text-white/70"
                  style={{ lineHeight: 1.7 }}
                >
                  {item.answer}
                </p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}