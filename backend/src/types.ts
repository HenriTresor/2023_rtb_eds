export type User = {
    email: string;
    username: string;
    password: string;
    role: 'ADMIN' | 'USER'
}

export type Employee = {
    id: number;
    firstName: string;
    lastName: string;
    nationalIdentity: string;
    telephone: string;
    email: string;
    department: string;
    position: string;
    laptopManufacturer: string;
    model: string;
    serialNumber: string;
}


export type Vehicle = {
    id: number;
    plate_no: string;
    ownerId: number;
}