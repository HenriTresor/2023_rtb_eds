export type EmployeeLaptop = {
    id: number;
    firstname: string;
    lastname: string;
    nationalIdentity: string;
    telephone: string;
    email: string;
    department: string;
    position: string;
    laptopManufacturer: string;
    model: string;
    serialNumber: string;
};


export type User = {
    email: string;
    password: string;
    username: string;
}