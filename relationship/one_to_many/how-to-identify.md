# How to Identify a 1:N Relationship

Identifying a **One-to-Many (1:N)** relationship is about understanding the "Ownership" and "Quantity" between two entities.

---

## 🟢 Identification Questions

### SQL (Relational DBs)
Ask yourself these questions:
1.  **Can one row in Table A have multiple associated rows in Table B?**
    - *Example*: One `Customer` can have many `Orders`.
2.  **Does each row in Table B belong to exactly one row in Table A?**
    - *Example*: Each `Order` belongs to only one `Customer`.
3.  **Is there a "Parent-Child" hierarchy?**
    - *Example*: The `Customer` exists independently, while `Orders` are created for that specific customer.

👉 **Enforcement**: Create a **Foreign Key** in Table B (the "Many" side) that points to the Primary Key of Table A (the "One" side).

---

### MongoDB (NoSQL)
Ask yourself:
1.  **Does one document in Collection A link to multiple documents in Collection B?**
    - *Example*: One `BlogPost` document has many `Comment` documents.
2.  **Is the "Many" side data large or likely to grow indefinitely?**
    - *If Yes*: Use **Referencing** (store Parent ID in the Child document).
    - *If No (and small)*: You might consider **Embedding** (storing an array of objects inside the Parent).
3.  **Do you need to query the "Many" items independently?**
    - *Example*: Do you need to find all `Comments` by a specific `User` regardless of the `BlogPost`? If yes, referencing is better.

👉 **Enforcement**: 
- **Referencing**: Store the Parent's `ObjectId` in each Child document.
- **Embedding**: Store an array of Child objects/IDs inside the Parent document (only if the array stays small).
