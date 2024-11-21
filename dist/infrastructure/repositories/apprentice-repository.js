"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApprenticeRepository = void 0;
const data_source_1 = require("./config/data-source");
class ApprenticeRepository {
    addApprentice(apprentice) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const connection = (0, data_source_1.getPoolConnection)();
            const insertPersonalApprenticeInfoSQL = 'INSERT INTO apprentice(name, email, user_name, password, date_birth, gender, training_goal,  id_coach_fk, fitness_level) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)';
            const values = [apprentice.personalInfo.name, apprentice.personalInfo.email, apprentice.personalInfo.userName,
                apprentice.personalInfo.password, apprentice.apprenticeInfo.dateBirth, apprentice.apprenticeInfo.gender, apprentice.apprenticeInfo.trainingGoal, apprentice.apprenticeInfo.coachID, apprentice.apprenticeInfo.fitnessLevel];
            const result = [];
            const firstInsertion = yield connection.query(insertPersonalApprenticeInfoSQL, values);
            result.push(firstInsertion[0]);
            if (apprentice.apprenticeInfo.trainingGoal === "Other") {
                const insertCustomTrainingGoalSQL = `INSERT INTO custom_training_goals VALUES (?,?)`;
                const customTrainingGoalValue = [firstInsertion[0].insertId, (_a = apprentice.customTrainingGoalInfo) === null || _a === void 0 ? void 0 : _a.customGoalDescription];
                const secondInsertion = yield connection.query(insertCustomTrainingGoalSQL, customTrainingGoalValue);
                result.push(secondInsertion[0]);
            }
            return result;
        });
    }
    getApprentices() {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = (0, data_source_1.getPoolConnection)();
            const querySql = `SELECT * FROM apprentice`;
            const result = yield connection.query(querySql);
            return result[0];
        });
    }
    getApprentice(idApprentice) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = (0, data_source_1.getPoolConnection)();
            const querySql = `SELECT * FROM apprentice WHERE id_apprentice = ?`;
            const values = [idApprentice];
            const result = yield connection.query(querySql, values);
            return result[0];
        });
    }
    updateApprentice(apprentice, idApprentice) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = (0, data_source_1.getPoolConnection)();
            const querySql = `UPDATE apprentice SET name = ?, email=?, user_name=?, password = ?, date_birth = ?, gender = ?,  custom_training_goal = ?, id_coach_fk = ?, fitness_level = ? WHERE id_apprentice = ?`;
            const values = [apprentice.personalInfo.name, apprentice.personalInfo.email, apprentice.personalInfo.userName, apprentice.personalInfo.password, apprentice.apprenticeInfo.dateBirth, apprentice.apprenticeInfo.gender, apprentice.apprenticeInfo.trainingGoal, apprentice.apprenticeInfo.coachID, apprentice.apprenticeInfo.fitnessLevel];
            const result = yield connection.query(querySql, values);
            return result[0];
        });
    }
    deleteApprentice(idApprentice) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = (0, data_source_1.getPoolConnection)();
            const querySql = ` DELETE FROM apprentice WHERE id_apprentice = ?`;
            const values = [idApprentice];
            const result = yield connection.query(querySql, values);
            return result[0];
        });
    }
}
exports.ApprenticeRepository = ApprenticeRepository;
//# sourceMappingURL=apprentice-repository.js.map