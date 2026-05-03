// Use Case: Simple Many-to-Many using arrays of references.
// Best for: Small scale relationships (e.g., Songs in a Playlist).

const mongoose = require('mongoose');

// Student Schema
const studentSchema = new mongoose.Schema({
    name: String,
    // Array of Course IDs
    courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }]
});

const Student = mongoose.model('Student', studentSchema);

// Course Schema
const courseSchema = new mongoose.Schema({
    title: String,
    // Array of Student IDs
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }]
});

const Course = mongoose.model('Course', courseSchema);

/**
 * CRUD Operations (Array Approach)
 */
async function enrollStudent(studentId, courseId) {
    // Add Course to Student's list
    await Student.findByIdAndUpdate(studentId, { $addToSet: { courses: courseId } });
    // Add Student to Course's list
    await Course.findByIdAndUpdate(courseId, { $addToSet: { students: studentId } });
}

async function getStudentCourses(studentId) {
    // Populate the array of IDs with actual Course documents
    return await Student.findById(studentId).populate('courses');
}

module.exports = { Student, Course };
