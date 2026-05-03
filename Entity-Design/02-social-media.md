# Social Media Entity Designs

### 6. Post Entity
- **Purpose**: Main content feed.
- **SQL**: `id`, `user_id (FK)`, `content`, `media_url`, `created_at`.
- **NoSQL**: `{ _id, user_id, content, type: 'image/text', likes_count: 0 }`.

### 7. Comment Entity
- **Purpose**: Interaction on posts.
- **SQL**: `id`, `post_id (FK)`, `user_id (FK)`, `text`, `parent_comment_id (for nested)`.
- **NoSQL**: `{ _id, post_id, user_id, text, replies: [] }`.

### 8. Like Entity
- **Purpose**: Simple reaction tracking.
- **SQL**: `id`, `user_id (FK)`, `post_id (FK)`, `UNIQUE(user_id, post_id)`.
- **NoSQL**: `{ _id, user_id, post_id, createdAt }`.

### 9. Follow Entity
- **Purpose**: Network connections.
- **SQL**: `id`, `follower_id (FK)`, `following_id (FK)`, `UNIQUE(follower_id, following_id)`.
- **NoSQL**: `{ _id, follower, following, status: 'pending/accepted' }`.
