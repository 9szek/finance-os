const MIN_DATE = "2026-01-01";
const STORAGE_KEY = "boss-sek-finance-os-v2";
const SESSION_KEY = "boss-sek-finance-os-session";
const PAGE_NAME = location.pathname.split("/").pop() || "index.html";
const PAGE_MODE = PAGE_NAME.includes("staff")
  ? "staff"
  : PAGE_NAME.includes("owner")
    ? "owner"
    : PAGE_NAME.includes("admin")
      ? "admin"
      : "index";

const businesses = [
  { name: "SK Suki", manager: "ครัว/หน้าร้าน", status: "Active" },
  { name: "มาจิเมะ", manager: "สาขายะลา", status: "Active" },
  { name: "ร้าน เฮงเฮง ซุปเปอร์สโตร์", manager: "ค้าปลีก", status: "Active" },
  { name: "Evara", manager: "Nails & Wellness", status: "Active" },
];

const seedRows = [
  {
    id: crypto.randomUUID(),
    date: "2026-05-03",
    business: "SK Suki",
    type: "Revenue",
    category: "Daily Sales",
    revenueCash: 2544,
    revenueTransfer: 7414,
    revenueCardQr: 0,
    revenueDeliveryApp: 0,
    amount: 9958,
    expense: 2486,
    cashCount: 4930,
    inventoryValue: 0,
    ordersBills: 20,
    customers: 0,
    evidence: "CamScanner close shift",
    staff: "อ้อน",
    status: "Reviewed",
    confidence: 0.91,
    notes: "Imported evidence from Discord. Needs final accounting approval.",
    confirmInitial: "NO",
  },
  {
    id: crypto.randomUUID(),
    date: "2026-05-05",
    business: "ร้าน เฮงเฮง ซุปเปอร์สโตร์",
    type: "Revenue",
    category: "Daily Sales",
    revenueCash: 8614,
    revenueTransfer: 518,
    revenueCardQr: 0,
    revenueDeliveryApp: 0,
    amount: 9132,
    expense: 4804,
    cashCount: 6130,
    inventoryValue: 0,
    ordersBills: 0,
    customers: 0,
    evidence: "Receipt photo",
    staff: "มนตรี",
    status: "Draft",
    confidence: 0.82,
    notes: "Handwritten bottom not used because unclear.",
    confirmInitial: "NO",
  },
  {
    id: crypto.randomUUID(),
    date: "2026-05-07",
    business: "Evara",
    type: "Expense",
    category: "Supplies",
    revenueCash: 0,
    revenueTransfer: 0,
    revenueCardQr: 0,
    revenueDeliveryApp: 0,
    amount: 1850,
    expense: 1850,
    cashCount: 0,
    inventoryValue: 0,
    ordersBills: 0,
    customers: 0,
    evidence: "Bill photo",
    staff: "Kim",
    status: "Approved",
    confidence: 0.96,
    notes: "Approved supply bill.",
    confirmInitial: "NO",
  },
];

const seedUsers = [
  { userId: "admin", pin: "9999", name: "System Admin", role: "admin", business: "ทั้งหมด", active: true },
  { userId: "owner", pin: "8888", name: "Boss Sek", role: "owner", business: "ทั้งหมด", active: true },
  { userId: "sk_staff01", pin: "1111", name: "SK Staff 01", role: "staff", business: "SK Suki", active: true },
  { userId: "heng_staff01", pin: "2222", name: "Heng Heng Staff 01", role: "staff", business: "ร้าน เฮงเฮง ซุปเปอร์สโตร์", active: true },
  { userId: "evara_manager", pin: "3333", name: "Evara Manager", role: "manager", business: "Evara", active: true },
];

const state = loadState();

function todayIso() {
  return new Date().toISOString().slice(0, 10);
}

function loadState() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) {
    return {
      selectedBusiness: "ทั้งหมด",
      rows: seedRows,
      users: seedUsers,
      currentUserId: sessionStorage.getItem(SESSION_KEY) || "",
      audit: [{ at: new Date().toLocaleString("th-TH"), action: "เริ่มระบบ", detail: "โหลดข้อมูลตัวอย่างสำหรับ MVP" }],
    };
  }
  try {
    const parsed = JSON.parse(saved);
    return {
      selectedBusiness: "ทั้งหมด",
      rows: parsed.rows || seedRows,
      users: parsed.users || seedUsers,
      currentUserId: sessionStorage.getItem(SESSION_KEY) || "",
      audit: parsed.audit || [],
    };
  } catch {
    return { selectedBusiness: "ทั้งหมด", rows: seedRows, users: seedUsers, currentUserId: sessionStorage.getItem(SESSION_KEY) || "", audit: [] };
  }
}

function saveState(action, detail) {
  if (action) {
    state.audit.unshift({ at: new Date().toLocaleString("th-TH"), action, detail });
    state.audit = state.audit.slice(0, 25);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ rows: state.rows, users: state.users, audit: state.audit }));
}

const formatMoney = (value) =>
  new Intl.NumberFormat("th-TH", { style: "currency", currency: "THB", maximumFractionDigits: 0 }).format(value || 0);

function currentUser() {
  return state.users.find((user) => user.userId === state.currentUserId && user.active);
}

function pageLabel() {
  if (PAGE_MODE === "staff") return "หน้าพนักงาน";
  if (PAGE_MODE === "owner") return "หน้าเจ้าของ";
  if (PAGE_MODE === "admin") return "หลังบ้าน Admin";
  return "ระบบรวม";
}

function canAccessPage(user) {
  if (!user) return false;
  if (PAGE_MODE === "staff") return ["staff", "manager", "admin"].includes(user.role);
  if (PAGE_MODE === "owner") return ["owner", "accountant", "admin"].includes(user.role);
  if (PAGE_MODE === "admin") return user.role === "admin";
  return true;
}

function canManageAll(user = currentUser()) {
  return Boolean(user && ["admin", "owner", "accountant"].includes(user.role));
}

function canReview(user = currentUser()) {
  return Boolean(user && ["admin", "owner", "accountant", "manager"].includes(user.role));
}

function allowedBusinessNames(user = currentUser()) {
  if (!user) return [];
  if (canManageAll(user) || user.business === "ทั้งหมด") return businesses.map((business) => business.name);
  return [user.business];
}

function enforceSelectedBusiness() {
  const user = currentUser();
  if (!user) return;
  const allowed = allowedBusinessNames(user);
  if (!canManageAll(user) && state.selectedBusiness === "ทั้งหมด") {
    state.selectedBusiness = allowed[0];
  }
  if (state.selectedBusiness !== "ทั้งหมด" && !allowed.includes(state.selectedBusiness)) {
    state.selectedBusiness = canManageAll(user) ? "ทั้งหมด" : allowed[0];
  }
}

function isInRange(date) {
  const start = document.getElementById("startDate").value || MIN_DATE;
  const end = document.getElementById("endDate").value || todayIso();
  return date >= start && date <= end && date >= MIN_DATE && date <= todayIso();
}

function visibleRows() {
  const allowed = allowedBusinessNames();
  return state.rows.filter((row) => {
    const byBusiness = state.selectedBusiness === "ทั้งหมด" || row.business === state.selectedBusiness;
    return allowed.includes(row.business) && byBusiness && isInRange(row.date);
  });
}

function ledgerRows() {
  const allowed = allowedBusinessNames();
  const businessFilter = document.getElementById("ledgerBusinessFilter").value || "ทั้งหมด";
  const statusFilter = document.getElementById("ledgerStatusFilter").value || "all";
  return state.rows.filter((row) => {
    const byBusiness = businessFilter === "ทั้งหมด" || row.business === businessFilter;
    const byStatus = statusFilter === "all" || row.status === statusFilter;
    return allowed.includes(row.business) && byBusiness && byStatus && isInRange(row.date);
  });
}

function renderBusinessNav() {
  const nav = document.getElementById("businessNav");
  const user = currentUser();
  const allowed = allowedBusinessNames(user);
  const branchItems = businesses.filter((business) => allowed.includes(business.name));
  const items = canManageAll(user) ? [{ name: "ทั้งหมด", manager: "Owner dashboard", status: "All" }, ...branchItems] : branchItems;
  nav.innerHTML = items
    .map(
      (business) => `
        <button class="business-button ${business.name === state.selectedBusiness ? "active" : ""}" data-business="${business.name}">
          ${business.name}
          <span>${business.manager}</span>
        </button>
      `,
    )
    .join("");
  nav.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
      state.selectedBusiness = button.dataset.business;
      render();
    });
  });
}

function renderSelects() {
  const businessSelect = document.getElementById("businessSelect");
  const ledgerBusinessFilter = document.getElementById("ledgerBusinessFilter");
  const newUserBusiness = document.getElementById("newUserBusiness");
  const allowed = allowedBusinessNames();
  const availableBusinesses = businesses.filter((business) => allowed.includes(business.name));
  const options = availableBusinesses.map((business) => `<option value="${business.name}">${business.name}</option>`).join("");
  businessSelect.innerHTML = options;
  businessSelect.disabled = !canManageAll();
  ledgerBusinessFilter.innerHTML = `${canManageAll() ? '<option value="ทั้งหมด">ทุกร้าน</option>' : ""}${options}`;
  if (newUserBusiness) {
    newUserBusiness.innerHTML = `<option value="ทั้งหมด">ทั้งหมด</option>${businesses.map((business) => `<option value="${business.name}">${business.name}</option>`).join("")}`;
  }
}

function totals(rows) {
  const revenue = rows.filter((row) => row.type === "Revenue").reduce((sum, row) => sum + row.amount, 0);
  const expense = rows.reduce((sum, row) => sum + row.expense, 0);
  const cash = rows.reduce((sum, row) => sum + row.cashCount, 0);
  return { revenue, expense, cash, profit: revenue - expense };
}

function renderStatus() {
  const rows = visibleRows();
  const summary = totals(rows);
  const pending = rows.filter((row) => row.status !== "Approved").length;
  document.getElementById("statusStrip").innerHTML = [
    ["รายรับ", formatMoney(summary.revenue)],
    ["รายจ่าย", formatMoney(summary.expense)],
    ["เงินสดนับได้", formatMoney(summary.cash)],
    ["รอตรวจ", `${pending} รายการ`],
  ]
    .map(([label, value]) => `<div class="status-card"><span>${label}</span><strong>${value}</strong></div>`)
    .join("");
}

function rowActions(row) {
  if (!canReview()) return "-";
  if (row.status === "Approved") return `<button class="tiny-button" data-action="review" data-id="${row.id}">ส่งกลับตรวจ</button>`;
  return `
    <div class="row-actions">
      <button class="tiny-button" data-action="approve" data-id="${row.id}">Approve</button>
      <button class="danger-button" data-action="reject" data-id="${row.id}">Reject</button>
    </div>
  `;
}

function renderQueue() {
  const rows = visibleRows().filter((row) => row.status !== "Approved");
  document.getElementById("queueCount").textContent = `${rows.length} รายการ`;
  document.getElementById("reviewRows").innerHTML = rows
    .map(
      (row) => `
      <tr>
        <td>${row.business}</td>
        <td>${formatMoney(row.amount)}</td>
        <td>${formatMoney(row.expense)}</td>
        <td>${formatMoney(row.cashCount)}</td>
        <td>${Math.round(row.confidence * 100)}%</td>
        <td><span class="chip ${row.status.toLowerCase()}">${row.status}</span></td>
        <td>${rowActions(row)}</td>
      </tr>
    `,
    )
    .join("");
}

function renderKpis() {
  const summary = totals(visibleRows());
  const margin = summary.revenue ? (summary.profit / summary.revenue) * 100 : 0;
  document.getElementById("kpiGrid").innerHTML = [
    ["Revenue", summary.revenue, "+ from approved/draft sales"],
    ["Expense", summary.expense, "COGS + operating expense"],
    ["Net Profit", summary.profit, `${margin.toFixed(1)}% margin`],
    ["Cashflow", summary.cash - summary.expense, "cash count minus outflow"],
  ]
    .map(
      ([label, value, note]) => `
        <div class="kpi-card">
          <span>${label}</span>
          <strong class="${value < 0 ? "money-negative" : ""}">${formatMoney(value)}</strong>
          <em>${note}</em>
        </div>
      `,
    )
    .join("");
}

function renderChart() {
  const allowed = allowedBusinessNames();
  const profitByBusiness = businesses.map((business) => {
    const rows = state.rows.filter((row) => row.business === business.name && isInRange(row.date));
    return { business: business.name, profit: totals(rows).profit };
  }).filter((row) => allowed.includes(row.business));
  const max = Math.max(...profitByBusiness.map((row) => Math.abs(row.profit)), 1);
  document.getElementById("profitChart").innerHTML = profitByBusiness
    .map(
      (row) => `
        <div class="bar-row">
          <span>${row.business}</span>
          <div class="bar-track"><div class="bar-fill" style="width:${Math.max(4, (Math.abs(row.profit) / max) * 100)}%"></div></div>
          <strong class="${row.profit < 0 ? "money-negative" : "money-positive"}">${formatMoney(row.profit)}</strong>
        </div>
      `,
    )
    .join("");
}

function renderLedger() {
  document.getElementById("ledgerRows").innerHTML = ledgerRows()
    .map(
      (row) => `
      <tr>
        <td>${row.date}</td>
        <td>${row.business}</td>
        <td>${row.type}</td>
        <td>${row.category}</td>
        <td>${formatMoney(row.type === "Expense" ? row.expense : row.amount)}</td>
        <td>${row.evidence}</td>
        <td>${row.staff}</td>
        <td><span class="chip ${row.status.toLowerCase()}">${row.status}</span></td>
        <td>${rowActions(row)}</td>
      </tr>
    `,
    )
    .join("");
}

function renderAiSummary() {
  const rows = visibleRows();
  const summary = totals(rows);
  const pending = rows.filter((row) => row.status !== "Approved").length;
  const focus = state.selectedBusiness === "ทั้งหมด" ? "ภาพรวม 4 ร้าน" : state.selectedBusiness;
  document.getElementById("aiSummary").textContent =
    `${focus}: กำไรสุทธิประมาณ ${formatMoney(summary.profit)} จากข้อมูลในช่วงวันที่ที่เลือก มี ${pending} รายการที่ยังควรตรวจหลักฐานก่อนปิดบัญชี. ` +
    `ให้ตรวจ transfer ระหว่างร้านไม่ให้นับเป็นรายได้ และตรวจ cash count ก่อนใช้เป็นยอดตั้งต้น.`;
}

function renderRisks() {
  const rows = visibleRows();
  const risks = [];
  rows.filter((row) => row.confidence < 0.86).forEach((row) => risks.push([row.business, `AI confidence ${Math.round(row.confidence * 100)}% ควรตรวจรูปหลักฐานซ้ำ`]));
  rows.filter((row) => row.confirmInitial === "YES").forEach((row) => risks.push([row.business, "มีการยืนยันยอดตั้งต้น ต้องให้เจ้าของ/บัญชี approve"]));
  rows.filter((row) => row.status === "Draft").forEach((row) => risks.push([row.business, "ยังเป็น Draft ไม่ควรนับเป็นบัญชีปิดวัน"]));
  document.getElementById("riskList").innerHTML = risks.slice(0, 5).map(([title, detail]) => `<div class="risk-item"><strong>${title}</strong><span>${detail}</span></div>`).join("");
}

function renderAudit() {
  document.getElementById("auditList").innerHTML = state.audit
    .map((item) => `<div class="audit-item"><strong>${item.action}</strong><span>${item.at} - ${item.detail}</span></div>`)
    .join("");
}

function renderCurrentUser() {
  const user = currentUser();
  const hasAccess = user && canAccessPage(user);
  document.body.classList.toggle("locked", !hasAccess);
  document.body.classList.remove("role-admin", "role-owner", "role-accountant", "role-manager", "role-staff", "page-staff", "page-owner", "page-admin", "page-index");
  document.body.classList.add(`page-${PAGE_MODE}`);
  if (user) {
    document.body.classList.add(`role-${user.role}`);
    document.getElementById("currentUserLabel").textContent = `${user.name} (${user.role}) - ${pageLabel()}`;
  }
}

function renderUsers() {
  const userRows = document.getElementById("userRows");
  if (!userRows) return;
  userRows.innerHTML = state.users
    .map(
      (user) => `
        <tr>
          <td>${user.userId}</td>
          <td>${user.name}</td>
          <td>${user.business}</td>
          <td>${user.role}</td>
          <td><span class="chip ${user.active ? "approved" : "draft"}">${user.active ? "Active" : "Inactive"}</span></td>
          <td>
            <div class="row-actions">
              <button class="tiny-button" data-user-action="edit" data-user-id="${user.userId}">Edit</button>
              <button class="danger-button" data-user-action="toggle" data-user-id="${user.userId}">${user.active ? "Disable" : "Enable"}</button>
            </div>
          </td>
        </tr>
      `,
    )
    .join("");
}

function render() {
  const user = currentUser();
  renderCurrentUser();
  if (!user || !canAccessPage(user)) return;
  enforceSelectedBusiness();
  renderBusinessNav();
  renderSelects();
  renderStatus();
  renderQueue();
  renderKpis();
  renderChart();
  renderLedger();
  renderAiSummary();
  renderRisks();
  renderAudit();
  renderUsers();
}

function extractMockValues() {
  const business = document.getElementById("businessSelect").value;
  const evidenceType = document.getElementById("evidenceType").value;
  const presets = {
    "SK Suki": [7800, 6200, 3100, 5400, 28, 41],
    "มาจิเมะ": [4200, 1900, 1600, 3500, 16, 24],
    "ร้าน เฮงเฮง ซุปเปอร์สโตร์": [8600, 520, 4800, 6130, 0, 0],
    Evara: [1200, 6800, 2100, 4500, 11, 13],
  };
  const [cash, transfer, expense, cashCount, orders, customers] = presets[business];
  document.getElementById("revenueCash").value = evidenceType === "บิลค่าใช้จ่าย" ? 0 : cash;
  document.getElementById("revenueTransfer").value = evidenceType === "บิลค่าใช้จ่าย" ? 0 : transfer;
  document.getElementById("expense").value = expense;
  document.getElementById("cashCount").value = cashCount;
  document.getElementById("ordersBills").value = orders;
  document.getElementById("customers").value = customers;
  document.getElementById("notes").value = "AI อ่านข้อมูลจากรูปแล้ว กรุณาตรวจยอดก่อนส่งเข้าคิวบัญชี";
  saveState("AI อ่านรูป", `${business} / ${evidenceType}`);
  renderAudit();
}

function handleEvidencePreview(event) {
  const preview = document.getElementById("evidencePreview");
  preview.innerHTML = "";
  [...event.target.files].slice(0, 6).forEach((file) => {
    const item = document.createElement("div");
    item.className = "preview-item";
    if (file.type.startsWith("image/")) {
      const img = document.createElement("img");
      img.src = URL.createObjectURL(file);
      item.appendChild(img);
    }
    const name = document.createElement("span");
    name.textContent = file.name;
    item.appendChild(name);
    preview.appendChild(item);
  });
}

function submitIntake(event) {
  event.preventDefault();
  const date = document.getElementById("workDate").value;
  if (!date || date < MIN_DATE || date > todayIso()) {
    alert("วันที่ต้องอยู่ระหว่าง 2026-01-01 ถึงวันนี้");
    return;
  }
  const cash = Number(document.getElementById("revenueCash").value || 0);
  const transfer = Number(document.getElementById("revenueTransfer").value || 0);
  const card = 0;
  const delivery = 0;
  const expense = Number(document.getElementById("expense").value || 0);
  const evidenceFiles = document.getElementById("evidenceUpload").files;
  const category = document.getElementById("evidenceType").value;
  const type = category === "บิลค่าใช้จ่าย" ? "Expense" : "Revenue";
  const business = document.getElementById("businessSelect").value;
  const user = currentUser();
  if (!allowedBusinessNames(user).includes(business)) {
    alert("User นี้ไม่มีสิทธิ์ส่งข้อมูลร้านนี้");
    return;
  }
  state.rows.unshift({
    id: crypto.randomUUID(),
    date,
    business,
    type,
    category,
    revenueCash: cash,
    revenueTransfer: transfer,
    revenueCardQr: card,
    revenueDeliveryApp: delivery,
    amount: type === "Expense" ? expense : cash + transfer + card + delivery,
    expense,
    cashCount: Number(document.getElementById("cashCount").value || 0),
    inventoryValue: Number(document.getElementById("inventoryValue").value || 0),
    ordersBills: Number(document.getElementById("ordersBills").value || 0),
    customers: Number(document.getElementById("customers").value || 0),
    evidence: evidenceFiles.length ? `${evidenceFiles.length} uploaded file(s)` : "Manual entry",
    staff: user ? `${user.name} (${user.userId})` : "Staff",
    status: "Draft",
    confidence: document.getElementById("notes").value.includes("AI") ? 0.88 : 0.72,
    notes: document.getElementById("notes").value,
    confirmInitial: document.getElementById("confirmInitial").value,
  });
  saveState("ส่งเข้าคิวตรวจ", `${business} ${date}`);
  event.target.reset();
  document.getElementById("workDate").value = todayIso();
  document.getElementById("evidencePreview").innerHTML = "";
  render();
}

function updateStatus(id, status) {
  if (!canReview()) {
    alert("User นี้ไม่มีสิทธิ์ approve/reject");
    return;
  }
  const row = state.rows.find((item) => item.id === id);
  if (!row) return;
  row.status = status;
  saveState(status === "Approved" ? "อนุมัติรายการ" : "เปลี่ยนสถานะรายการ", `${row.business} ${row.date} เป็น ${status}`);
  render();
}

function handleTableActions(event) {
  const button = event.target.closest("button[data-action]");
  if (!button) return;
  const { action, id } = button.dataset;
  if (action === "approve") updateStatus(id, "Approved");
  if (action === "reject") updateStatus(id, "Rejected");
  if (action === "review") updateStatus(id, "Reviewed");
}

function csvEscape(value) {
  const text = String(value ?? "");
  return `"${text.replaceAll('"', '""')}"`;
}

function exportCsv() {
  if (!canManageAll()) {
    alert("เฉพาะ owner/admin/accountant เท่านั้นที่ export ได้");
    return;
  }
  const headers = [
    "date",
    "business",
    "revenue_cash",
    "revenue_transfer",
    "revenue_card_qr",
    "revenue_delivery_app",
    "cogs_food_cost",
    "staff_cost",
    "rent",
    "utilities",
    "marketing",
    "supplies",
    "other_expense",
    "orders_bills",
    "customers",
    "cash_count",
    "inventory_value",
    "source_link",
    "notes",
    "confirm_as_initial_balance",
  ];
  const csvRows = ledgerRows().map((row) => [
    row.date,
    row.business,
    row.revenueCash,
    row.revenueTransfer,
    row.revenueCardQr,
    row.revenueDeliveryApp,
    0,
    0,
    0,
    0,
    0,
    0,
    row.expense,
    row.ordersBills,
    row.customers,
    row.cashCount,
    row.inventoryValue,
    row.evidence,
    row.notes,
    row.confirmInitial,
  ]);
  const csv = [headers, ...csvRows].map((row) => row.map(csvEscape).join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `boss-sek-finance-import-${todayIso()}.csv`;
  link.click();
  URL.revokeObjectURL(url);
  saveState("Export CSV", `${csvRows.length} rows`);
  renderAudit();
}

function resetDemoData() {
  if (!canManageAll()) return;
  state.rows = seedRows.map((row) => ({ ...row, id: crypto.randomUUID() }));
  state.users = seedUsers.map((user) => ({ ...user }));
  state.audit = [{ at: new Date().toLocaleString("th-TH"), action: "Reset Demo Data", detail: "กลับสู่ข้อมูลตัวอย่างเริ่มต้น" }];
  saveState();
  render();
}

function login(event) {
  event.preventDefault();
  const userId = document.getElementById("loginUserId").value.trim();
  const pin = document.getElementById("loginPin").value.trim();
  const user = state.users.find((item) => item.userId === userId && item.pin === pin && item.active);
  const error = document.getElementById("loginError");
  if (!user) {
    error.textContent = "User ID หรือ PIN ไม่ถูกต้อง หรือ User ถูกปิดใช้งาน";
    return;
  }
  if (!canAccessPage(user)) {
    error.textContent = `User นี้ไม่มีสิทธิ์เข้า ${pageLabel()}`;
    return;
  }
  state.currentUserId = user.userId;
  sessionStorage.setItem(SESSION_KEY, user.userId);
  error.textContent = "";
  state.selectedBusiness = canManageAll(user) ? "ทั้งหมด" : user.business;
  saveState("Login", `${user.name} (${user.userId})`);
  render();
}

function logout() {
  const user = currentUser();
  if (user) saveState("Logout", `${user.name} (${user.userId})`);
  state.currentUserId = "";
  sessionStorage.removeItem(SESSION_KEY);
  render();
}

function upsertUser(event) {
  event.preventDefault();
  if (!currentUser() || currentUser().role !== "admin") return;
  const userId = document.getElementById("newUserId").value.trim();
  const pin = document.getElementById("newUserPin").value.trim();
  const name = document.getElementById("newUserName").value.trim();
  const business = document.getElementById("newUserBusiness").value;
  const role = document.getElementById("newUserRole").value;
  const active = document.getElementById("newUserActive").value === "true";
  if (!userId || !pin || !name || pin.length < 4) {
    alert("กรุณาใส่ User ID, ชื่อ, และ PIN อย่างน้อย 4 หลัก");
    return;
  }
  const existing = state.users.find((user) => user.userId === userId);
  const nextUser = { userId, pin, name, business, role, active };
  if (existing) Object.assign(existing, nextUser);
  else state.users.push(nextUser);
  event.target.reset();
  document.getElementById("newUserActive").value = "true";
  saveState(existing ? "อัปเดต User" : "สร้าง User", `${userId} / ${business} / ${role}`);
  render();
}

function handleUserActions(event) {
  const button = event.target.closest("button[data-user-action]");
  if (!button || !currentUser() || currentUser().role !== "admin") return;
  const target = state.users.find((user) => user.userId === button.dataset.userId);
  if (!target) return;
  if (button.dataset.userAction === "edit") {
    document.getElementById("newUserId").value = target.userId;
    document.getElementById("newUserName").value = target.name;
    document.getElementById("newUserPin").value = target.pin;
    document.getElementById("newUserBusiness").value = target.business;
    document.getElementById("newUserRole").value = target.role;
    document.getElementById("newUserActive").value = String(target.active);
  }
  if (button.dataset.userAction === "toggle") {
    if (target.userId === state.currentUserId) {
      alert("ไม่สามารถปิด user ตัวเองที่กำลัง login อยู่");
      return;
    }
    target.active = !target.active;
    saveState("เปลี่ยนสถานะ User", `${target.userId} เป็น ${target.active ? "Active" : "Inactive"}`);
    render();
  }
}

function setupEvents() {
  document.getElementById("workDate").value = todayIso();
  document.getElementById("startDate").value = MIN_DATE;
  document.getElementById("endDate").value = todayIso();
  document.getElementById("extractButton").addEventListener("click", extractMockValues);
  document.getElementById("evidenceUpload").addEventListener("change", handleEvidencePreview);
  document.getElementById("exportCsvButton").addEventListener("click", exportCsv);
  document.getElementById("resetDemoButton").addEventListener("click", resetDemoData);
  document.getElementById("seedTodayButton").addEventListener("click", () => {
    state.selectedBusiness = "ทั้งหมด";
    render();
  });
  document.getElementById("ledgerBusinessFilter").addEventListener("change", renderLedger);
  document.getElementById("ledgerStatusFilter").addEventListener("change", renderLedger);
  document.getElementById("startDate").addEventListener("change", render);
  document.getElementById("endDate").addEventListener("change", render);
  document.getElementById("intakeForm").addEventListener("submit", submitIntake);
  document.getElementById("loginForm").addEventListener("submit", login);
  document.getElementById("logoutButton").addEventListener("click", logout);
  document.getElementById("userForm").addEventListener("submit", upsertUser);
  document.body.addEventListener("click", handleTableActions);
  document.body.addEventListener("click", handleUserActions);
}

renderSelects();
setupEvents();
render();
