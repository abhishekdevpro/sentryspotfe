import React from "react";

import Home from "@/components/home-7";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Home-7 || sentryspot - Job Borad ReactJs Template",
  description: "sentryspot - Job Borad ReactJs Template",
};

const HomePage7 = () => {
  return (
    <>
    <MetaComponent meta={metadata} />
      <Home />
    </>
  );
};

export default HomePage7;
