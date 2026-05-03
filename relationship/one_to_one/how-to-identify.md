# How to Identify a 1:1 Relationship

Identifying a **One-to-One (1:1)** relationship requires asking specific questions about your data entities and their business logic.

---

## 🟢 Identification Questions

### SQL (Relational DBs)
Ask yourself these 3 questions to confirm a 1:1 relationship in SQL:

1.  **Does each row in Table A map to exactly one row in Table B?**
    - *Example*: One `user` → one `profile`.
2.  **Will Table B’s row exist only if Table A’s row exists?**
    - *Example*: A `profile` cannot exist without a `user`.
3.  **Do I want to split optional/sensitive columns into a separate table for normalization?**
    - *Example*: Store `medical_details` in a separate table instead of inside `employees`.

👉 **Enforcement**: Use two tables where the dependent table has a `FOREIGN KEY` that is also marked as `UNIQUE`.

---

### MongoDB (NoSQL)
Ask yourself these 3 questions to confirm a 1:1 relationship in MongoDB:

1.  **Does each document in Collection A link to exactly one document in Collection B?**
    - *Example*: One `user` document → one `profile` document.
2.  **Can Collection B’s document exist without Collection A’s document?**
    - *Example*: A `profile` should not exist without its `user`.
3.  **Should I embed the data (if always present & small) or reference it (if optional, sensitive, or large)?**
    - **Embed**: If the data is always needed (tight coupling).
    - **Reference**: If the data is optional, large, or secured separately.

👉 **Enforcement**: Use either an **Embedded schema** inside the parent document or a **Referenced schema** with `{ unique: true }` on the foreign key field.
