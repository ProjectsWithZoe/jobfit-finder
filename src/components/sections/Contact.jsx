import React from "react";

export function Contact() {
  return (
    <>
      <section className="pt-32 flex flex-row pb-24 px-6 relative overflow-hidden ">
        <h1 className="border box-shadow p-10 bg-accent/100 text-lg mb-4 rounded-full">
          Contact Us on{" "}
          <a
            className="underline"
            href="mailto::admin@projectswithz.space"
            target="_blank"
            rel="noopener noreferrer"
          >
            admin@projectswithz.space
          </a>{" "}
          for any account problems, inquiries or for a general chat!
        </h1>
      </section>
    </>
  );
}
