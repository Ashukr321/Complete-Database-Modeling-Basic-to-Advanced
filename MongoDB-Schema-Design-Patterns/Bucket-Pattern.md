# Bucket Pattern

The **Bucket Pattern** is used to group data together into "buckets" (documents) based on a specific criteria, usually **time** or **count**.

---

## 🟢 The Problem
In time-series data (e.g., IoT sensors, stock prices), creating a separate document for every single reading leads to:
1.  **Massive Index Size**: Every document needs an entry in the index.
2.  **Poor Query Performance**: Scanning millions of documents is slow.

---

## 🟢 The Solution (Bucketing)
Instead of 1 document per reading, we store **multiple readings** in a single document (e.g., all readings for one hour).

### 🚀 Example: IoT Sensor Data
**Before (One doc per reading - Anti-pattern):**
```json
{ "sensor_id": "A1", "temp": 22, "time": "10:00:01" }
{ "sensor_id": "A1", "temp": 23, "time": "10:00:02" }
```

**After (Bucket Pattern - 1 doc per hour):**
```json
{
  "sensor_id": "A1",
  "start_time": "10:00:00",
  "end_time": "10:59:59",
  "measurements": [
    { "temp": 22, "t": "00:01" },
    { "temp": 23, "t": "00:02" }
  ],
  "count": 2,
  "avg_temp": 22.5
}
```

---

## ✅ Benefits:
- **Smaller Indexes**: Fewer documents means smaller indexes that fit in RAM.
- **Faster Reads**: You retrieve 60 readings in a single IO operation.
- **Pre-computed Aggregates**: You can store `avg`, `min`, `max` directly in the bucket.

---

## 🌍 Real-World Use Case:
- **Stock Market**: Grouping tick data into 1-minute or 5-minute candles.
- **Activity Feed**: Grouping a user's logs by day.
- **Chat Apps**: Grouping messages by "room_id" and "day".
