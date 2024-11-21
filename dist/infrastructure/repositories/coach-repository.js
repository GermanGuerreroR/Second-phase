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
exports.CoachRepository = void 0;
const data_source_1 = require("./config/data-source");
class CoachRepository {
    addCoach(coach) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = (0, data_source_1.getPoolConnection)();
            const insertPersonalInfoSQL = `INSERT INTO coach(name, email, user_name, password, experience) VALUES(?,?,?,?,?)`;
            const personalInfoValues = [
                coach.personalInfo.name,
                coach.personalInfo.email,
                coach.personalInfo.userName,
                coach.personalInfo.password,
                coach.coachInfo.experience,
            ];
            const result = [];
            const firstInsertion = yield connection.query(insertPersonalInfoSQL, personalInfoValues);
            result.push(firstInsertion[0]);
            const generatedCoachId = firstInsertion[0].insertId;
            if (coach.certificationInfo) {
                const insertCertificationSQL = `INSERT INTO certifications (certification_name, certification_date, certifying_entity, id_coach_fk) VALUES (?,?,?,?)`;
                const certificationDate = new Date(coach.certificationInfo.certificationDate);
                console.log(certificationDate);
                const certificationValues = [
                    coach.certificationInfo.certificationName,
                    certificationDate.toISOString().split("T")[0],
                    coach.certificationInfo.certifyingEntity,
                    generatedCoachId,
                ];
                const secondInsertion = yield connection.query(insertCertificationSQL, certificationValues);
                result.push(secondInsertion[0]);
            }
            if (coach.specialityInfo) {
                const insertSpecialitySQL = `INSERT INTO specialities (id_coach_fk, specialty_name) VALUES (?,?)`;
                const specialitiesValues = [
                    generatedCoachId,
                    coach.specialityInfo.specialityName,
                ];
                const thirdInsertion = yield connection.query(insertSpecialitySQL, specialitiesValues);
                result.push(thirdInsertion[0]);
            }
            return result;
        });
    }
    getCoaches() {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = (0, data_source_1.getPoolConnection)();
            const querySql = `SELECT * FROM coach A INNER JOIN certifications B on A.id_coach= B.id_coach_fk INNER JOIN specialities C on B.id_coach_fk = C.id_coach_fk;`;
            const result = yield connection.query(querySql);
            return result[0];
        });
    }
    getCoach(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = (0, data_source_1.getPoolConnection)();
            const querySql = `SELECT * FROM coach A INNER JOIN certifications B on A.id_coach= B.id_coach_fk INNER JOIN specialities C on B.id_coach_fk = C.id_coach_fk WHERE A.id_coach = ?;`;
            const values = [id];
            const result = yield connection.query(querySql, values);
            return result[0];
        });
    }
    updateCoach(coach, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = (0, data_source_1.getPoolConnection)();
            const querySql = `UPDATE coach SET name= ?, email=?, user_name=?, password=?, experience=? WHERE id_coach =?`;
            const values = [coach.personalInfo.name, coach.personalInfo.email, coach.personalInfo.userName, coach.personalInfo.password, coach.coachInfo.experience, id];
            const result = yield connection.query(querySql, values);
            return result[0];
        });
    }
    deleteCoach(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = (0, data_source_1.getPoolConnection)();
            const querySQL = `DELETE FROM coach WHERE id_coach = ? `;
            const values = [id];
            const result = yield connection.query(querySQL, values);
            return result[0];
        });
    }
}
exports.CoachRepository = CoachRepository;
//# sourceMappingURL=coach-repository.js.map