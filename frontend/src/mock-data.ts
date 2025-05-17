import type { EmployeeLaptop } from "./types";

const departments = ['HR', 'Engineering', 'Sales', 'Finance', 'Support'];
const positions = ['Manager', 'Developer', 'Analyst', 'Executive', 'Technician'];
const manufacturers = ['Dell', 'HP', 'Lenovo', 'Apple', 'Asus'];
const models = ['XPS 13', 'MacBook Pro', 'ThinkPad X1', 'Pavilion 15', 'ZenBook 14'];

function generateMockEmployees(count: number = 100) {
    const employees: EmployeeLaptop[] = [];

    for (let i = 1; i <= count; i++) {
        const first = `User${i}`;
        const last = `Test${i}`;
        const email = `user${i}@example.com`;

        employees.push({
            id: i,
            firstname: first,
            lastname: last,
            nationalIdentity: `NI${1000000000 + i}`,
            telephone: `+251911000${(i % 1000).toString().padStart(3, '0')}`,
            email: email,
            department: departments[i % departments.length],
            position: positions[i % positions.length],
            laptopManufacturer: manufacturers[i % manufacturers.length],
            model: models[i % models.length],
            serialNumber: `SN-${Math.random().toString(36).substring(2, 10).toUpperCase()}`
        });
    }

    return employees;
}

export default generateMockEmployees
