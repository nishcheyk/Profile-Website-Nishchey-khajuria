import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { springStructural } from '../../../animations';

const FAQS = [
  {
    question: "Is this a real product or a portfolio?",
    answer: "This is a dimensional instance of my portfolio, designed to resemble a modern SaaS product. It demonstrates my ability to build high-conversion landing pages with fluid animations."
  },
  {
    question: "What stack is this built on?",
    answer: "The frontend uses React, Tailwind CSS, and Framer Motion. The backend architectures I usually build utilize Next.js, FastAPI, Node.js, and PostgreSQL."
  },
  {
    question: "How do the animations feel so fluid?",
    answer: "I use critically damped spring physics instead of standard easing curves (like ease-in-out). This creates a physical, interruptible motion system identical to native iOS applications."
  },
  {
    question: "Are you available for hire?",
    answer: "Yes. I am currently looking for Full Stack or AI Engineering roles where I can build scalable systems and polished user experiences."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 px-6 max-w-3xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">Questions. Answered.</h2>
      </div>

      <div className="space-y-4">
        {FAQS.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ ...springStructural, delay: index * 0.1 }}
              className="border border-slate-200 rounded-2xl bg-white overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="w-full text-left px-6 py-6 flex items-center justify-between focus:outline-none"
              >
                <span className="font-bold text-slate-900 text-lg">{faq.question}</span>
                <motion.div 
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={springStructural}
                  className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 shrink-0"
                >
                  ↓
                </motion.div>
              </button>
              
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={springStructural}
                  >
                    <div className="px-6 pb-6 text-slate-500 leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
