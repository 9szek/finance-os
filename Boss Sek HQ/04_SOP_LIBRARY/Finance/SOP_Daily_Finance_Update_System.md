# SOP Daily Finance Update System

ใช้สำหรับอัปเดต Finance Dashboard ทุกวันจากข้อมูล Discord / ใบปิดกะ / สลิป / บิล

## ช่วงวันที่ที่อ่านข้อมูล

อ่านและนำเข้าเฉพาะข้อมูลตั้งแต่ `2026-01-01` หรือ `1 มกราคม พ.ศ. 2569` ถึงวันที่ปัจจุบันเท่านั้น

ถ้าข้อมูลเก่ากว่า `2026-01-01` หรือเป็นวันที่อนาคต ห้ามนำเข้า workbook

## ไฟล์หลัก

- Dashboard: `Boss Sek HQ/03_FINANCE_REPORTS/Boss_Sek_4_Business_Financial_Dashboard_v1.xlsx`
- Template รับข้อมูล: `Boss Sek HQ/03_FINANCE_REPORTS/Daily Import Queue/daily_finance_import_template.csv`
- ตัวนำเข้า: `Boss Sek HQ/03_FINANCE_REPORTS/import_tools/import_daily_finance.py`
- โฟลเดอร์เก็บหลักฐาน: `Boss Sek HQ/00_INBOX/Discord Finance Intake`

## ธุรกิจที่รองรับ

- SK Suki
- มาจิเมะ
- ร้าน เฮงเฮง ซุปเปอร์สโตร์
- Evara

## ขั้นตอนทุกวัน

1. เปิด Discord ของแต่ละธุรกิจ
2. ดูช่องยอดขาย / ปิดกะ / บิลค่าใช้จ่าย / เงินสด เฉพาะข้อมูลตั้งแต่ `1 มกราคม พ.ศ. 2569` ถึงวันนี้
3. ดาวน์โหลดหรือคัดลอกลิงก์รูปหลักฐานไว้ใน folder ธุรกิจใน `Discord Finance Intake`
4. กรอกตัวเลขลง CSV ใน `Daily Import Queue`
5. รันคำสั่ง import
6. เปิด Excel ตรวจ Dashboard, Daily_Input, Capital, Import_Log

## คำสั่ง Import

รันจาก workspace `Boss_Sek_Codex`:

```bash
/Users/thanachart-macbookpro/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/bin/python3 "Boss Sek HQ/03_FINANCE_REPORTS/import_tools/import_daily_finance.py" --workbook "Boss Sek HQ/03_FINANCE_REPORTS/Boss_Sek_4_Business_Financial_Dashboard_v1.xlsx" --csv "Boss Sek HQ/03_FINANCE_REPORTS/Daily Import Queue/daily_finance_import_template.csv"
```

## ความหมายช่อง CSV

- `date`: วันที่ยอดขาย รูปแบบ `YYYY-MM-DD`
- `business`: ชื่อธุรกิจ ต้องตรงกับ 4 ชื่อที่รองรับ
- `revenue_cash`: ยอดเงินสด
- `revenue_transfer`: ยอดโอน
- `revenue_card_qr`: ยอดบัตร / QR
- `revenue_delivery_app`: ยอดแอป delivery
- `cogs_food_cost`: ต้นทุนอาหาร / ต้นทุนขาย
- `staff_cost`: ค่าแรง
- `rent`: ค่าเช่า
- `utilities`: ค่าน้ำไฟ
- `marketing`: ค่าโฆษณา
- `supplies`: ของใช้ร้าน
- `other_expense`: ค่าใช้จ่ายอื่น
- `orders_bills`: จำนวนบิล
- `customers`: จำนวนลูกค้า
- `cash_count`: เงินสดที่นับได้ตอนปิดกะ
- `inventory_value`: มูลค่าสต๊อก ถ้ามีการตรวจนับ
- `source_link`: ลิงก์รูป/หลักฐานจาก Discord หรือ path ไฟล์
- `notes`: หมายเหตุ
- `confirm_as_initial_balance`: ใส่ `YES` เฉพาะเมื่อ Boss ยืนยันว่า cash_count / inventory_value เป็นยอดตั้งต้นจริง

## กติกาสำคัญ

- Amount ใส่บวกเสมอ
- Transfer ระหว่างธุรกิจห้ามนับเป็น revenue
- ถ้าเป็นเงินสดล่าสุด ให้ลง `Capital > Cash Count` แต่ยังไม่ลง `Settings > Initial Cash`
- จะอัปเดต `Settings > Initial Cash / Initial Capital` ได้เฉพาะเมื่อ `confirm_as_initial_balance = YES`
- ถ้ารูปอ่านไม่ชัด ให้ใส่เฉพาะตัวเลขที่มั่นใจ และเขียนไว้ใน `notes`
- เฮงเฮงต้องลงเป็น `ร้าน เฮงเฮง ซุปเปอร์สโตร์` เท่านั้น
- มาจิเมะต้องแยกจากธุรกิจอื่น

## Daily Codex Prompt

```text
อัปเดต Finance Dashboard ประจำวัน:
1. อ่านข้อมูลจาก Discord หรือไฟล์ใน Discord Finance Intake
2. กรอก/ตรวจ CSV ใน Daily Import Queue
3. รัน import_daily_finance.py
4. ตรวจ Daily_Input, Capital, Import_Log, Dashboard
5. รายงานว่าวันนี้เพิ่มธุรกิจไหน ยอดเท่าไร และตัวเลขไหนยังต้องยืนยัน
```
