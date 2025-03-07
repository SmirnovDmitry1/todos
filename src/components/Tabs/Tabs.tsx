import React from "react";

import { Tab } from "../../App";

import "./Tabs.css";

interface TabsProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
}

const Tabs: React.FC<TabsProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="tabs">
      <button
        className={activeTab === "all" ? "active" : ""}
        onClick={() => setActiveTab("all")}
      >
        All
      </button>
      <button
        className={activeTab === "completed" ? "active" : ""}
        onClick={() => setActiveTab("completed")}
      >
        Completed
      </button>
      <button
        className={activeTab === "incomplete" ? "active" : ""}
        onClick={() => setActiveTab("incomplete")}
      >
        Incomplete
      </button>
    </div>
  );
};

export default Tabs;
