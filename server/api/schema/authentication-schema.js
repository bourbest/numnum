import {string, required, boolean, Schema } from '../../../src/sapin'

export const loginSchema = new Schema({
  username: string(required),
  password: string(required),
  keepLoggedIn: boolean
})