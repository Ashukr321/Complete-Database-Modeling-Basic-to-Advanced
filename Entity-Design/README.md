# Entity Design Examples

This folder contains 20+ real-world entity design examples across various domains. Each example includes the **Schema (SQL/NoSQL)** and the **Reasoning** behind the design.

## 📂 Core Concepts

- 👉 **[Normalization vs Denormalization](file:///e:/Job%20switch/backend/Complete-Database-Modeling-Basic-to-Advanced/Normalization-vs-Denormalization/Normalization-vs-Denormalization.md)**

## 📂 Domains Covered

1.  **E-commerce** (User, Product, Order, Category)
2.  **Social Media** (Post, Comment, Like, Follow)
3.  **LMS (Education)** (Course, Lesson, Enrollment, Quiz)
4.  **Healthcare** (Patient, Doctor, Appointment, Prescription)
5.  **Finance/Banking** (Account, Transaction, Loan, KYC)
6.  **HR/Corporate** (Employee, Department, Project, Salary)
7.  **Logistics** (Shipment, Vehicle, Warehouse, Driver)

---

## 🟢 Entity Design List

| # | Entity Name | Primary Domain | Core Purpose |
| :--- | :--- | :--- | :--- |
| 1 | **User** | Core / Auth | Basic authentication and identity. |
| 2 | **UserProfile** | Core / Social | Optional detailed personal information. |
| 3 | **Product** | E-commerce | Item details, pricing, and stock. |
| 4 | **Category** | E-commerce | Hierarchical grouping of products. |
| 5 | **Order** | E-commerce | Transactional record of a purchase. |
| 6 | **OrderItem** | E-commerce | Individual line items within an order. |
| 7 | **Review** | E-commerce / Social | User feedback and ratings. |
| 8 | **Cart** | E-commerce | Temporary storage for potential purchases. |
| 9 | **Post** | Social Media | User-generated content (Text/Media). |
| 10 | **Comment** | Social Media | Nested or flat responses to posts. |
| 11 | **Course** | LMS | Educational program structure. |
| 12 | **Lesson** | LMS | Specific instructional units. |
| 13 | **Enrollment** | LMS | Junction entity for Students and Courses. |
| 14 | **Patient** | Healthcare | Medical records and identity. |
| 15 | **Appointment** | Healthcare | Scheduling between doctors and patients. |
| 16 | **Account** | Finance | Financial balance and type. |
| 17 | **Transaction** | Finance | Immutable record of money movement. |
| 18 | **Employee** | HR | Staff management and hierarchy. |
| 19 | **Department** | HR | Organizational structure. |
| 20 | **Project** | HR / Dev | Collaborative work units. |
| 21 | **Warehouse** | Logistics | Physical storage location. |
| 22 | **Shipment** | Logistics | Tracking movement of goods. |

---

## 💡 Best Practices for Entity Design

- **Atomicity**: Each field should store only one piece of data.
- **Normalization**: Reduce redundancy by splitting entities (SQL).
- **Denormalization**: Embed small, related data for performance (NoSQL).
- **Naming Conventions**: Use consistent `snake_case` or `camelCase`.
- **Primary Keys**: Always use a unique identifier (UUID/ObjectId/Auto-increment).
