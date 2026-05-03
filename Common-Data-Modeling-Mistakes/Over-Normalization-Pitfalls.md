# Over-Normalization Pitfalls

Normalization is great for data integrity, but **Over-Normalization** is a performance killer.

---

## 🟢 What is Over-Normalization?
It's the mistake of splitting data into so many small tables that even a simple request requires a massive amount of `JOIN` operations.

### 🚀 Example: The "Join Hell"
Instead of a `users` table, you have:
- `user_names`
- `user_emails`
- `user_passwords`
- `user_birthdays`
- `user_settings`

**Result**: To load a basic user profile, you need 5 joins. This increases CPU usage and query latency.

---

## 🚫 Why it's a mistake:
1.  **Complexity**: SQL queries become unreadable and hard to maintain.
2.  **Latency**: Every join adds processing time.
3.  **ORM Overhead**: Most ORMs generate inefficient queries when dealing with too many relationships.

---

## ✅ The Fix: "Pragmatic Normalization"
- Keep attributes that are **always accessed together** in the same table.
- Only split data into separate tables if it has a **different lifecycle** or is **optional/large**.
- Don't be afraid to **Denormalize** slightly if it saves a very frequent and costly join.
