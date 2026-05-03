# 🧩 MongoDB Schema Design Patterns

Schema design in MongoDB is not just about structure; it's about **performance, scalability, and application needs**. Senior Backend Engineers use specific patterns to solve complex data problems.

---

## 📂 Design Patterns Guide

| Pattern | Best Use Case | Goal |
| :--- | :--- | :--- |
| **[Embedding vs Referencing](file:///e:/Job%20switch/backend/Complete-Database-Modeling-Basic-to-Advanced/MongoDB-Schema-Design-Patterns/Embedding-vs-Referencing.md)** | General relationships | Data integrity vs Read speed. |
| **[Bucket Pattern](file:///e:/Job%20switch/backend/Complete-Database-Modeling-Basic-to-Advanced/MongoDB-Schema-Design-Patterns/Bucket-Pattern.md)** | Time-series / Large arrays | Reduce index size & improve queries. |
| **[Outlier Pattern](file:///e:/Job%20switch/backend/Complete-Database-Modeling-Basic-to-Advanced/MongoDB-Schema-Design-Patterns/Outlier-Pattern.md)** | Popularity / Skewed data | Handle "Celebrity" documents efficiently. |
| **[Extended Reference Pattern](file:///e:/Job%20switch/backend/Complete-Database-Modeling-Basic-to-Advanced/MongoDB-Schema-Design-Patterns/Extended-Reference-Pattern.md)** | Frequently joined data | Avoid costly $lookup operations. |

---

## 🚀 Why Use These Patterns?

1.  **Optimize for Queries**: MongoDB performs best when data is "together" for specific read patterns.
2.  **Avoid 16MB Limit**: Patterns like *Bucket* prevent single documents from growing too large.
3.  **Reduce Latency**: *Extended Reference* reduces the need for application-level joins or server-side $lookups.
4.  **Handle Skew**: *Outlier Pattern* ensures that 0.1% of "heavy" users don't degrade performance for the other 99.9%.

---

## 💡 The "Data Rules" of MongoDB Design

- **Data that is accessed together should be stored together.**
- **Avoid $lookup (joins) whenever possible** by denormalizing intelligently.
- **Design for READS first**, as most applications are read-heavy.
- **Don't fear duplication**; fear performance degradation.
