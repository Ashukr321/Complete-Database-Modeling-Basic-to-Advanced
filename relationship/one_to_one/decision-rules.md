# Decision Rules: Which side should store the reference?

Choosing which table (SQL) or collection (NoSQL) holds the reference is the most critical part of 1:1 modeling. Use these **3 Golden Rules** and **Counter-Questions** to decide:

### 1. The "Optionality" Rule (The Weak vs. Strong Side)
The reference should almost always be stored on the **Optional (Dependent)** side.
- **Rule**: If Entity A can exist without Entity B, but Entity B *cannot* exist without Entity A, then **Entity B should store the reference**.
- **Counter-Question**: *"If I delete this record, which one should naturally disappear first?"*
- **Example**: A `User` can exist without a `Profile`, but a `Profile` makes no sense without a `User`. Therefore, `Profile` stores the `user_id`.

### 2. The "Lifecycle" Rule (Parent vs. Child)
The "Parent" entity should remain clean of "Child" references to maintain a clear hierarchy.
- **Rule**: The "Child" (the one created later or the one that depends on the parent) should point to the "Parent".
- **Counter-Question**: *"Which entity is the 'Root' of this business process?"*
- **Example**: In `Order` ↔ `Payment`, the `Order` is the root. The `Payment` is a result of the order. Thus, `Payment` stores the `order_id`.

### 3. The "Access & Security" Rule
Store the reference in the side that is accessed *less* frequently or requires *higher* security.
- **Rule**: Keep the main table "slim" for high-performance queries. Put the link in the "fat" or "sensitive" table.
- **Counter-Question**: *"Do I want to load this extra data every time I query the main entity?"*
- **Example**: `Employee` ↔ `BankDetails`. You query employees constantly for names/departments. You only need bank details for payroll. Store the `employee_id` in the `BankDetails` table.

---

## 🔹 Summary Checklist for Decision Making

| Question | If "Yes", store reference in... |
| :--- | :--- |
| Is this entity optional? | **This Entity** |
| Is this entity sensitive? | **This Entity** |
| Is this entity a "child" or "detail" of another? | **This Entity** |
| Do you want to avoid `NULL` values in the main table? | **The other (Detail) table** |
