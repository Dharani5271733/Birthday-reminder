# 🎂 Birthday Reminder App

A simple full-stack application to add, edit, delete, and remind upcoming birthdays.  
Built using **HTML, CSS, JavaScript (Frontend)**, **Node.js + Express (Backend)**, and **AWS DynamoDB (Database)**.  
Email notifications are automated using **AWS EventBridge + Lambda + SES/Twilio (optional)**.

---

## 🚀 Features
- ➕ Add birthdays (name + date of birth)
- 📝 Edit existing birthdays
- ❌ Delete birthdays
- 📅 View upcoming birthdays (sorted by date)
- 📧 Automatic email reminders (via AWS EventBridge + Lambda)

---

## 🛠️ Tech Stack
- **Frontend**: HTML, CSS, JavaScript  
- **Backend**: Node.js + Express  
- **Database**: AWS DynamoDB  
- **Cloud Services**:
  - AWS Lambda – runs birthday check and sends email
  - AWS EventBridge – triggers Lambda daily
  - AWS SES (or Twilio) – sends reminder emails/SMS  
- **Other Tools**: dotenv, cors, uuid

---

