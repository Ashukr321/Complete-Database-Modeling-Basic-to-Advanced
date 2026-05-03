# MongoDB & Mongoose Schema Validation

Mongoose provides a powerful way to enforce data validation at the application-to-database level.

---

## 🟢 1. Built-in Validators
Mongoose has several built-in validators for different data types.

### 🚀 Example: User Schema
```javascript
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        minlength: [3, 'Username must be at least 3 characters'],
        maxlength: 20,
        trim: true // Removes whitespace
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+\@.+\..+/, 'Please enter a valid email address']
    },
    age: {
        type: Number,
        min: 18,
        max: 100
    },
    role: {
        type: String,
        enum: ['admin', 'user', 'moderator'],
        default: 'user'
    }
});
```

---

## 🟢 2. Custom Validators
You can define your own validation logic for complex business rules.

### 🚀 Example: Password Strength
```javascript
const userSchema = new mongoose.Schema({
    password: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                // Must contain at least one number
                return /\d/.test(v);
            },
            message: props => `${props.value} is not a strong password!`
        }
    }
});
```

---

## 🟢 3. Schema Options for Validation
- `required`: Field must exist.
- `default`: Provides a value if none is given.
- `select: false`: Prevents the field from being returned in queries (e.g., password).
- `lowercase`: Converts string to lowercase before saving.

---

## 💡 Pro Tip: `runValidators` on Update
By default, Mongoose only runs validation on `.save()`. When you use `.findOneAndUpdate()`, you **must** explicitly enable validation.

```javascript
// MUST include runValidators: true
await User.findOneAndUpdate(
    { _id: userId },
    { age: 10 }, 
    { runValidators: true } 
);
```
