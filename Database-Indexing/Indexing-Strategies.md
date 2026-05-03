# Indexing Strategies

Effective indexing requires a balance between query speed and write performance.

---

## 🟢 1. Selectivity
**Selectivity** is the ability of an index to narrow down the search results.
- **High Selectivity**: A field with many unique values (e.g., `email`, `user_id`). **Best for indexing.**
- **Low Selectivity**: A field with few unique values (e.g., `gender`, `is_active`). **Poor for indexing.**

---

## 🟢 2. Covered Queries
A query is "covered" if the index contains **all the fields** required by the query. MongoDB doesn't need to look at the actual documents at all.

### 🚀 Example:
- **Index**: `{ name: 1, age: 1 }`
- **Query**: `db.users.find({ name: "John" }, { name: 1, age: 1, _id: 0 })`
- **Result**: Extremely fast because the database only reads the index.

---

## 🟢 3. Indexing for Sorting
If your query includes a `.sort()`, the database will try to use an index to avoid an **In-Memory Sort**. In-memory sorts are limited to 32MB; if your sort exceeds this, the query will fail unless you have an index.

---

## 🟢 4. Common Pitfalls
1.  **Index Overkill**: Creating an index for every field. This slows down every write operation.
2.  **Wrong Order in Compound Index**: Putting a Range field before an Equality field.
3.  **Case Sensitivity**: By default, indexes are case-sensitive. Use **Collation** if you need case-insensitive indexing.
4.  **Indexing Small Collections**: If a collection has only 100 documents, an index might actually be slower than a full collection scan.

---

## 🛠️ Performance Tuning Checklist
- [ ] Use `explain()` to check for `IXSCAN` (Index Scan) vs `COLLSCAN` (Collection Scan).
- [ ] Monitor index usage using `db.collection.aggregate([ { $indexStats: {} } ])`.
- [ ] Remove unused indexes to improve write speed.
- [ ] Ensure indexes fit in RAM.
