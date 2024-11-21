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
exports.ApprenticeController = void 0;
const Apprentice_1 = require("../../domain/models/Apprentice");
const apprentice_dto_1 = require("../../infrastructure/dto/apprentice-dto");
const apprentice_repository_1 = require("../../infrastructure/repositories/apprentice-repository");
const validationID_1 = require("../utils/validationID");
class ApprenticeController {
    constructor(repository = new apprentice_repository_1.ApprenticeRepository()) {
        this.repository = repository;
    }
    add(body, payload, bodyTwo) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(body);
                console.log(payload);
                console.log(bodyTwo);
                const dto = new apprentice_dto_1.ApprenticeDto(body, payload, bodyTwo);
                const errors = yield dto.validateDto();
                if (errors.length > 0) {
                    return { ok: false, message: "The Request has error", error: errors };
                }
                const apprentice = new Apprentice_1.Apprentice({ name: body.name, email: body.email, userName: body.userName, password: body.password }, { dateBirth: payload.dateBirth, gender: payload.gender, trainingGoal: payload.trainingGoal, coachID: payload.coachID, fitnessLevel: payload.fitnessLevel }, { customGoalDescription: bodyTwo === null || bodyTwo === void 0 ? void 0 : bodyTwo.customGoalDescription });
                const result = yield this.repository.addApprentice(apprentice);
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
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.repository.getApprentices();
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
        });
    }
    getId(idApprentice) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if ((0, validationID_1.validationID)(idApprentice))
                    return (0, validationID_1.validationID)(idApprentice);
                const result = yield this.repository.getApprentice(idApprentice);
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
        });
    }
    delete(idApprentice) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if ((0, validationID_1.validationID)(idApprentice))
                    return (0, validationID_1.validationID)(idApprentice);
                const result = yield this.repository.deleteApprentice(idApprentice);
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
        });
    }
}
exports.ApprenticeController = ApprenticeController;
//# sourceMappingURL=apprentice-controller.js.map