// Mermaid diagrams shown at the top of a doc, keyed by repo-relative file path.
// A doc can also embed its own ```mermaid block; both are rendered.

export const LEARNING_PATH = `flowchart TB
  subgraph S1["Step 1 · Model the data"]
    direction LR
    W["🌱 What is Data Modeling?"] --> A["🔗 Relationships"] --> ER["📐 ER Diagrams"] --> B["🏛️ Entity Design"] --> C["🧩 Schema Patterns"]
  end
  subgraph S2["Step 2 · Make it fast & safe"]
    direction LR
    D["⚖️ Normalization"] --> E["⚡ Indexing"] --> F["🛡️ Validation"] --> G["🚫 Mistakes"] --> H["🛠️ Tooling"]
  end
  S1 --> S2`;

export const DIAGRAMS: Record<string, string> = {
  "relationship/one_to_one/one-to-one.md": `erDiagram
  USERS ||--o| PROFILES : "has (optional)"
  USERS {
    int id PK
    string email
  }
  PROFILES {
    int id PK
    int user_id FK "UNIQUE"
    string bio
  }`,
  "relationship/one_to_one/decision-rules.md": `flowchart TD
  Q{"Which side stores the reference?"} --> O{"Is this entity optional?"}
  O -- Yes --> T["Store FK in THIS entity"]
  O -- No --> S{"Is it sensitive?"}
  S -- Yes --> T
  S -- No --> C{"Is it a child / detail?"}
  C -- Yes --> T
  C -- No --> M["Store FK in the detail table<br/>(avoid NULLs in main table)"]`,
  "relationship/one_to_many/one-to-many.md": `erDiagram
  CUSTOMERS ||--o{ ORDERS : places
  CUSTOMERS {
    int id PK
    string name
  }
  ORDERS {
    int id PK
    int customer_id FK
    decimal total
  }`,
  "relationship/many_to_one/many-to-one.md": `erDiagram
  EMPLOYEES }o--|| COMPANIES : "works at"
  EMPLOYEES {
    int id PK
    int company_id FK
    string name
  }
  COMPANIES {
    int id PK
    string name
  }`,
  "relationship/many_to_many/many-to-many.md": `erDiagram
  STUDENTS ||--o{ ENROLLMENTS : enrolls
  COURSES ||--o{ ENROLLMENTS : contains
  ENROLLMENTS {
    int student_id FK
    int course_id FK
    date enrolled_at
  }`,
  "MongoDB-Schema-Design-Patterns/Embedding-vs-Referencing.md": `flowchart TD
  A{"How are the entities related?"} -- "1:1 or 1:Few" --> B{"Read together<br/>most of the time?"}
  A -- "1:Many or M:N" --> R["📎 Reference"]
  B -- Yes --> C{"Could the doc<br/>approach 16MB?"}
  B -- No --> R
  C -- No --> E["📦 Embed"]
  C -- Yes --> R`,
  "MongoDB-Schema-Design-Patterns/Bucket-Pattern.md": `flowchart LR
  subgraph Before["❌ One doc per reading"]
    r1["reading 1"]
    r2["reading 2"]
    r3["reading ..n"]
  end
  subgraph After["✅ One doc per sensor per hour"]
    b["bucket { sensor_id, hour,<br/>readings: [ ... ], count }"]
  end
  Before -- "group by time window" --> After`,
  "Normalization-vs-Denormalization/Normalization-vs-Denormalization.md": `flowchart LR
  subgraph N["Normalized (SQL)"]
    U1["users"] --> A1["addresses"]
  end
  subgraph D["Denormalized (NoSQL)"]
    U2["user { address: {...} }"]
  end
  N -- "fewer writes to fix,<br/>more joins to read" --- D`,
  "Database-Indexing/Single-and-Compound-Indexes.md": `flowchart LR
  E["E · Equality<br/>status: 'A'"] --> S["S · Sort<br/>sort({ price: 1 })"] --> R["R · Range<br/>age: { $gt: 18 }"]`,
  "Data-Validation/Why-Validation-Matters.md": `flowchart LR
  U(["User input"]) --> F["1 · Frontend<br/>HTML5 / Yup"]
  F --> B["2 · Backend<br/>Zod / Joi"]
  B --> D["3 · Database<br/>Schema / Constraints"]
  D --> S[("Clean data")]`,
  "Entity-Design/01-ecommerce.md": `erDiagram
  USER ||--o{ ORDER : places
  USER ||--|| CART : owns
  CART ||--o{ PRODUCT : holds
  ORDER ||--|{ PRODUCT : contains
  CATEGORY ||--o{ PRODUCT : groups`,
};
