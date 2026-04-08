import db from "../lib/db.js"
import type { UserDBType, UserType } from "../utils/types.js"
import { generateUUID } from "../utils/uuid.js"
import { hashPassword, comparePassword } from "../utils/password.js"
import { formatDateDDMMYYYY } from "../utils/date.js"

export const UserModel = {

    async create(newUsers: UserDBType) {
        try {
            const query = `INSERT INTO tbl_users
                (id, nome, numero_indentificado, email, telefone, numero_utilizador,
                 data_nascimento, localidade, password, enabled, created_at, updated_at)
                VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`
            const values = [
                generateUUID(),
                newUsers.nome,
                newUsers.numero_identificado,
                newUsers.email,
                newUsers.telefone,
                newUsers.numero_utilizador,
                formatDateDDMMYYYY(newUsers.data_nascimento),
                newUsers.localidade,
                await hashPassword(newUsers.password),
                newUsers.enabled ?? true,
                new Date(),
                new Date()
            ]
            const rows: any = await db.execute(query, values)
            return rows[0].affectedRows === 1
        } catch (error) {
            console.error("[UserModel.create]", error)
            return null
        }
    },

    async getAll() {
        try {
            const [rows] = await db.execute(
                `SELECT id, nome, email, telefone, numero_utilizador, localidade, enabled, created_at, updated_at
                 FROM tbl_users ORDER BY created_at DESC`
            )
            return rows
        } catch (error) {
            console.error("[UserModel.getAll]", error)
            return null
        }
    },

    async get(id: string) {
        try {
            const [rows] = await db.execute(
                `SELECT id, nome, email, telefone, numero_utilizador, localidade, enabled, created_at, updated_at
                 FROM tbl_users WHERE id = ?`,
                [id]
            )
            if (Array.isArray(rows) && rows.length === 0) return null
            return Array.isArray(rows) ? rows[0] : null
        } catch (error) {
            console.error("[UserModel.get]", error)
            return null
        }
    },

    async getByEmail(email: string): Promise<UserType | null> {
        try {
            const [rows] = await db.execute(
                `SELECT * FROM tbl_users WHERE email = ?`,
                [email]
            )
            if (Array.isArray(rows) && rows.length === 0) return null
            return Array.isArray(rows) ? rows[0] as UserType : null
        } catch (err) {
            console.error("[UserModel.getByEmail]", err)
            return null
        }
    },

    async update(id: string, UserAtualizado: UserDBType) {
        try {
            const query = `UPDATE tbl_users
                SET nome=?, numero_indentificado=?, email=?, telefone=?,
                    numero_utilizador=?, data_nascimento=?, localidade=?,
                    enabled=?, updated_at=?
                WHERE id=?`
            const values = [
                UserAtualizado.nome,
                UserAtualizado.numero_identificado,
                UserAtualizado.email,
                UserAtualizado.telefone,
                UserAtualizado.numero_utilizador,
                UserAtualizado.data_nascimento,
                UserAtualizado.localidade,
                UserAtualizado.enabled,
                new Date(),
                id
            ]
            const rows: any = await db.execute(query, values)
            return rows[0].affectedRows === 1
        } catch (error) {
            console.error("[UserModel.update]", error)
            return null
        }
    },

    async delete(id: string) {
        try {
            const rows: any = await db.execute(
                `DELETE FROM tbl_users WHERE id = ?`, [id]
            )
            return rows[0].affectedRows === 1
        } catch (error) {
            console.error("[UserModel.delete]", error)
            return null
        }
    },

    /**
     * Rota protegida: exige oldPassword para validar antes de gravar novo hash
     */
    async updatePassword(id: string, oldPassword: string, newPassword: string) {
        try {
            // Buscar hash actual
            const [rows] = await db.execute(
                `SELECT password FROM tbl_users WHERE id = ?`, [id]
            )
            if (!Array.isArray(rows) || rows.length === 0) return { ok: false, reason: "not_found" }

            const currentHash = (rows[0] as any).password
            const valido = await comparePassword(oldPassword, currentHash)
            if (!valido) return { ok: false, reason: "wrong_password" }

            const novoHash = await hashPassword(newPassword)
            const result: any = await db.execute(
                `UPDATE tbl_users SET password=?, updated_at=? WHERE id=?`,
                [novoHash, new Date(), id]
            )
            return result[0].affectedRows === 1
                ? { ok: true }
                : { ok: false, reason: "db_error" }
        } catch (error) {
            console.error("[UserModel.updatePassword]", error)
            return null
        }
    },

    /**
     * Reset sem validar password antiga (uso admin / recuperação de conta)
     */
    async resetPassword(id: string, newPassword: string) {
        try {
            const novoHash = await hashPassword(newPassword)
            const rows: any = await db.execute(
                `UPDATE tbl_users SET password=?, updated_at=? WHERE id=?`,
                [novoHash, new Date(), id]
            )
            return rows[0].affectedRows === 1
        } catch (error) {
            console.error("[UserModel.resetPassword]", error)
            return null
        }
    }
}
