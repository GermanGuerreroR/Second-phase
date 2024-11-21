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
exports.CoachController = void 0;
const Coach_1 = require("../../domain/models/Coach");
const coach_dto_1 = require("../../infrastructure/dto/coach-dto");
const coach_repository_1 = require("../../infrastructure/repositories/coach-repository");
const validationID_1 = require("../utils/validationID");
class CoachController {
    constructor(repository = new coach_repository_1.CoachRepository()) {
        this.repository = repository;
    }
    ;
    add(body, payload, bodyTwo, payloadTwo) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("Body:", body);
                console.log("Payload:", payload);
                console.log("BodyTwo:", bodyTwo);
                console.log("PayloadTwo:", payloadTwo);
                const dto = new coach_dto_1.CoachDto(body, payload, bodyTwo, payloadTwo);
                const errores = yield dto.validateDto();
                if (errores.length > 0) {
                    return { ok: false, message: "The Request has error", error: errores };
                }
                const coach = new Coach_1.Coach({ name: body.name, email: body.email, userName: body.userName, password: body.password }, { experience: payload.experience }, { certificationName: bodyTwo.certificationName, certificationDate: bodyTwo.certificationDate, certifyingEntity: bodyTwo.certifyingEntity }, { specialityName: payloadTwo.specialityName });
                const result = yield this.repository.addCoach(coach);
                if (result) {
                    return { ok: true, msg: `Coach added successfully`, id: `The new coach's ID  ${result[0].insertId}` };
                }
                else {
                    return { ok: false, message: "The training not added " };
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
                const result = yield this.repository.getCoaches();
                if (result.length === 0) {
                    return { ok: true, message: "There are no registered coaches." };
                }
                else {
                    return { ok: true, coaches: result };
                }
            }
            catch (error) {
                throw { ok: false, message: "An unexpected error has occurred", error };
            }
        });
    }
    getId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!id || Number.isNaN(id)) {
                    return { ok: false, message: "The entered ID must be a numeric value and is mandatory" };
                }
                const result = yield this.repository.getCoach(id);
                if (result.length === 1) {
                    return { ok: true, message: result[0] };
                }
                else {
                    return { ok: false, message: "Coach not found." };
                }
            }
            catch (error) {
                throw { ok: false, message: "An unexpected error has occurred", error };
            }
        });
    }
    update(body, payload, bodyTwo, payloadTwo, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dto = new coach_dto_1.CoachDto(body, payload, bodyTwo, payloadTwo);
                const errores = yield dto.validateDto();
                if (errores.length > 0) {
                    return { ok: false, message: "The Request has error", error: errores };
                }
                if (!id || Number.isNaN(id)) {
                    return { ok: false, message: "The entered ID must be a numeric value and is mandatory" };
                }
                const coach = new Coach_1.Coach(body, payload, bodyTwo, payloadTwo);
                const result = yield this.repository.updateCoach(coach, id);
                if (result.affectedRows === 1) {
                    return { ok: true, message: `The coach with ID ${id} was successfully updated  ` };
                }
            }
            catch (error) {
                throw { ok: false, message: "An unexpected error has occurred", error };
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if ((0, validationID_1.validationID)(id))
                return (0, validationID_1.validationID)(id);
            const result = yield this.repository.deleteCoach(id);
            return result.affectedRows === 1 ? { ok: true, message: "Coach Eliminado" } : { ok: false, message: "No se pudo borrar el coach" };
        });
    }
}
exports.CoachController = CoachController;
//# sourceMappingURL=coach-controller.js.map