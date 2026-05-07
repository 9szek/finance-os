# Boss Sek Codex Migration Handoff

วันที่ทำ handoff: 2026-05-07

เอกสารนี้ใช้สำหรับย้ายงานจากเครื่อง Windows ไป MacBook ที่มี Codex อยู่แล้ว

## เป้าหมาย

ให้ MacBook เปิดงานต่อได้ทันทีโดยไม่ต้องเริ่มจากศูนย์:

- ระบบ Second Brain ของ Boss เสก
- Notion Command Center
- Google Drive / OneDrive folder structure
- ระบบรายงานผลประกอบการ 4 ธุรกิจ
- Memory / Done Log / SOP ที่สร้างแล้ว
- ข้อจำกัดของ Discord browser plugin ที่เจอใน Windows

## สิ่งที่อยู่บน Cloud แล้ว

### Notion

หน้าใหญ่:

- Boss Sek Command Center: https://www.notion.so/3588c4bf2a1581039885c52a41378a89

หน้าสำคัญ:

- Finance Command Dashboard - 4 Businesses: https://www.notion.so/3588c4bf2a1581a4b02afb45525c8166
- Drive Cleanup Round 1: https://www.notion.so/3588c4bf2a1581089e20eb5ee1e4b882
- Drive Cleanup Round 1.1 - Inspected Items: https://www.notion.so/3588c4bf2a1581cbbcf1f050fd88a4ce

Business HQ ที่สร้าง/อัปเดตแล้ว:

- SK Suki
- Evara Nails & Wellness
- Judas Phuket = Paused / Low Priority / archive only
- 9szek
- จิตวิทยาพารวย
- PartyQ
- POS / Internal Software
- ร้านค้าปลีกค้าส่ง
- มาจิเมะ
- ร้าน เฮงเฮง ซุปเปอร์สโตร์

### Google Drive

Boss Sek HQ Drive folder:

- https://drive.google.com/drive/folders/1k-i3rvM1OC4KRPyoVeH4l-2TNgWFhRit

Business Drive folders:

- SK Suki: https://drive.google.com/drive/folders/1iwM4Nr8lQ6AFoqzsfxfHlTcE5PLiUhvI
- Evara: https://drive.google.com/drive/folders/1e36Ed0xwamVXXSvRGy3qvVsWi_IRaGjo
- Judas: https://drive.google.com/drive/folders/1SamDhsLXtRjKbH5uR_xeCN_0eT1gC-bM
- 9szek: https://drive.google.com/drive/folders/1w8YZhQdoUq7XttWGfdfTRfNhG51orMfU
- จิตวิทยาพารวย: https://drive.google.com/drive/folders/1_aD0rHeyfE_SluR7dGo8FepwqESjrnxL
- PartyQ: https://drive.google.com/drive/folders/1IqGYfjhQ2XpvjzIL2x5s6s9dnEMfpRzF
- POS/Internal Software: https://drive.google.com/drive/folders/1-zcjqhzEMBshLGHvtbzA0_BQ405qxIl7
- ร้านค้าปลีกค้าส่ง: https://drive.google.com/drive/folders/1uX_y9xz3LporqsvtC8kj7mohVcMfQlSE
- มาจิเมะ: https://drive.google.com/drive/folders/1fjVOOkdepEoUNXrN6bwLjEHbbV-DfukR
- ร้าน เฮงเฮง ซุปเปอร์สโตร์: https://drive.google.com/drive/folders/1EcnIRNKcw7UB8ClRjSKyei1gfZaVrXnX

## Local Folder ที่ต้องย้ายไป Mac

บนเครื่อง Windows อยู่ที่:

`C:\Users\ADMIN\OneDrive\เอกสาร\AI ชาวยทำงานธุระกิจ\Boss Sek HQ`

บน Mac แนะนำวางที่:

`~/Documents/Boss Sek HQ`

หรือถ้าใช้ Google Drive for Desktop:

`~/Library/CloudStorage/GoogleDrive-<email>/My Drive/Boss Sek HQ`

ถ้าใช้ OneDrive for Mac:

`~/Library/CloudStorage/OneDrive-*/เอกสาร/AI ชาวยทำงานธุระกิจ/Boss Sek HQ`

## ไฟล์สำคัญที่ต้องเอาไปด้วย

### Finance Dashboard

ไฟล์หลัก:

`Boss Sek HQ/03_FINANCE_REPORTS/Boss_Sek_4_Business_Financial_Dashboard_v1.xlsx`

ใช้ดู:

- cashflow ตอนนี้
- กำไรขาดทุน
- ทุนตอนนี้
- วิเคราะห์ธุรกิจ
- dashboard รายวัน 4 ธุรกิจ

ธุรกิจที่รองรับ:

- SK Suki
- มาจิเมะ
- ร้าน เฮงเฮง ซุปเปอร์สโตร์
- Evara

### Discord Finance Intake

โฟลเดอร์รับไฟล์จาก Discord:

`Boss Sek HQ/00_INBOX/Discord Finance Intake`

มีโฟลเดอร์ย่อย:

- SK Suki
- มาจิเมะ
- ร้าน เฮงเฮง ซุปเปอร์สโตร์
- Evara
- _Needs Sorting

วิธีใช้:

1. เปิด Discord เอง
2. ดาวน์โหลดรายงานรายวัน / บิล / สลิป
3. วางใน folder ธุรกิจ
4. สั่ง Codex บน Mac ว่า `นำเข้าข้อมูลการเงินจาก Discord Finance Intake`

## Memory สำคัญที่ Codex บน Mac ต้องรู้

Boss เสก คือเจ้าของกิจการหลายธุรกิจ ต้องการ AI เป็น Systems Builder / Knowledge Architect / Research Operator / Executive Assistant

หลักการตัดสินใจ:

1. กำไร
2. ภาพลักษณ์
3. ระบบ
4. ความเร็ว
5. ความคุ้มค่า

สไตล์คำตอบ:

- สั้นตรง
- มืออาชีพ
- ใช้งานได้จริง
- ไม่พูดอ้อม
- ไม่ทำอะไรเกินจำเป็น
- ไม่สร้างระบบที่ดูดีแต่ใช้จริงยาก

กติกาการทำงาน:

- ค้นจากคลังส่วนตัวก่อนเสมอ
- ถ้าเคยมีงานคล้ายกัน ให้ดึงกลับมาใช้
- งานซ้ำให้เสนอ template / SOP
- งานเสร็จให้บันทึก Done Log / Lessons Learned
- ถ้าเป็นไฟล์ final ให้เก็บ Drive
- ถ้าเป็นความรู้ซ้ำได้ ให้เพิ่ม SOP / Prompt / Template

## สถานะโปรเจกต์ตอนย้าย

เสร็จแล้ว:

- ออกแบบ Second Brain
- สร้าง Notion Command Center
- สร้าง Business HQ database
- สร้าง Current Priorities / Done Log / Prompt Library / SOP Library
- สร้าง local folder structure `Boss Sek HQ`
- ผูก Business HQ กับ Google Drive folders
- เพิ่มร้าน เฮงเฮง ซุปเปอร์สโตร์
- ทำให้มาจิเมะเป็นธุรกิจชัดเจน
- ตั้ง JUDAS เป็น Paused / Archive only
- สร้าง Finance Dashboard v1
- สร้าง SOP Daily 4-Business Financial Reporting
- สร้าง Discord Finance Intake folder

ยังต้องทำต่อ:

- นำข้อมูลจริงจาก Discord เข้า Finance Dashboard
- กรอกยอดตั้งต้นใน `Settings` ของ workbook
- ยืนยันยอด cash / capital / inventory ของแต่ละธุรกิจ
- ถ้า Mac ใช้ Browser plugin ได้ ให้ลองเปิด Discord อีกครั้ง
- ถ้า Browser plugin ยังไม่ได้ ให้ใช้วิธี download ไฟล์จาก Discord แล้วให้ Codex อ่านจาก folder

## ขั้นตอนบน MacBook

1. เปิด Codex บน Mac
2. เปิด workspace/folder ที่ย้ายมา เช่น `~/Documents/Boss Sek HQ`
3. เชื่อม Notion plugin
4. เชื่อม Google Drive plugin
5. เปิด Notion หน้า Boss Sek Command Center
6. เปิดไฟล์ `Boss_Sek_4_Business_Financial_Dashboard_v1.xlsx`
7. สั่ง Codex:

`อ่าน MACBOOK_MIGRATION_HANDOFF_BOSS_SEK.md แล้วทำงานต่อจากระบบ Boss Sek HQ`

8. ถ้าต้องการต่อเรื่องการเงิน ให้สั่ง:

`นำเข้าข้อมูลการเงินจาก Discord Finance Intake`

## ข้อควรระวัง

- อย่าย้าย JUDAS เป็น active เว้นแต่ Boss เสกสั่งเปิดใหม่
- อย่ารวมเฮงเฮงกับร้านค้าปลีกค้าส่งแบบกว้าง ถ้าไฟล์ระบุชื่อเฮงเฮง ให้เข้าเฮงเฮงโดยตรง
- อย่ารวมมาจิเมะกับธุรกิจอื่น
- รายการ transfer ระหว่างธุรกิจ ห้ามนับเป็น revenue จริง
- Amount ใน Transactions ให้ใส่บวกเสมอ แล้วใช้ Type บอกทิศทางเงิน

## Prompt เริ่มงานบน Mac

ใช้ข้อความนี้ใน Codex บน Mac:

```text
อ่านไฟล์ MACBOOK_MIGRATION_HANDOFF_BOSS_SEK.md และถือว่านี่คือ memory หลักของ Boss เสก

ต่อจากนี้ให้ทำงานตามระบบ Boss Sek HQ:
- Notion = สมองกลาง
- Google Drive = คลังไฟล์ต้นฉบับ
- NotebookLM = ห้องวิจัย
- Finance Dashboard = ดู cashflow / P&L / capital / วิเคราะห์ธุรกิจ 4 ธุรกิจ

ก่อนตอบงานใหม่ ให้ค้นจากคลังส่วนตัวก่อนเสมอ
ถ้างานเสร็จ ให้บันทึก Done Log / SOP / Prompt / Template ตามความเหมาะสม
```
