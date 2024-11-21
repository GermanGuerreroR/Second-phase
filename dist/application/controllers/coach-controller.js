"use strict";
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
    async add(body, payload, bodyTwo, payloadTwo) {
        try {
            console.log("Body:", body);
            console.log("Payload:", payload);
            console.log("BodyTwo:", bodyTwo);
            console.log("PayloadTwo:", payloadTwo);
            const dto = new coach_dto_1.CoachDto(body, payload, bodyTwo, payloadTwo);
            const errores = await dto.validateDto();
            if (errores.length > 0) {
                return { ok: false, message: "The Request has error", error: errores };
            }
            const coach = new Coach_1.Coach({ name: body.name, email: body.email, userName: body.userName, password: body.password }, { experience: payload.experience }, { certificationName: bodyTwo.certificationName, certificationDate: bodyTwo.certificationDate, certifyingEntity: bodyTwo.certifyingEntity }, { specialityName: payloadTwo.specialityName });
            const result = await this.repository.addCoach(coach);
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
    }
    async getAll() {
        try {
            const result = await this.repository.getCoaches();
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
    }
    async getId(id) {
        try {
            if (!id || Number.isNaN(id)) {
                return { ok: false, message: "The entered ID must be a numeric value and is mandatory" };
            }
            const result = await this.repository.getCoach(id);
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
    }
    async update(body, payload, bodyTwo, payloadTwo, id) {
        try {
            const dto = new coach_dto_1.CoachDto(body, payload, bodyTwo, payloadTwo);
            const errores = await dto.validateDto();
            if (errores.length > 0) {
                return { ok: false, message: "The Request has error", error: errores };
            }
            if (!id || Number.isNaN(id)) {
                return { ok: false, message: "The entered ID must be a numeric value and is mandatory" };
            }
            const coach = new Coach_1.Coach(body, payload, bodyTwo, payloadTwo);
            const result = await this.repository.updateCoach(coach, id);
            if (result.affectedRows === 1) {
                return { ok: true, message: `The coach with ID ${id} was successfully updated  ` };
            }
        }
        catch (error) {
            throw { ok: false, message: "An unexpected error has occurred", error };
        }
    }
    async delete(id) {
        if ((0, validationID_1.validationID)(id))
            return (0, validationID_1.validationID)(id);
        const result = await this.repository.deleteCoach(id);
        return result.affectedRows === 1 ? { ok: true, message: "Coach Eliminado" } : { ok: false, message: "No se pudo borrar el coach" };
    }
}
exports.CoachController = CoachController;
