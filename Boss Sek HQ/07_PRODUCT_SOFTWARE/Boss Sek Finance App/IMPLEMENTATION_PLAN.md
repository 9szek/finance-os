# Boss Sek Finance App Implementation Plan

## MVP ที่มีแล้ว

- Staff Daily Intake สำหรับ 4 ร้าน
- อัปโหลด/preview หลักฐาน
- AI extraction workflow แบบ mock
- ส่งรายการเข้าคิวตรวจ
- Approve / Reject / Reviewed
- Owner Dashboard
- Accounting Ledger
- Audit Trail
- Local persistence ผ่าน `localStorage`
- Export CSV สำหรับต่อเข้า Finance Dashboard importer
- Date guard: `2026-01-01` ถึงวันที่ปัจจุบัน
- Quick PIN Login ด้วย User ID + PIN
- Role-based access: `staff`, `manager`, `accountant`, `owner`, `admin`
- Staff ถูกจำกัดให้เห็น/ส่งข้อมูลเฉพาะร้านตัวเอง
- Admin User Management สำหรับสร้าง/อัปเดต/ปิด User และ PIN
- ลิงก์แยกชัดเจน:
  - `staff.html` สำหรับพนักงานกรองข้อมูล
  - `owner.html` สำหรับเจ้าของดูผลประกอบการ
  - `admin.html` สำหรับหลังบ้านสร้าง User/PIN

## Backend ที่ควรสร้างต่อ

ใช้ Supabase/Postgres เป็นฐานกลาง

### Tables

- `businesses`
- `profiles`
- `daily_submissions`
- `evidence_files`
- `ai_extractions`
- `transactions`
- `cash_counts`
- `inventory_counts`
- `review_logs`
- `audit_logs`

## Accounting Rules

- เก็บหลักฐานต้นฉบับเสมอ
- AI อ่านได้ แต่บัญชี/manager ต้อง approve ก่อนเป็นรายการจริง
- Amount เป็นบวกเสมอ
- Transfer ระหว่างร้านห้ามนับเป็น revenue
- Cash Count ไม่ใช่กำไร
- Initial Cash / Capital / Inventory ต้องให้ owner confirm เท่านั้น
- Staff ต้องผูกกับร้านเดียว เพื่อลดความเสี่ยงข้อมูลปนร้าน
- ทุก submission ต้องบันทึก user ผู้ส่ง และทุก approval ต้องบันทึก user ผู้อนุมัติ

## User / PIN Rules

- `admin`: จัดการ user และเห็นทุกข้อมูล
- `owner`: เห็น dashboard รวมและ export ได้
- `accountant`: เห็น ledger และ approve ได้
- `manager`: เห็น/approve ร้านที่ตัวเองดูแล
- `staff`: ส่งข้อมูลได้เฉพาะร้านตัวเอง
- PIN ใน MVP เก็บใน localStorage เพื่อทดสอบ workflow เท่านั้น
- เวอร์ชัน production ต้อง hash PIN และใช้ backend auth/session

## OpenAI Vision Flow

1. พนักงานอัปโหลดรูป
2. Backend ส่งรูปเข้า OpenAI Vision
3. AI ตอบเป็น JSON ตาม schema
4. Frontend แสดงตารางให้คนตรวจ
5. Submit เป็น Draft
6. Manager/Accounting approve
7. ระบบสร้าง transactions และ reports

## JSON Extraction Schema

```json
{
  "date": "2026-05-07",
  "business": "SK Suki",
  "evidence_type": "close_shift",
  "revenue_cash": 0,
  "revenue_transfer": 0,
  "revenue_card_qr": 0,
  "revenue_delivery_app": 0,
  "cogs_food_cost": 0,
  "staff_cost": 0,
  "rent": 0,
  "utilities": 0,
  "marketing": 0,
  "supplies": 0,
  "other_expense": 0,
  "orders_bills": 0,
  "customers": 0,
  "cash_count": 0,
  "inventory_value": 0,
  "confidence": 0.0,
  "needs_review": true,
  "notes": ""
}
```

## Next Build Steps

1. Convert static app to React/Vite or Next.js when `npm` is available.
2. Add Supabase Auth and role-based access.
3. Move User/PIN management to backend with hashed PIN.
4. Add Supabase Storage upload.
5. Add OpenAI Vision extraction endpoint.
6. Replace mock AI button with real extraction.
7. Sync approved rows to the existing Excel importer or replace Excel with DB reports.
8. Add daily automation: missing-store alert and nightly owner summary.
