// Use Case: Complex Many-to-Many using a Junction Collection.
// Best for: Large scale relationships or when you need metadata (e.g., Enrollment Date).

const mongoose = require('mongoose');

// Student Schema (Clean)
const studentSchema = new mongoose.Schema({
    name: String,
    email: String
});
const Student = mongoose.model('Student', studentSchema);

// Course Schema (Clean)
const courseSchema = new mongoose.Schema({
    title: String,
    credits: Number
});
const Course = mongoose.model('Course', courseSchema);

// Enrollment Schema (The Junction Collection)
const enrollmentSchema = new mongoose.Schema({
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    enrolledAt: { type: Date, default: Date.now },
    grade: String,
    status: { type: String, enum: ['active', 'completed', 'dropped'], default: 'active' }
});

// Important: Indexing for performance
enrollmentSchema.index({ student: 1, course: 1 }, { unique: true });

const Enrollment = mongoose.model('Enrollment', enrollmentSchema);

/**
 * CRUD Operations (Junction Approach)
 */
async function createEnrollment(studentId, courseId, grade) {
    return await Enrollment.create({
        student: studentId,
        course: courseId,
        grade: grade
    });
}

async function getStudentCourses(studentId) {
    // Find all enrollment documents for the student and populate course details
    return await Enrollment.find({ student: studentId }).populate('course');
}

module.exports = { Student, Course, Enrollment };
