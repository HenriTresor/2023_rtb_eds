import bcrypt from 'bcrypt'

export default async (raw: string, hashedPassword: string) => {
    return await bcrypt.compare(raw, hashedPassword)
}