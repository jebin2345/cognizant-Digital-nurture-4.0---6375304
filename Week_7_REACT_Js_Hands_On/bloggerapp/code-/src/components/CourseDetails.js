import React from 'react';

function CourseDetails() {
  const courses = ['React Basics', 'Node.js Essentials', 'Spring Boot'];

  return (
    <div>
      <h3>🎓 Available Courses</h3>
      <ul>
        {courses.map((course, index) => (
          <li key={index}>{course}</li>
        ))}
      </ul>
    </div>
  );
}

export default CourseDetails;
