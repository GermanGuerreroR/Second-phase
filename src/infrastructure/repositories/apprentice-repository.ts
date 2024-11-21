import { Apprentice } from "../../domain/models/Apprentice";
import { FieldPacket, ResultSetHeader, Pool, RowDataPacket } from "mysql2/promise";
import { getPoolConnection } from "./config/data-source";



export class ApprenticeRepository {
    async addApprentice(apprentice: Apprentice): Promise<ResultSetHeader[]> {

        const connection = getPoolConnection();
        const insertPersonalApprenticeInfoSQL = 'INSERT INTO apprentice(name, email, user_name, password, date_birth, gender, training_goal,  id_coach_fk, fitness_level) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)';
        const values = [apprentice.personalInfo.name, apprentice.personalInfo.email, apprentice.personalInfo.userName,
        apprentice.personalInfo.password, apprentice.apprenticeInfo.dateBirth, apprentice.apprenticeInfo.gender, apprentice.apprenticeInfo.trainingGoal, apprentice.apprenticeInfo.coachID, apprentice.apprenticeInfo.fitnessLevel]

        const result: ResultSetHeader[] = [];
        const firstInsertion: [ResultSetHeader, FieldPacket[]] = await connection.query(insertPersonalApprenticeInfoSQL, values);
        result.push(firstInsertion[0])

        if (apprentice.apprenticeInfo.trainingGoal === "Other") {
            const insertCustomTrainingGoalSQL: string = `INSERT INTO custom_training_goals VALUES (?,?)`;
            const customTrainingGoalValue = [firstInsertion[0].insertId, apprentice.customTrainingGoalInfo?.customGoalDescription]
            const secondInsertion: [ResultSetHeader, FieldPacket[]] = await connection.query(insertCustomTrainingGoalSQL, customTrainingGoalValue);
            result.push(secondInsertion[0])
        }

        return result;
    }


    async getApprentices(): Promise<RowDataPacket[]> {
        const connection = getPoolConnection();
        const querySql = `SELECT * FROM apprentice`
        const result = await connection.query<RowDataPacket[]>(querySql);
        return result[0];
    }

    async getApprentice(idApprentice: number): Promise<RowDataPacket[]> {
        const connection = getPoolConnection();
        const querySql = `SELECT * FROM apprentice WHERE id_apprentice = ?`
        const values = [idApprentice];
        const result = await connection.query<RowDataPacket[]>(querySql, values);
        return result[0];
    }

    async updateApprentice(apprentice: Apprentice, idApprentice: number) {
        const connection = getPoolConnection();
        const querySql = `UPDATE apprentice SET name = ?, email=?, user_name=?, password = ?, date_birth = ?, gender = ?,  custom_training_goal = ?, id_coach_fk = ?, fitness_level = ? WHERE id_apprentice = ?`
        const values: Array<string | number | Date> = [apprentice.personalInfo.name, apprentice.personalInfo.email, apprentice.personalInfo.userName, apprentice.personalInfo.password, apprentice.apprenticeInfo.dateBirth, apprentice.apprenticeInfo.gender, apprentice.apprenticeInfo.trainingGoal, apprentice.apprenticeInfo.coachID, apprentice.apprenticeInfo.fitnessLevel]
        const result = await connection.query<ResultSetHeader>(querySql, values);
        return result[0];
    }

    async deleteApprentice(idApprentice: number): Promise<ResultSetHeader> {
        const connection = getPoolConnection();
        const querySql = ` DELETE FROM apprentice WHERE id_apprentice = ?`;
        const values = [idApprentice]
        const result = await connection.query<ResultSetHeader>(querySql, values);
        return result[0];
    }
}