# Many-to-One (N:1) Relationship

A **Many-to-One (N:1)** relationship is essentially the same as a One-to-Many (1:N) relationship, but viewed from a different perspective. 

---

## 🟢 1:N vs N:1 – What's the Difference?

The **database implementation** is identical. The only difference is the **perspective** of the data model and the **querying focus**.

| Perspective | Description | Focus | Example |
| :--- | :--- | :--- | :--- |
| **1:N (One-to-Many)** | "One parent has many children" | **Parent-centric**: Get all children of a parent. | Customer → Orders |
| **N:1 (Many-to-One)** | "Many children belong to one parent" | **Child-centric**: Get the parent of a specific child. | Orders → Customer |

---

## 💡 Key Rule
> **Regardless of the perspective (1:N or N:1), the reference is ALWAYS stored on the "Many" (Child) side.**

---

## 🟢 Identification & Decision Rules

Check these guides for more details:
👉 **[How to Identify a N:1 Relationship](file:///e:/Job%20switch/backend/Complete-Database-Modeling-Basic-to-Advanced/relationship/many_to_one/how-to-identify.md)**
👉 **[Decision Rules: Where to store the reference?](file:///e:/Job%20switch/backend/Complete-Database-Modeling-Basic-to-Advanced/relationship/many_to_one/decision-rules.md)**

---

## 🌍 Real-Life N:1 Perspective Examples

In these examples, the focus is on the **Child** knowing its **Parent**:

1.  **Orders → Customer**: Every order must know which customer placed it.
2.  **Employees → Company**: Every employee belongs to a single company.
3.  **Comments → BlogPost**: Every comment is attached to a specific post.
4.  **Reviews → Product**: Every review is for a specific product.
5.  **Lessons → Course**: Every lesson is part of a specific course.
6.  **Payments → Invoice**: Every payment is linked to a specific invoice.
7.  **Doctors → Hospital**: Every doctor works for a specific hospital.
8.  **Students → Teacher**: Many students are assigned to one teacher.
9.  **Products → Category**: Every product belongs to a specific category.
10. **Attendees → Event**: Many attendees are registered for one event.
