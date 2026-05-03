# LMS & Healthcare Entity Designs

### 10. Course Entity
- **Purpose**: Curriculum structure.
- **SQL**: `id`, `title`, `instructor_id (FK)`, `price`, `difficulty_level`.
- **NoSQL**: `{ _id, title, instructor, modules: [ {title, duration} ] }`.

### 11. Lesson Entity
- **Purpose**: Granular content.
- **SQL**: `id`, `course_id (FK)`, `title`, `video_url`, `order_index`.
- **NoSQL**: `{ _id, course_id, title, content_type: 'video', data: {} }`.

### 12. Enrollment Entity
- **Purpose**: M:N Junction.
- **SQL**: `id`, `student_id (FK)`, `course_id (FK)`, `progress_percentage`.
- **NoSQL**: `{ _id, student_id, course_id, status: 'active', completed_lessons: [] }`.

### 13. Patient Entity
- **Purpose**: Healthcare identity.
- **SQL**: `id`, `name`, `blood_group`, `emergency_contact`, `history_summary`.
- **NoSQL**: `{ _id, name, medical_info: { allergies: [], blood: '' } }`.

### 14. Appointment Entity
- **Purpose**: Scheduling.
- **SQL**: `id`, `doctor_id (FK)`, `patient_id (FK)`, `scheduled_time`, `status`.
- **NoSQL**: `{ _id, doctor, patient, slot: Date, notes: '' }`.
