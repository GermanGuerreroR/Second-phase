
import { FieldPacket, ResultSetHeader, Pool, RowDataPacket } from "mysql2/promise";
import { Coach } from "../../domain/models/Coach";
import { getPoolConnection } from "./config/data-source";

export class CoachRepository {
    async addCoach(coach: Coach): Promise<ResultSetHeader[]> {
        const connection: Pool = getPoolConnection();
        const insertPersonalInfoSQL: string = `INSERT INTO coach(name, email, user_name, password, experience) VALUES(?,?,?,?,?)`;
        const personalInfoValues: Array<string | number> = [
            coach.personalInfo.name,
            coach.personalInfo.email,
            coach.personalInfo.userName,
            coach.personalInfo.password,
            coach.coachInfo.experience,
        ];

        const result: ResultSetHeader[] = [];


        const firstInsertion: [ResultSetHeader, FieldPacket[]] = await connection.query(insertPersonalInfoSQL, personalInfoValues);
        result.push(firstInsertion[0]);

        const generatedCoachId: number = firstInsertion[0].insertId;


        if (coach.certificationInfo) {
            const insertCertificationSQL: string = `INSERT INTO certifications (certification_name, certification_date, certifying_entity, id_coach_fk) VALUES (?,?,?,?)`;
            const certificationDate = new Date(coach.certificationInfo.certificationDate);
            console.log(certificationDate);
            const certificationValues: Array<string | number> = [
                coach.certificationInfo.certificationName,
                certificationDate.toISOString().split("T")[0],
                coach.certificationInfo.certifyingEntity,
                generatedCoachId,
            ];

            const secondInsertion: [ResultSetHeader, FieldPacket[]] = await connection.query(insertCertificationSQL, certificationValues);
            result.push(secondInsertion[0]);
        }


        if (coach.specialityInfo) {
            const insertSpecialitySQL: string = `INSERT INTO specialities (id_coach_fk, specialty_name) VALUES (?,?)`;
            const specialitiesValues: Array<string | number> = [
                generatedCoachId,
                coach.specialityInfo.specialityName,
            ];

            const thirdInsertion: [ResultSetHeader, FieldPacket[]] = await connection.query(insertSpecialitySQL, specialitiesValues);
            result.push(thirdInsertion[0]);
        }

        return result;
    }


    async getCoaches(): Promise<RowDataPacket[]> {
        const connection = getPoolConnection();
        const querySql = `SELECT * FROM coach A INNER JOIN certifications B on A.id_coach= B.id_coach_fk INNER JOIN specialities C on B.id_coach_fk = C.id_coach_fk;`;
        const result = await connection.query<RowDataPacket[]>(querySql);
        return result[0];
    }

    async getCoach(id: number): Promise<RowDataPacket[]> {
        const connection = getPoolConnection();
        const querySql = `SELECT * FROM coach A INNER JOIN certifications B on A.id_coach= B.id_coach_fk INNER JOIN specialities C on B.id_coach_fk = C.id_coach_fk WHERE A.id_coach = ?;`;
        const values = [id];
        const result = await connection.query<RowDataPacket[]>(querySql, values);
        return result[0];
    }

    async updateCoach(coach: Coach, id: number) {
        const connection = getPoolConnection();
        const querySql = `UPDATE coach SET name= ?, email=?, user_name=?, password=?, experience=? WHERE id_coach =?`;
        const values = [coach.personalInfo.name, coach.personalInfo.email, coach.personalInfo.userName, coach.personalInfo.password, coach.coachInfo.experience, id];
        const result = await connection.query<ResultSetHeader>(querySql, values);
        return result[0];
    }

    async deleteCoach(id: number) {
        const connection = getPoolConnection();
        const querySQL = `DELETE FROM coach WHERE id_coach = ? `;
        const values = [id];
        const result = await connection.query<ResultSetHeader>(querySQL, values);
        return result[0];
    }


    //Certifications







    // async updateCertification(certificationName: string, id: number) {
    //     const connection = getPoolConnection();
    //     const querySql = `UPDATE certification SET certification_name= ?, certification_date=?, user_name=?, password=?, experience=? WHERE id_coach =?`;
    //     const values = [coach.personalInfo.name, coach.personalInfo.email, coach.personalInfo.userName, coach.personalInfo.password, coach.coachInfo.experience, id];
    //     const result = await connection.query<ResultSetHeader>(querySql, values);
    //     return result[0];
    // }




    // async deleteCertification(id: number, certificationName: string) {
    //     const connection = getPoolConnection();
    //     const querySQL = `DELETE FROM certifications WHERE id_coach_fk = ? AND certification_name = ?`;
    //     const values = [id, certificationName];
    //     const result = await connection.query<ResultSetHeader>(querySQL, values);
    //     return result[0];
    // }

    // async deleteSpeciality(id: number, specialityName: string) {
    //     const connection = getPoolConnection();
    //     const querySQL = `DELETE FROM specialities WHERE id_coach_fk = ? AND specialty_name = ?`;
    //     const values = [id, specialityName];
    //     const result = await connection.query<ResultSetHeader>(querySQL, values);
    //     return result[0];
    // }



}

