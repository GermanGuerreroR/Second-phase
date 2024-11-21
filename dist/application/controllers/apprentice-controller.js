"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApprenticeController = void 0;
const Apprentice_1 = require("../../domain/models/Apprentice");
const apprentice_dto_1 = require("../../infrastructure/dto/apprentice-dto");
const apprentice_repository_1 = require("../../infrastructure/repositories/apprentice-repository");
const validationID_1 = require("../utils/validationID");
class ApprenticeController {
    constructor(repository = new apprentice_repository_1.ApprenticeRepository()) {
        this.repository = repository;
    }
    async add(body, payload, bodyTwo) {
        try {
            console.log(body);
            console.log(payload);
            console.log(bodyTwo);
            const dto = new apprentice_dto_1.ApprenticeDto(body, payload, bodyTwo);
            const errors = await dto.validateDto();
            if (errors.length > 0) {
                return { ok: false, message: "The Request has error", error: errors };
            }
            const apprentice = new Apprentice_1.Apprentice({ name: body.name, email: body.email, userName: body.userName, password: body.password }, { dateBirth: payload.dateBirth, gender: payload.gender, trainingGoal: payload.trainingGoal, coachID: payload.coachID, fitnessLevel: payload.fitnessLevel }, { customGoalDescription: bodyTwo === null || bodyTwo === void 0 ? void 0 : bodyTwo.customGoalDescription });
            const result = await this.repository.addApprentice(apprentice);
            if (result[0].affectedRows === 1) {
                return { ok: true, msg: "Apprentice added successfully", id: `The new apprentice's ID ${result[0].insertId}` };
            }
            else {
                return { ok: false, message: "The apprentice not added " };
            }
        }
        catch (error) {
            throw { ok: false, message: "An unexpected error has occurred", error };
        }
        ;
    }
    async getAll() {
        try {
            const result = await this.repository.getApprentices();
            if (result.length === 0) {
                return { ok: true, message: "There are no registered apprentices." };
            }
            else {
                return { ok: true, Apprentices: result };
            }
        }
        catch (error) {
            throw { ok: false, message: "An unexpected error has occurred", error };
        }
    }
    async getId(idApprentice) {
        try {
            // if (!idApprentice || Number.isNaN(idApprentice)) {
            //     return { ok: false, message: "The entered ID must be a numeric value and is mandatory" };
            // }
            if ((0, validationID_1.validationID)(idApprentice))
                return (0, validationID_1.validationID)(idApprentice);
            const result = await this.repository.getApprentice(idApprentice);
            if (result.length === 1) {
                return { ok: true, message: result[0] };
            }
            else {
                return { ok: false, message: "Apprentice not found." };
            }
        }
        catch (error) {
            throw { ok: false, message: "An unexpected error has occurred", error };
        }
    }
    // async update(body:
    //     { name: string, email: string, userName: string, password: string },
    //     payload: { dateBirth: Date, gender: Gender, trainingGoal: TrainingGoals, coachID: number, fitnessLevel: FitnessLevel },
    //     idApprentice: number) {
    //     try {
    //         const dto = new ApprenticeDto(body, payload);
    //         const errores = await dto.validateDto();
    //         if (errores.length > 0) {
    //             return { ok: false, message: "The Request has error", error: errores }
    //         }
    //         if (!idApprentice || Number.isNaN(idApprentice)) {
    //             return { ok: false, message: "The entered ID must be a numeric value and is mandatory" };
    //         }
    //         const apprentice = new Apprentice(body, payload, customTrainingGoal);
    //         const result = await this.repository.updateApprentice(apprentice, idApprentice)
    //         if (result.affectedRows === 1) {
    //             return { ok: true, message: `The apprentice with ID ${idApprentice} was successfully updated  ` }
    //         }
    //     } catch (error) {
    //         throw { ok: false, message: "An unexpected error has occurred", error }
    //     }
    async delete(idApprentice) {
        try {
            // if (!idApprentice || Number.isNaN(idApprentice)) {
            //     return { ok: false, message: "The entered ID must be a numeric value and is mandatory" };
            // }
            if ((0, validationID_1.validationID)(idApprentice))
                return (0, validationID_1.validationID)(idApprentice);
            const result = await this.repository.deleteApprentice(idApprentice);
            if (result.affectedRows === 1) {
                return { ok: true, message: result };
            }
            else {
                return { ok: false, message: "Apprentice not found." };
            }
        }
        catch (error) {
            throw { ok: false, message: "An unexpected error has occurred", error };
        }
    }
}
exports.ApprenticeController = ApprenticeController;
