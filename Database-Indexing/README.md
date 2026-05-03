# ⚡ Database Indexing Guide

Indexing is the most powerful tool for optimizing database performance. Without proper indexing, a database must scan every document or row (Collection Scan / Full Table Scan) to find a result, which is extremely slow for large datasets.

---

## 📂 Indexing Guides

| Guide | Description | Key Concept |
| :--- | :--- | :--- |
| **[Single & Compound Indexes](file:///e:/Job%20switch/backend/Complete-Database-Modeling-Basic-to-Advanced/Database-Indexing/Single-and-Compound-Indexes.md)** | Basics of indexing and multi-field optimization. | The ESR Rule |
| **[Specialized Indexes](file:///e:/Job%20switch/backend/Complete-Database-Modeling-Basic-to-Advanced/Database-Indexing/Specialized-Indexes.md)** | Multikey, TTL, Text, and Geospatial indexes. | Beyond Equality |
| **[Indexing Strategies](file:///e:/Job%20switch/backend/Complete-Database-Modeling-Basic-to-Advanced/Database-Indexing/Indexing-Strategies.md)** | Best practices and common pitfalls. | Selectivity |

---

## 🚀 Why Indexing Matters?

1.  **Speed**: Reduces query time from seconds to milliseconds.
2.  **Efficiency**: Minimizes disk I/O by keeping index data in RAM.
3.  **Sorting**: Indexes allow the database to return sorted results without a costly in-memory sort operation.
4.  **Uniqueness**: Enforces data integrity (e.g., unique email addresses).

---

## ⚠️ The Cost of Indexing

- **Disk Space**: Indexes consume additional storage.
- **Write Performance**: Every index must be updated whenever a document is inserted, updated, or deleted. **Too many indexes can slow down writes.**
- **Memory**: For best performance, indexes should fit in the system's RAM (WiredTiger Cache in MongoDB).

---

## 💡 Pro Tip for Senior Engineers
"Always use `.explain("executionStats")` in MongoDB or `EXPLAIN ANALYZE` in SQL to verify if your queries are actually using the indexes you created."
