import { createContext } from 'react'

/**
 * @typedef {Object} User
 * @property {number} id
 * @property {string} email
 * @property {string} role
 * @property {string} nome
 * @property {string} cognome
 * @property {string} password
 * @property {boolean} attivo
 */

/**
 * @typedef {Object} AuthContextValue
 * @property {User|null} user
 * @property {(email: string, password: string) => { success: boolean, message?: string, user?: User }} login
 * @property {() => void} logout
 * @property {string[]} menuItems
 * @property {string} roleLabel
 */

/** @type {AuthContextValue | null} */
export const AuthContext = createContext(null)
