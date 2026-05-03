# Single and Compound Indexes

Indexes are data structures that store a small portion of the data set in an easily traversable form.

---

## 🟢 1. Single Field Index
An index on a single field in a document/table.

### 🚀 Example (MongoDB):
```javascript
// Index on 'email' field
db.users.createIndex({ email: 1 });
```
- **Use case**: Queries that filter or sort by a single field.

---

## 🟢 2. Compound Index
An index on multiple fields. The **order of fields** in a compound index is extremely important.

### 🚀 Example:
```javascript
// Index on 'status' and 'createdAt'
db.orders.createIndex({ status: 1, createdAt: -1 });
```
- **Use case**: Queries that filter by status AND sort by date.

---

## 💡 The ESR Rule (Equality, Sort, Range)
This is the golden rule for ordering fields in a compound index to achieve maximum performance:

1.  **E - Equality**: Fields used for exact matches (e.g., `status: "A"`).
2.  **S - Sort**: Fields used for sorting (e.g., `sort({ price: 1 })`).
3.  **R - Range**: Fields used for range filters (e.g., `age: { $gt: 18 }`).

**Correct Order**: `{ equality_field: 1, sort_field: 1, range_field: 1 }`

---

## 🟢 3. Unique Index
Ensures that the indexed fields do not store duplicate values.

### 🚀 Example:
```javascript
db.users.createIndex({ username: 1 }, { unique: true });
```

---

## 🟢 4. Partial Index
Only indexes documents that meet a specific filter expression. This saves space.

### 🚀 Example:
```javascript
// Only index active users
db.users.createIndex(
  { email: 1 },
  { partialFilterExpression: { status: "active" } }
);
```
