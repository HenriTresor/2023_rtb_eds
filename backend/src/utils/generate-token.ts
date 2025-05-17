import jwt from 'jsonwebtoken'
import config from '../config/config'

export default (userId: string, role: string) => {
    return jwt.sign({ userId, role }, process.env.SECRET_KEY as string)
}