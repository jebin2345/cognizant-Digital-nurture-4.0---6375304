import React, { useState } from 'react';
import BookDetails from './components/BookDetails';
import BlogDetails from './components/BlogDetails';
import CourseDetails from './components/CourseDetails';

function App() {
  const [selectedTab, setSelectedTab] = useState("blog");

  // 1. Element Variable
  let content;
  if (selectedTab === "book") {
    content = <BookDetails />;
  } else if (selectedTab === "course") {
    content = <CourseDetails />;
  } else {
    content = <BlogDetails />;
  }

  return (
    <div style={{ textAlign: "center", marginTop: "30px" }}>
      <h1>🧠 BloggerApp Dashboard</h1>

      <div style={{ marginBottom: '20px' }}>
        {/* Buttons to Switch Tabs */}
        <button onClick={() => setSelectedTab("blog")}>Blog</button>&nbsp;
        <button onClick={() => setSelectedTab("book")}>Books</button>&nbsp;
        <button onClick={() => setSelectedTab("course")}>Courses</button>
      </div>

      <hr />

      {/* 2. Using Element Variable */}
      {content}

      {/* 3. Ternary Operator Example */}
      <div style={{ marginTop: '30px' }}>
        <h4>{selectedTab === "book" ? "You're viewing Books" : "You're not viewing Books"}</h4>
      </div>

      {/* 4. Short-Circuit && Rendering */}
      {selectedTab === "course" && (
        <div>
          <p>👆 These are available programming courses!</p>
        </div>
      )}
    </div>
  );
}

export default App;
