# Decision Rules: Where to store the reference?

In a **One-to-Many (1:N)** relationship, deciding where the reference goes is simpler than in 1:1, but still follows strict logic.

---

## 💡 The Golden Rule
> **In one-to-many relationships, the reference almost always goes in the "Many" side (the Child).**

---

### 1. The "Many" Side Placement (Standard)
- **Logic**: Since one Parent has many Children, it's more efficient for each Child to point back to its single Parent.
- **Why?**: If you store an array of Child IDs in the Parent, the Parent document might exceed the size limit (in NoSQL) or become hard to manage (in SQL).
- **Example**: In `Customer` ↔ `Orders`, each `Order` stores a `customer_id`.

### 2. When to store references in the "One" Side (Parent)?
In MongoDB, you might store an array of IDs in the Parent **only if**:
- The "Many" side is **fixed and small** (e.g., a `User` having a few `SocialMediaLinks`).
- You always need to load the list of children whenever you load the parent.
- **Warning**: Avoid this if the list can grow to hundreds or thousands of items (The "16MB Document Limit" rule).

---

## 🔹 Counter-Questions for Decision Making

1. **"Does each Child belong to ONLY one Parent?"**
   - If Yes → This is a standard 1:N. The Child stores the Parent ID.
2. **"How many Children will there be?"**
   - If Thousands → **Must** use referencing in the Child side.
   - If 2-5 (Fixed) → You can consider embedding or storing IDs in the Parent.
3. **"Do I need to query the Child alone?"**
   - If you need to find all `Comments` by a specific `User` (across different posts), then `Comments` should definitely store the `user_id`.

---

## 🔹 Summary Table

| Scenario | Best Approach | Reference Location |
| :--- | :--- | :--- |
| **Standard 1:N** (e.g., Orders) | Referencing | **Child (Many side)** |
| **Small/Fixed List** (e.g., Tags) | Embedding / Array | **Parent (One side)** |
| **High Security** | Referencing | **Child (Many side)** |
| **Independent Life Cycle** | Referencing | **Child (Many side)** |
