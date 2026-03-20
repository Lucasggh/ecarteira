import {Pool} from 'pg'
import {dotenv} from 'dotenv'
dotenv.config()
const pool = new Pool({
    user:process.env.PG_USER,
    host:'localhost',
    database:'ecarteira',
    password:process.env.PG_PASSWORD
})