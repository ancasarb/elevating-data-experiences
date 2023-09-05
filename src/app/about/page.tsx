import React from "react";
import Link from "next/link";

function AboutPage() {
  return (
    <section className="pt-10 md:pt-32 overflow-hidden">
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid items-center grid-cols-1 md:grid-cols-2">
          <div>
            <h2 className="text-5xl font-bold leading-tight text-black">
              Thanks for <br className="block sm:hidden" /> stopping by! 👋
            </h2>
            <p className="text-2xl font-bold leading-tight text-black mt-6">
              I am Anca Sarb, a software engineer {}
              <br className="block sm:hidden" />
              based in London.
            </p>
            <p className="max-w-lg mt-3 text-xl leading-relaxed text-gray-600 md:mt-8">
              Up until now, the core of my work has focused on designing and
              implementing tools and infrastructure that improve AI/ML insights
              and methodologies for data scientists. It routinely involves
              creating and deploying high-performance APIs and robust and
              dependable data processing jobs at scale, ensuring reliable
              monitoring and logging practices are in place.
            </p>
          </div>

          <div className="relative md:mx-8">
            <p className="hidden md:block mt-4 text-xl text-gray-600 md:mt-16">
              <span className="relative inline-block">
                <span className="absolute inline-block w-full bottom-0.5 h-2 bg-yellow-300" />
                <span className="relative"> Have a question? </span>
              </span>

              <Link
                href="/contact"
                title=""
                className="mx-1 transition-all duration-200 text-sky-500 hover:text-sky-600 hover:underline"
              >
                Reach out!
              </Link>
            </p>
            <p className="max-w-lg mt-3 text-xl leading-relaxed text-gray-600 md:mt-8">
              My goal is to transition my focus towards working more creatively,
              with text and figures - to start experimenting with building
              intuitive data exploration and visualisation tools that enable
              users to analyse complex data at scale. I am particularly
              interested in understanding how automation, scalability and
              interactivity can elevate data experiences.
            </p>

            <p className="md:hidden mt-4 mb-4 text-xl text-gray-600 md:mt-16">
              <span className="relative inline-block">
                <span className="absolute inline-block w-full bottom-0.5 h-2 bg-yellow-300" />
                <span className="relative"> Have a question? </span>
              </span>
              <Link
                href="/contact"
                title=""
                className="md:hidden mx-1 transition-all duration-200 text-sky-500 hover:text-sky-600 hover:underline"
              >
                Reach out!
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutPage;
