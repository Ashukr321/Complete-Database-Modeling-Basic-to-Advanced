# How to Identify a M:N Relationship

Identifying a **Many-to-Many (M:N)** relationship requires checking both directions of the association between two entities.

---

## 🟢 Identification Questions

Ask these questions for **both sides**:

1.  **Can one row/document in Table A have multiple associated items in Table B?**
    - *Example*: Can one `Student` enroll in many `Courses`? (Yes)
2.  **Can one row/document in Table B have multiple associated items in Table A?**
    - *Example*: Can one `Course` have many `Students` enrolled? (Yes)
3.  **Is the relationship "Symmetrical"?**
    - If both answers are "Yes", you have a Many-to-Many relationship.

---

## 🟢 Implementation Logic

### SQL (Relational DBs)
SQL **cannot** store multiple values in a single column (normalization rule). 
👉 **Enforcement**: You **MUST** use a **Junction Table** (also called a Join Table or Link Table). This table contains foreign keys for both Table A and Table B.

### MongoDB (NoSQL)
MongoDB offers flexibility:
1.  **Two-Way Referencing**: Store an array of IDs on both documents.
2.  **One-Way Referencing**: Store an array on only one side (usually the "most queried" side).
3.  **Linking Collection**: Create a separate collection for the relationship (similar to SQL).

👉 **Enforcement**: Choice depends on data volume and the need for extra "metadata" on the relationship.
