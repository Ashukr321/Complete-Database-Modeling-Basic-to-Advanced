# Embedding vs Referencing Pattern

This is the most fundamental decision in MongoDB schema design. It determines how related data is stored.

---

## 🟢 1. Embedding (Denormalization)
Storing related data inside a single document (nested objects or arrays).

### ✅ Use Case:
- **One-to-One** relationships (User ↔ Profile).
- **One-to-Few** relationships (Post ↔ 5-10 Tags).
- Data that is **always read together**.
- Data that has a **similar lifecycle** (e.g., LineItems in an Invoice).

### 🚀 Example:
```json
{
  "_id": "user123",
  "name": "John Doe",
  "address": {
    "street": "123 Main St",
    "city": "New York",
    "zip": "10001"
  }
}
```

---

## 🟢 2. Referencing (Normalization)
Storing data in separate collections and linking them via `ObjectId`.

### ✅ Use Case:
- **One-to-Many** where "Many" is large (Post ↔ 10,000 Comments).
- **Many-to-Many** relationships (Students ↔ Courses).
- Data that is **accessed independently**.
- Data that is **updated frequently** and shared across multiple entities.

### 🚀 Example:
```json
// Users collection
{ "_id": "user123", "name": "John Doe" }

// Orders collection
{ "_id": "order456", "user_id": "user123", "total": 500 }
```

---

## 📊 Decision Matrix

| Factor | Embedding | Referencing |
| :--- | :--- | :--- |
| **Read Speed** | Very Fast (Single query) | Slower (Requires $lookup) |
| **Data Integrity** | Harder to keep consistent | Easier (One source of truth) |
| **Document Size** | Risk of hitting 16MB | No risk (Data is split) |
| **Relationship** | 1:1 or 1:Few | 1:Many or M:N |

---

## 💡 Senior Engineer Tip:
"Embed for high-performance reads of tightly coupled data. Reference for scalability and data integrity of independent entities."
