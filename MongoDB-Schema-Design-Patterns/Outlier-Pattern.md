# Outlier Pattern

The **Outlier Pattern** is used when a small percentage of your data (the "outliers") doesn't fit the standard schema design used for the other 99.9%.

---

## 🟢 The Problem (The "Celebrity" Issue)
On social media, a normal user might have 200 followers (easy to embed). But a celebrity might have 50 million followers. 
- If you embed followers for the celebrity, you hit the **16MB limit**.
- If you normalize *everyone*, you slow down the app for 99.9% of normal users.

---

## 🟢 The Solution
Design the schema for the **99.9%** (normal case), and use a flag to indicate if a document is an **outlier**.

### 🚀 Example: Social Media Followers
**Normal User (Embedded):**
```json
{
  "_id": "user123",
  "name": "Normal Person",
  "is_outlier": false,
  "followers": ["id1", "id2", "... up to 1000"]
}
```

**Celebrity (Outlier - Referenced):**
```json
{
  "_id": "star777",
  "name": "Superstar",
  "is_outlier": true,
  "followers": [] // Empty! Real data is in a separate 'Followers' collection
}
```

---

## ✅ Benefits:
- **Optimal Performance**: 99% of users get fast, embedded reads.
- **Safety**: Prevents documents from exploding in size and crashing the system.
- **Simplicity**: Application code only handles the "extra join" when `is_outlier === true`.

---

## 🌍 Real-World Use Case:
- **E-commerce**: A product that is a part of 10,000 bundles vs. normal products.
- **Social Media**: Influencers vs. Regular Users.
- **Corporate**: A "Global" project with 5,000 employees vs. small local projects.
