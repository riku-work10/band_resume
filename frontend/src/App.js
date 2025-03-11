import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [tasks, setTasks] =useState ([]);
  const API_URL = `${process.env.REACT_APP_API_URL}/tasks`;
  console.log(API_URL);

  const fetch = async () => {
    const res = await axios.get(API_URL);
    setTasks(res.data);
  };

  useEffect(() => {
    fetch();
  }, []);


  return (
<div className="p-6 bg-gray-100 rounded-lg shadow-md">
  <h1 className="text-3xl text-gray-600 font-semibold text-center mb-4">アプリ開発</h1>
  <p className="text-lg text-gray-600 mb-6 text-center">テスト！</p>
  {tasks.map((task, index) => (
    <div key={index} className="task mb-3 p-4 bg-white rounded-lg shadow-sm flex justify-between items-center">
      <span className="text-lg text-gray-800">{task.name}</span>
    </div>
  ))}
</div>

  )
};

export default App;