# Many-to-Many (M:N) Relationship

In a **Many-to-Many (M:N)** relationship, multiple records in **Table A** are associated with multiple records in **Table B**. 

Unlike 1:1 or 1:N where the reference placement is clear, M:N relationships require a more strategic approach because both sides are "Many".

---

## 🟢 Modeling Approaches

There are two primary ways to handle M:N relationships:

1.  **Direct Reference (Arrays)**: Each side stores an array of IDs from the other side.
    - *Best for*: Small scale, simple connections (e.g., Songs ↔ Playlists).
2.  **Junction/Linking Entity**: A third table or collection is created specifically to manage the relationship.
    - *Best for*: Large scale, complex data where you need to store extra info about the link (e.g., Students ↔ Courses with a `grade` field).

---

## 🟢 Identification & Decision Rules

Learn how to identify M:N relationships and choose the best implementation strategy:
👉 **[How to Identify a M:N Relationship](file:///e:/Job%20switch/backend/Complete-Database-Modeling-Basic-to-Advanced/relationship/many_to_many/how-to-identify.md)**
👉 **[Decision Rules: Array vs. Junction Collection](file:///e:/Job%20switch/backend/Complete-Database-Modeling-Basic-to-Advanced/relationship/many_to_many/decision-rules.md)**

---

## 🌍 Real-Life M:N Use Cases

| # | Entity A | Entity B | Relationship Context |
| --- | --- | --- | --- |
| 1 | **Student** | **Course** | Enrolling in multiple classes. |
| 2 | **User** | **Role** | A user having multiple permissions/roles. |
| 3 | **Author** | **Book** | Co-authored books. |
| 4 | **Actor** | **Movie** | Multiple actors in multiple films. |
| 5 | **Product** | **Order** | An order contains many products; products appear in many orders. |
| 6 | **Tag** | **Post** | Blog posts having multiple tags. |
| 7 | **Doctor** | **Hospital** | Doctors visiting multiple clinics. |
| 8 | **Developer** | **Project** | Multiple devs working on multiple repos. |
| 9 | **Customer** | **Promotion** | Customers using various discount codes. |
| 10 | **Ingredient** | **Recipe** | Ingredients used in many dishes. |

---

## 🔹 ERD Symbol (Crow’s Foot Notation)

```
[Entity A] >———< [Entity B]
```
- `<` and `>` (Crow's Feet) on both sides indicate the Many-to-Many nature.
