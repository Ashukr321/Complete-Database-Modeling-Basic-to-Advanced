# Bad Relationship Design

Choosing the wrong relationship type or placing the reference on the wrong side can lead to data loss and performance bottlenecks.

---

## 🟢 Mistake 1: One-to-Many via Embedding (The Array Growth)
Storing "Many" items inside an array in the "One" side document.

### 🚀 Example: Post with Comments Array
```json
{
  "title": "My Post",
  "comments": [ { "text": "Nice!" }, ... 10,000 more ]
}
```
**Problem**: The document will eventually crash when it hits 16MB.

---

## 🟢 Mistake 2: Missing the "Many" side reference
In a 1:N relationship, storing the reference in the "One" side instead of the "Many" side.

### 🚀 Example: User with Order References
`User: { _id: 1, order_ids: [101, 102, ...] }`
**Problem**: Every time a user makes an order, you have to update the massive User document.

---

## 🟢 Mistake 3: Inconsistent Foreign Keys (SQL)
Not using `FOREIGN KEY` constraints or ignoring `ON DELETE` logic.

### 🚀 Example: Orphaned Records
Deleting a `User` but leaving their `Orders` in the database.
**Result**: Your database is now full of "Orphaned" data that has no owner, causing bugs in reporting and UI.

---

## ✅ The Fix:
- **Always follow the "Many-Side Rule"** for 1:N relationships.
- **Use Referencing** for any relationship where the "Many" side can grow indefinitely.
- **Enforce Referential Integrity** using SQL constraints or Mongoose Middlewares for cleanup.
