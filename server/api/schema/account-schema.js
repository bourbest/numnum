import {string, required, Schema } from '../../../src/sapin'

const baseAccountSchema = {
  id: string,
  username: string(required),
  password: string(required)
}

export const accountSchema = new Schema(baseAccountSchema)

export const newAccountSchema = new Schema({
  ...baseAccountSchema,
  password: string(required),
  confirm: string([required])
})
