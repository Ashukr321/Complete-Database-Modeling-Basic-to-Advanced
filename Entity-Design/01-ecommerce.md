# E-commerce Entity Designs

### 1. User Entity
- **Purpose**: Identity and Authentication.
- **SQL**: `id`, `email (unique)`, `password_hash`, `full_name`, `created_at`.
- **NoSQL**: `{ _id, email, password, name, roles: [] }`.

### 2. Product Entity
- **Purpose**: Catalog management.
- **SQL**: `id`, `name`, `description`, `price`, `stock_quantity`, `category_id (FK)`.
- **NoSQL**: `{ _id, name, desc, price, stock, tags: [], specs: {} }`.

### 3. Order Entity
- **Purpose**: Transaction tracking.
- **SQL**: `id`, `user_id (FK)`, `total_amount`, `status (enum)`, `order_date`.
- **NoSQL**: `{ _id, user_id, total, status, items: [ {prod_id, price, qty} ] }`.

### 4. Category Entity
- **Purpose**: Organizing items.
- **SQL**: `id`, `name`, `parent_category_id (self-ref)`.
- **NoSQL**: `{ _id, name, parent_id, slug }`.

### 5. Cart Entity
- **Purpose**: Pre-purchase staging.
- **SQL**: `id`, `user_id (FK)`, `created_at`.
- **NoSQL**: `{ _id, user_id, items: [ {prod_id, qty} ], expiresAt }`.
