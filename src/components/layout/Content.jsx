import { Sidebar } from "./Sidebar";
import React, { useState } from "react";
import "../layout/Content.scss";
import { MainContent } from "../layout/MainContent";

export const Content = () => {
  return (
    <div className="content-wrapper">
      <Sidebar />
      <MainContent />
    </div>
  );
};
