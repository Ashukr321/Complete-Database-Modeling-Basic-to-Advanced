# 1:1 Relationships (One-to-One)

A **One-to-One (1:1)** relationship means that each record in Table A is associated with exactly one record in Table B, and vice versa.

## 🟢 When should we use 1:1 relationships?

You should use **1:1** when:

1.  **Data is optional** → Not every entity needs those extra details.
    - Example: A `user` may or may not have a `driving_license`.
2.  **Data is sensitive / access-controlled** → Separate storage with stricter permissions.
    - Example: Storing **passwords or medical records** apart from general info.
3.  **Performance reasons** → To avoid a "fat table" with rarely used fields.
    - Example: `employees` table queried often, but medical details are rarely needed.
4.  **Logical domain separation** → Different life cycles of data.
    - Example: `users` table is permanent, but `profiles` may be deleted/updated separately.
5.  **Real-world concept enforces 1:1** → Naturally one-to-one in business rules.
    - Example: A **passport belongs to exactly one person**.

---

## 🟢 How to Identify a 1:1 Relationship

To understand how to spot 1:1 relationships in your data model, check out the identification guide:
👉 **[How to Identify a 1:1 Relationship](file:///e:/Job%20switch/backend/Complete-Database-Modeling-Basic-to-Advanced/relationship/one_to_one/how-to-identify.md)**

---

## 🔹 Decision Rules: Which side should store the reference?

For a deep dive into the 3 Golden Rules and counter-questions to decide which side stores the reference, see the dedicated guide:
👉 **[Decision Rules: Which side should store the reference?](file:///e:/Job%20switch/backend/Complete-Database-Modeling-Basic-to-Advanced/relationship/one_to_one/decision-rules.md)**

---

## 🌍 Real-Life Use Cases

1.  **User ↔ Profile**: Basic info in `users`, detailed bio/avatar in `profiles`.
2.  **User ↔ Address**: Home address for a specific user.
3.  **Order ↔ Payment**: Each order has exactly one payment transaction.
4.  **Employee ↔ BankDetails**: Salary information kept separate for security.
5.  **Student ↔ ReportCard**: Academic results for a specific student.
6.  **Product ↔ Inventory**: Stock level for a specific product item.
7.  **Vehicle ↔ Registration**: License plate and registration details.
8.  **Device ↔ Configuration**: Specific hardware settings for a device.
9.  **Account ↔ KYC**: Identity verification documents for a financial account.
10. **Citizen ↔ Passport**: Government identification.
