import React from "react";

import Home from "@/components/home-2";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Home-2 || sentryspot - Job Borad ReactJs Template",
  description: "sentryspot - Job Borad ReactJs Template",
};

const HomePage2 = () => {
  return (
    <>
    <MetaComponent meta={metadata} />
      <Home />
    </>
  );
};

export default HomePage2;
