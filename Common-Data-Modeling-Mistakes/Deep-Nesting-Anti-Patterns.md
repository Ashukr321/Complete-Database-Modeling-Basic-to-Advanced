# Deep Nesting Anti-Patterns (MongoDB)

In MongoDB, it's tempting to nest everything inside a single document. But **Deep Nesting** is one of the most common NoSQL mistakes.

---

## 🟢 What is Deep Nesting?
Nesting objects inside objects inside arrays (e.g., more than 2-3 levels deep).

### 🚀 Example: The "Russian Doll" Document
```json
{
  "user": {
    "profile": {
      "social": {
        "links": [
          { "platform": "twitter", "stats": { "clicks": 100, "history": [...] } }
        ]
      }
    }
  }
}
```

---

## 🚫 Why it's a mistake:
1.  **Query Complexity**: Accessing `stats.history` inside the `links` array requires complex aggregation or positional operators (`$`).
2.  **Size Limits**: You quickly approach the **16MB BSON limit**.
3.  **Performance**: MongoDB must load the entire document into memory, even if you only need one nested field.
4.  **Immutability**: Updating a deeply nested field is slower and more error-prone.

---

## ✅ The Fix: "Flat is Better"
- **Keep it shallow**: Aim for a maximum of 2 levels of nesting.
- **Use Referencing**: If a nested object is becoming large or complex, move it to a separate collection.
- **Use the Extended Reference Pattern**: Only store the fields you need from the nested object.
