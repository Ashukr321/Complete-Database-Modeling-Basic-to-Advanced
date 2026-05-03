# One-to-Many (1:N) Relationship

In a **One-to-Many (1:N)** relationship, a single record in **Table A** can be linked to **many records** in **Table B**, but each record in **Table B** is linked to **only one record** in **Table A**.

---

## 🟢 Overview

- **Parent (One)**: The primary entity (e.g., Customer).
- **Child (Many)**: The dependent entities (e.g., Orders).
- **Reference**: In almost all cases, the **"Many" side (Child)** stores the reference (Foreign Key) to the **"One" side (Parent)**.

---

## 🟢 Identification & Decision Rules

To understand how to spot 1:N relationships and where to place the references, check these guides:
👉 **[How to Identify a 1:N Relationship](file:///e:/Job%20switch/backend/Complete-Database-Modeling-Basic-to-Advanced/relationship/one_to_many/how-to-identify.md)**
👉 **[Decision Rules: Where to store the reference?](file:///e:/Job%20switch/backend/Complete-Database-Modeling-Basic-to-Advanced/relationship/one_to_many/decision-rules.md)**

---

## 🌍 Real-Life 1-to-Many Use Cases

| # | Parent (One) | Child (Many) | Reference Direction |
| --- | --- | --- | --- |
| 1 | **User** | Orders | `orders --> users` |
| 2 | **User** | Addresses | `addresses --> users` |
| 3 | **BlogPost** | Comments | `comments --> blogposts` |
| 4 | **Product** | Reviews | `reviews --> products` |
| 5 | **Teacher** | Students | `students --> teachers` |
| 6 | **Course** | Lessons | `lessons --> courses` |
| 7 | **Invoice** | Payments | `payments --> invoices` |
| 8 | **Hospital** | Doctors | `doctors --> hospitals` |
| 9 | **Doctor** | Appointments | `appointments --> doctors` |
| 10 | **Student** | Assignments | `assignments --> students` |
| 11 | **Category** | Products | `products --> categories` |
| 12 | **Company** | Employees | `employees --> companies` |
| 13 | **Event** | Attendees | `attendees --> events` |
| 14 | **Library** | Books | `books --> libraries` |
| 15 | **Seller** | Products | `products --> sellers` |

---

## 🔹 ERD Symbol (Crow’s Foot Notation)

```
[Parent] |———< [Child]
```
- `|` → One
- `<` (Crow’s Foot) → Many
