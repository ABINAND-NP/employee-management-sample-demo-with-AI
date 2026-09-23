const token = "YOUR_ADMIN_TOKEN";

for (let i = 1; i <= 10; i++) {

    const employee = {
        name: `Employee ${i}`,
        email: `employee${i}@company.com`,
        phone: `98765432${String(i).padStart(2, "0")}`,
        department: i % 2 === 0 ? "HR" : "IT",
        designation: i % 2 === 0 ? "HR Executive" : "Software Developer",
        joiningDate: "2026-09-23"
    };

    fetch("http://localhost:4000/api/employees/add", {
        method: "POST",

        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },

        body: JSON.stringify(employee)
    })
        .then(response => response.json())
        .then(data => {
            console.log(`Employee ${i}:`, data);
        })
        .catch(error => {
            console.log(`Employee ${i} failed:`, error);
        });
}