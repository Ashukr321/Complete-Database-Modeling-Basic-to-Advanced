# Specialized Indexes

MongoDB provides several specialized index types for specific data structures and use cases.

---

## 🟢 1. Multikey Index (Indexing Arrays)
If you index a field that contains an array, MongoDB creates an index key for **each element** in the array.

### 🚀 Example:
```javascript
// Post has an array of tags: ["tech", "nodejs"]
db.posts.createIndex({ tags: 1 });
```
- **Use case**: Finding posts that contain a specific tag.

---

## 🟢 2. TTL Index (Time-To-Live)
A special single-field index that MongoDB uses to **automatically remove documents** from a collection after a certain amount of time.

### 🚀 Example:
```javascript
// Automatically delete sessions after 1 hour (3600 seconds)
db.sessions.createIndex({ createdAt: 1 }, { expireAfterSeconds: 3600 });
```
- **Use case**: Sessions, temporary logs, OTPs.

---

## 🟢 3. Text Index
Used for searching string content in a collection. It supports searching for words and phrases.

### 🚀 Example:
```javascript
db.products.createIndex({ name: "text", description: "text" });

// Querying
db.products.find({ $text: { $search: "iphone case" } });
```
- **Use case**: Search bars, finding keywords in articles.

---

## 🟢 4. Geospatial Index
Used for location-based queries like "find restaurants near me".

### 🚀 Example:
```javascript
// 2dsphere index for Earth-like geometry
db.places.createIndex({ location: "2dsphere" });
```
- **Use case**: Google Maps style features, Uber-like tracking.

---

## 🟢 5. Hashed Index
Stores the hash of the value of a single field.

### 🚀 Example:
```javascript
db.users.createIndex({ _id: "hashed" });
```
- **Use case**: Sharding (distributing data across servers evenly).
