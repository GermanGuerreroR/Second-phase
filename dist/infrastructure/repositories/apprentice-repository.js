"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApprenticeRepository = void 0;
const data_source_1 = require("./config/data-source");
class ApprenticeRepository {
    async addApprentice(apprentice) {
        var _a;
        const connection = (0, data_source_1.getPoolConnection)();
        const insertPersonalApprenticeInfoSQL = 'INSERT INTO apprentice(name, email, user_name, password, date_birth, gender, training_goal,  id_coach_fk, fitness_level) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)';
        const values = [apprentice.personalInfo.name, apprentice.personalInfo.email, apprentice.personalInfo.userName,
            apprentice.personalInfo.password, apprentice.apprenticeInfo.dateBirth, apprentice.apprenticeInfo.gender, apprentice.apprenticeInfo.trainingGoal, apprentice.apprenticeInfo.coachID, apprentice.apprenticeInfo.fitnessLevel];
        const result = [];
        const firstInsertion = await connection.query(insertPersonalApprenticeInfoSQL, values);
        result.push(firstInsertion[0]);
        if (apprentice.apprenticeInfo.trainingGoal === "Other") {
            const insertCustomTrainingGoalSQL = `INSERT INTO custom_training_goals VALUES (?,?)`;
            const customTrainingGoalValue = [firstInsertion[0].insertId, (_a = apprentice.customTrainingGoalInfo) === null || _a === void 0 ? void 0 : _a.customGoalDescription];
            const secondInsertion = await connection.query(insertCustomTrainingGoalSQL, customTrainingGoalValue);
            result.push(secondInsertion[0]);
        }
        return result;
    }
    async getApprentices() {
        const connection = (0, data_source_1.getPoolConnection)();
        const querySql = `SELECT * FROM apprentice`;
        const result = await connection.query(querySql);
        return result[0];
    }
    async getApprentice(idApprentice) {
        const connection = (0, data_source_1.getPoolConnection)();
        const querySql = `SELECT * FROM apprentice WHERE id_apprentice = ?`;
        const values = [idApprentice];
        const result = await connection.query(querySql, values);
        return result[0];
    }
    async updateApprentice(apprentice, idApprentice) {
        const connection = (0, data_source_1.getPoolConnection)();
        const querySql = `UPDATE apprentice SET name = ?, email=?, user_name=?, password = ?, date_birth = ?, gender = ?,  custom_training_goal = ?, id_coach_fk = ?, fitness_level = ? WHERE id_apprentice = ?`;
        const values = [apprentice.personalInfo.name, apprentice.personalInfo.email, apprentice.personalInfo.userName, apprentice.personalInfo.password, apprentice.apprenticeInfo.dateBirth, apprentice.apprenticeInfo.gender, apprentice.apprenticeInfo.trainingGoal, apprentice.apprenticeInfo.coachID, apprentice.apprenticeInfo.fitnessLevel];
        const result = await connection.query(querySql, values);
        return result[0];
    }
    async deleteApprentice(idApprentice) {
        const connection = (0, data_source_1.getPoolConnection)();
        const querySql = ` DELETE FROM apprentice WHERE id_apprentice = ?`;
        const values = [idApprentice];
        const result = await connection.query(querySql, values);
        return result[0];
    }
}
exports.ApprenticeRepository = ApprenticeRepository;
