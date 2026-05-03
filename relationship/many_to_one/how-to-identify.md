# How to Identify a Many-to-One (N:1) Relationship

Identifying a **Many-to-One (N:1)** relationship involves looking at the dependent (child) entity and its connection to a parent.

---

## 🟢 Identification Questions

### SQL (Relational DBs)
Ask yourself these questions from the **Child's perspective**:
1.  **Does each row in Table B (Child) belong to exactly one row in Table A (Parent)?**
    - *Example*: Does each `Order` belong to only one `Customer`?
2.  **Can multiple rows in Table B share the same Parent in Table A?**
    - *Example*: Can many `Orders` belong to the same `Customer`?
3.  **Is Table B dependent on Table A for its existence or context?**
    - *Example*: Does a `Comment` lose its context if the `BlogPost` is deleted?

👉 **Enforcement**: Place the **Foreign Key** in Table B (the "Many" side) pointing to Table A (the "One" side).

---

### MongoDB (NoSQL)
Ask yourself:
1.  **Do many documents in Collection B need to link back to a single document in Collection A?**
    - *Example*: Many `Employee` documents linking back to one `Company`.
2.  **Is the "One" side document accessed frequently through the "Many" side?**
    - *Example*: When viewing an `Order`, do you always need the `Customer` details?
3.  **Does the "Many" side have a high volume of documents?**
    - *If Yes*: You **must** store the reference in the "Many" side to avoid hitting document size limits in the "One" side.

👉 **Enforcement**: Store the Parent's `ObjectId` in each document of the "Many" (Child) collection.
