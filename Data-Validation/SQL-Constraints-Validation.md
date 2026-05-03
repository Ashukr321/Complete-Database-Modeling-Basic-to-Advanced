# SQL Constraints & Validation

In SQL databases, validation is enforced through **Constraints** directly on the table structure.

---

## 🟢 1. NOT NULL Constraint
Ensures that a column cannot have a `NULL` value.

```sql
CREATE TABLE users (
    id INT PRIMARY KEY,
    username VARCHAR(50) NOT NULL
);
```

---

## 🟢 2. UNIQUE Constraint
Ensures that all values in a column are different.

```sql
CREATE TABLE users (
    email VARCHAR(100) UNIQUE
);
```

---

## 🟢 3. CHECK Constraint
The `CHECK` constraint is used to limit the value range that can be placed in a column.

```sql
CREATE TABLE products (
    id INT PRIMARY KEY,
    name VARCHAR(100),
    price DECIMAL(10, 2),
    stock INT,
    -- Price must be positive, Stock cannot be negative
    CONSTRAINT chk_price CHECK (price > 0),
    CONSTRAINT chk_stock CHECK (stock >= 0)
);
```

---

## 🟢 4. ENUM Constraint
Restricts a column to a specific list of string values.

```sql
CREATE TABLE orders (
    id INT PRIMARY KEY,
    status ENUM('pending', 'shipped', 'delivered', 'cancelled')
);
```

---

## 🟢 5. DEFAULT Constraint
Provides a default value for a column if no value is specified.

```sql
CREATE TABLE users (
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE
);
```

---

## 💡 Comparison: SQL vs NoSQL Validation
- **SQL**: Rigid and structural. If a row doesn't meet the constraint, the database **rejects** the entire operation immediately.
- **NoSQL (Mongoose)**: Flexible and logic-based. Validation happens in the **application layer** (Mongoose) before the data reaches the database server.
