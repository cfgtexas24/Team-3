import React, { useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import { motion } from "framer-motion";
import useMeasure from "react-use-measure";

const BasicFAQ = () => {
  return (
    <div className="px-4 py-12">
      <div className="mx-auto max-w-3xl">
        <h3 className="mb-4 text-center text-3xl font-semibold">
          Frequently asked questions
        </h3>
        <Question title="Where can I find emergency shelter?" defaultOpen>
          <p>
            You can find emergency shelter at our downtown location, open 24/7. Please call (555) 123-4567 for more information.
          </p>
        </Question>
        <Question title="How do I access food and meal services?">
          <p>
            Our food pantry is open Monday to Friday from 9am to 5pm. You can also visit our soup kitchen for hot meals daily from 11am to 2pm.
          </p>
        </Question>
        <Question title="Can I get help with job training and employment?">
          <p>
            Yes, our job training program is designed to help you acquire new skills and find employment. Please visit our employment services office to learn more.
          </p>
        </Question>
        <Question title="Are there any resources for mental health and counseling?">
          <p>
            Yes, we offer free counseling services and mental health resources. Please call (555) 123-4567 to schedule an appointment.
          </p>
        </Question>
        <Question title="How can I get help with finding permanent housing?">
          <p>
            Our housing assistance program can help you find and secure permanent housing. Please visit our housing office to learn more about the application process.
          </p>
        </Question>
      </div>
    </div>
  );
};

const Question = ({ title, children, defaultOpen = false }) => {
  const [ref, { height }] = useMeasure();
  const [open, setOpen] = useState(defaultOpen);

  return (
    <motion.div
      animate={open ? "open" : "closed"}
      className="border-b-[1px] border-b-slate-300"
    >
      <button
        onClick={() => setOpen((pv) => !pv)}
        className="flex w-full items-center justify-between gap-4 py-6"
      >
        <motion.span
          variants={{
            open: {
              color: "rgba(3, 6, 23, 0)",
            },
            closed: {
              color: "rgba(3, 6, 23, 1)",
            },
          }}
          className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-left text-lg font-medium"
        >
          {title}
        </motion.span>
        <motion.span
          variants={{
            open: {
              rotate: "180deg",
              color: "rgb(124 58 237)",
            },
            closed: {
              rotate: "0deg",
              color: "#030617",
            },
          }}
        >
          <FiChevronDown className="text-2xl" />
        </motion.span>
      </button>
      <motion.div
        initial={false}
        animate={{
          height: open ? height : "0px",
          marginBottom: open ? "24px" : "0px",
        }}
        className="overflow-hidden text-slate-600"
      >
        <p ref={ref}>{children}</p>
      </motion.div>
    </motion.div>
  );
};

export default BasicFAQ;