# Finance & HR Entity Designs

### 15. Account Entity
- **Purpose**: Financial balance.
- **SQL**: `id`, `user_id (FK)`, `account_number`, `balance`, `type (savings/current)`.
- **NoSQL**: `{ _id, user_id, acc_no, balance, status: 'active' }`.

### 16. Transaction Entity
- **Purpose**: Immutable ledger.
- **SQL**: `id`, `from_account_id (FK)`, `to_account_id (FK)`, `amount`, `type (debit/credit)`.
- **NoSQL**: `{ _id, from, to, amount, timestamp, meta: {} }`.

### 17. Employee Entity
- **Purpose**: HR records.
- **SQL**: `id`, `first_name`, `last_name`, `department_id (FK)`, `manager_id (self-ref)`.
- **NoSQL**: `{ _id, name, dept, manager, skills: [] }`.

### 18. Department Entity
- **Purpose**: Org structure.
- **SQL**: `id`, `name`, `head_id (FK)`, `budget`.
- **NoSQL**: `{ _id, name, head, member_count: 0 }`.

### 19. Project Entity
- **Purpose**: Work tracking.
- **SQL**: `id`, `name`, `deadline`, `status`, `manager_id (FK)`.
- **NoSQL**: `{ _id, name, timeline: {}, team: [ {user, role} ] }`.

### 20. Warehouse Entity
- **Purpose**: Physical inventory storage.
- **SQL**: `id`, `location_name`, `address`, `capacity_sqft`.
- **NoSQL**: `{ _id, name, location: { lat, lng }, current_stock: [] }`.

### 21. Shipment Entity
- **Purpose**: Logistics tracking.
- **SQL**: `id`, `order_id (FK)`, `tracking_number`, `current_status`, `estimated_delivery`.
- **NoSQL**: `{ _id, order_id, status_logs: [ {status, time} ], carrier: '' }`.
