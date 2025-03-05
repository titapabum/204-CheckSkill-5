// === script.js ===

document.addEventListener("DOMContentLoaded", () => {
  loadTodos(); // โหลดรายการ To-Do จาก LocalStorage เมื่อเปิดหน้าเว็บ
  fetchUsers(); // ดึงข้อมูลผู้ใช้จาก API เมื่อหน้าเว็บโหลด
});

// 1) To-Do List Web App
const addTodo = () => {
  const todoInput = document.getElementById("todo-input"); // ดึงค่าจากช่อง input
  const todoList = document.getElementById("todo-list"); // ดึงรายการ To-Do
  const todoText = todoInput.value.trim(); // ตัดช่องว่างออก
  if (todoText) {  // ถ้ามีค่าที่พิมพ์มา
    const li = document.createElement("li");  // สร้าง <li> ใหม่
    li.textContent = todoText;                // กำหนดข้อความให้ <li>
    const btn = document.createElement("button"); //ปุ่มลบ
    btn.textContent = "ลบ"; 
    btn.onclick = () => {
      li.remove(); //ลบรายการเมื่อคลิกปุ่ม
      saveTodos(); //บันทึก
    };
    li.appendChild(btn);  //ใส่ปุ่มลบใน <li>
    todoList.appendChild(li);  //เพิ่ม <li> เข้าไปในรายการ
    todoInput.value = ""; // ล้างช่องกรอกหลังเพิ่มรายการ
    saveTodos();       //บันทึกรายการลง LocalStorag
  }
};

const saveTodos = () => {
  localStorage.setItem("todos", document.getElementById("todo-list").innerHTML);
};

const loadTodos = () => {
  const todoList = document.getElementById("todo-list");
  todoList.innerHTML = localStorage.getItem("todos") || "";
  // เพิ่ม Event Listener ให้ปุ่มลบหลังจากโหลดรายการ
  todoList.querySelectorAll("button").forEach((btn) => {
    btn.onclick = () => {
      btn.parentElement.remove();
      saveTodos();
    };
  });
};

// 2) Student Grade Calculator
const calculateGPA = () => {
  const subjects = ["CSI101", "CSI102", "CSI203", "CSI204", "CSI305"];
  let totalPoints = 0; //คะแนนรวม
  let totalCredits = 0; //หน่วยกิตรวม
  subjects.forEach((sub) => {
    const score = parseFloat(document.getElementById(sub).value) || 0; //ดึงค่าคะแนนจาก input
    let gradePoint =
      score >= 80 ? 4 : //A
      score >= 70 ? 3 : //B
      score >= 60 ? 2 : //C
      score >= 50 ? 1 : //D
      0;                //F
    totalPoints += gradePoint * 3; //คะแนน x หน่วยกิต (แต่ละวิชามี 3 หน่วยกิต) สมมุติ totalPoints = 12 + 9 + 6 + 0 + 12 = 39
    totalCredits += 3;  // เพิ่มหน่วยกิตรวม totalCredits = 3 + 3 + 3 + 3 + 3 = 15
  });
  document.getElementById("gpa-result").textContent = `GPA: ${(
    totalPoints / totalCredits //GPA = 39 / 15 = 2.60
  ).toFixed(2)}`; 
};

// 3) Simple API Data Fetching
const fetchUsers = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");  //ใช้ fetch() เพื่อดึงข้อมูลจาก JSONPlaceholder API ซึ่งเป็น API จำลอง
  const users = await response.json(); // แปลงข้อมูลเป็น JSON
  document.getElementById("user-list").innerHTML = users
    .map(
      (user) =>
        `<li><strong>${user.name}</strong> 
         - Email: ${user.email} <br>
         - Address: ${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}  </li>`
    )
    .join("");
};

// 4) Lottery Generator
const generateLotteryNumber = () => {
  return Array.from({ length: 6 }, () => Math.floor(Math.random() * 10)).join(
    ""
  );
};

document.getElementById("generate-lottery").addEventListener("click", () => {
  const lotteryNumber = generateLotteryNumber(); //สุ่มเลข 6 หลัก
  document.getElementById("lottery-number").textContent = lotteryNumber; //แสดงผล
});

document.getElementById("check-lottery").addEventListener("click", () => {
  const userNumber = document.getElementById("user-number").value; //รับค่าที่ผู้ใช้กรอก
  const lotteryNumber = document.getElementById("lottery-number").textContent; //ดึงหมายเลขที่สุ่มไว้
  document.getElementById("lottery-result").textContent =
    userNumber === lotteryNumber ? "ถูกรางวัล!" : "ไม่ถูกรางวัล"; //เปรียบเทียบเลข
});
