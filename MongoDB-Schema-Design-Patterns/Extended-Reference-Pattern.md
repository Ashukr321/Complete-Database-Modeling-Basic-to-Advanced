# Extended Reference Pattern

The **Extended Reference Pattern** is used to avoid frequent joins ($lookup) by duplicating just the **most important fields** from a referenced document.

---

## 🟢 The Problem
In a normalized schema, you often store just an `id`. But on a "Recent Orders" page, you almost always need the `customer_name`. 
- If you only store `customer_id`, you must perform a **$lookup** for every order.
- On a high-traffic site, thousands of joins per second will kill performance.

---

## 🟢 The Solution
Store the `id` **PLUS** a few fields that you query 99% of the time.

### 🚀 Example: Order ↔ Customer
**Standard Reference (Normalization):**
```json
{
  "_id": "order1",
  "customer_id": "cust123",
  "total": 500
}
```

**Extended Reference (Denormalization):**
```json
{
  "_id": "order1",
  "customer": {
    "id": "cust123",
    "name": "John Doe",
    "email": "john@example.com"
  },
  "total": 500
}
```

---

## ✅ Benefits:
- **Zero Joins**: You get the customer name directly from the order document.
- **Extreme Performance**: Ideal for "List Views" (Order history, Comment lists, etc.).
- **Data Stability**: Even if the customer changes their name *later*, the order history remains a "snapshot" of who they were at the time of purchase.

---

## ⚠️ The Trade-off (Consistency)
If the customer updates their name, you must decide:
1.  Do you need to update all past orders? (Slow write).
2.  Is it okay if old orders have the old name? (Snapshotting - usually okay for orders).

---

## 🌍 Real-World Use Case:
- **E-commerce**: Storing product name and thumbnail in the Order document.
- **Blog**: Storing author name and avatar in the Comment document.
- **Movie App**: Storing the movie title in the Review document.
