# Advanced ER Concepts

Beyond basic entities and lines, real systems need **weak entities, associative entities, recursive and ternary relationships, and inheritance**. Each concept below is shown in both notations where it helps.

---

## 🟢 1. Weak Entity in Crow's Foot

In Chen it is a double rectangle. In Crow's Foot it is a **solid (identifying) line** and a **composite primary key**.

```mermaid
erDiagram
  EMPLOYEE ||--o{ DEPENDENT : supports
  EMPLOYEE {
    int id PK
    string name
  }
  DEPENDENT {
    int employee_id PK, FK
    string name PK "partial key"
    string relation
  }
```

```sql
CREATE TABLE dependents (
  employee_id INT NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
  name        VARCHAR(100) NOT NULL,
  relation    VARCHAR(30),
  PRIMARY KEY (employee_id, name)
);
```

- `ON DELETE CASCADE` → when the owner goes, the weak entity goes too.

---

## 🟢 2. Associative Entity (Junction with Its Own Data)

When an **M:N relationship has attributes**, it becomes an entity of its own.

```mermaid
erDiagram
  STUDENT ||--o{ ENROLLMENT : makes
  COURSE  ||--o{ ENROLLMENT : "is taken in"
  ENROLLMENT {
    int student_id PK, FK
    int course_id PK, FK
    string grade
    date enrolled_on
  }
```

- **MongoDB:** keep it as a separate `enrollments` collection when it has its own data or grows without bound (see **[Many-to-Many](../relationship/many_to_many/many-to-many.md)**).

---

## 🟢 3. Recursive (Unary) Relationship

An entity related to **itself**: managers, folders, comment replies, category trees.

### Chen
```mermaid
flowchart LR
  E[EMPLOYEE] ---|1 manager| R{MANAGES}
  R ---|N report| E
```

### Crow's Foot
```mermaid
erDiagram
  CATEGORY |o--o{ CATEGORY : "parent of"
  CATEGORY {
    int id PK
    int parent_id FK "NULL for root"
    string name
  }
```

- **Role names** (`manager`, `report`) tell you which side is which.

---

## 🟢 4. Ternary Relationship (Three Entities)

Some facts need **three entities at once**: *a doctor prescribes a medicine to a patient*.

### Chen (one diamond, three lines)
```mermaid
flowchart LR
  D[DOCTOR] --- R{PRESCRIBES}
  P[PATIENT] --- R
  M[MEDICINE] --- R
  R --- q([dosage])
```

### Crow's Foot (resolve into an associative entity)
```mermaid
erDiagram
  DOCTOR   ||--o{ PRESCRIPTION : writes
  PATIENT  ||--o{ PRESCRIPTION : receives
  MEDICINE ||--o{ PRESCRIPTION : "appears in"
  PRESCRIPTION {
    int id PK
    int doctor_id FK
    int patient_id FK
    int medicine_id FK
    string dosage
  }
```

> ⚠️ Three separate binary relationships (doctor–patient, doctor–medicine, patient–medicine) **lose information**: you can no longer tell *which doctor* prescribed *which medicine* to *which patient*.

---

## 🟢 5. Specialization / Generalization (Inheritance)

### Chen / EER (ISA)
```mermaid
flowchart TB
  P[PAYMENT] --- T{{"ISA (disjoint, total)"}}
  T --- C[CARD_PAYMENT]
  T --- U[UPI_PAYMENT]
  T --- W[WALLET_PAYMENT]
```

| Constraint | Meaning |
| :--- | :--- |
| **Disjoint (d)** | An instance belongs to **only one** subtype |
| **Overlapping (o)** | An instance can belong to **several** subtypes |
| **Total** (double line) | Every supertype instance **must** be in a subtype |
| **Partial** (single line) | A supertype instance **may** be in no subtype |

### Three ways to map ISA to tables

**a) Single table (one table + type column)**
```mermaid
erDiagram
  PAYMENT {
    int id PK
    string type "card | upi | wallet"
    decimal amount
    string card_last4 "NULL unless card"
    string upi_id "NULL unless upi"
  }
```

**b) Class table (supertype + one table per subtype, shared PK)**
```mermaid
erDiagram
  PAYMENT ||--o| CARD_PAYMENT : "is a"
  PAYMENT ||--o| UPI_PAYMENT : "is a"
  PAYMENT {
    int id PK
    decimal amount
  }
  CARD_PAYMENT {
    int payment_id PK, FK
    string card_last4
  }
  UPI_PAYMENT {
    int payment_id PK, FK
    string upi_id
  }
```

**c) Concrete table (one full table per subtype, no supertype table)**
```mermaid
erDiagram
  CARD_PAYMENT {
    int id PK
    decimal amount
    string card_last4
  }
  UPI_PAYMENT {
    int id PK
    decimal amount
    string upi_id
  }
```

| Strategy | ✅ Pros | ❌ Cons |
| :--- | :--- | :--- |
| Single table | Fast reads, no joins | Many `NULL` columns, weak constraints |
| Class table | Clean, fully normalized | Join for every read |
| Concrete table | No joins, no `NULL`s | "All payments" query needs `UNION` |
| **MongoDB** | One collection with a `type` field (*polymorphic pattern*) | Validate each shape with schema validation |

---

## 🟢 6. Cardinality vs Participation (Min/Max Notation)

Some tools write `(min, max)` next to each entity instead of symbols.

```mermaid
flowchart LR
  E[EMPLOYEE] ---|"(0,1)"| R{MANAGES} ---|"(1,1)"| D[DEPARTMENT]
```

**Read it as:** an employee manages **0 to 1** departments; a department is managed by **exactly 1** employee.

| (min, max) | Crow's Foot |
| :--- | :--- |
| (0, 1) | `\|o` |
| (1, 1) | `\|\|` |
| (0, N) | `o{` |
| (1, N) | `\|{` |

---

## 💡 Senior Engineer Tip:
"If a relationship starts collecting its own attributes (dates, status, amounts), stop drawing it as a line. **Promote it to an entity.** It almost always becomes a table you will query on its own."
