import { Apprentice } from "../../domain/models/Apprentice";
import { ApprenticeDto } from "../../infrastructure/dto/apprentice-dto";
import { ApprenticeRepository } from "../../infrastructure/repositories/apprentice-repository";
import { Gender } from "../../domain/enum/apprentice-enum/gender";
import { FitnessLevel } from "../../domain/enum/apprentice-enum/fitness-level";
import { TrainingGoals } from "../../domain/enum/apprentice-enum/training-goal";
import { validationID } from "../utils/validationID";

export class ApprenticeController {
    constructor(private repository = new ApprenticeRepository()) {
    }

    async add(

        body: { name: string, email: string, userName: string, password: string },
        payload: { dateBirth: Date, gender: Gender, trainingGoal: TrainingGoals, coachID: number, fitnessLevel: FitnessLevel },
        bodyTwo?: {
            customGoalDescription: string | undefined

        }) {
        try {
            console.log(body);
            console.log(payload);
            console.log(bodyTwo);
            const dto = new ApprenticeDto(body, payload, bodyTwo);


            const errors = await dto.validateDto();
            if (errors.length > 0) {
                return { ok: false, message: "The Request has error", error: errors }
            }
            const apprentice = new Apprentice(

              
                { name: body.name, email: body.email, userName: body.userName, password: body.password },
                { dateBirth: payload.dateBirth, gender: payload.gender, trainingGoal: payload.trainingGoal, coachID: payload.coachID, fitnessLevel: payload.fitnessLevel },
                { customGoalDescription: bodyTwo?.customGoalDescription });



            const result = await this.repository.addApprentice(apprentice);
            if (result[0].affectedRows === 1) {
                return { ok: true, msg: "Apprentice added successfully", id: `The new apprentice's ID ${result[0].insertId}` };
            } else {
                return { ok: false, message: "The apprentice not added " }
            }
        } catch (error: any) {
            throw { ok: false, message: "An unexpected error has occurred", error };
        };
    }

    async getAll() {
        try {
            const result = await this.repository.getApprentices();
            if (result.length === 0) {
                return { ok: true, message: "There are no registered apprentices." }
            } else {
                return { ok: true, Apprentices: result };
            }
        } catch (error) {
            throw { ok: false, message: "An unexpected error has occurred", error }
        }
    }

    async getId(idApprentice: number) {



        try {
            // if (!idApprentice || Number.isNaN(idApprentice)) {
            //     return { ok: false, message: "The entered ID must be a numeric value and is mandatory" };
            // }

            if (validationID(idApprentice)) return validationID(idApprentice);

            const result = await this.repository.getApprentice(idApprentice);

            if (result.length === 1) {
                return { ok: true, message: result[0] }
            } else {
                return { ok: false, message: "Apprentice not found." };
            }
        } catch (error) {
            throw { ok: false, message: "An unexpected error has occurred", error }
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


    async delete(idApprentice: number) {



        try {
            // if (!idApprentice || Number.isNaN(idApprentice)) {
            //     return { ok: false, message: "The entered ID must be a numeric value and is mandatory" };
            // }

            if (validationID(idApprentice)) return validationID(idApprentice);

            const result = await this.repository.deleteApprentice(idApprentice);

            if (result.affectedRows === 1) {
                return { ok: true, message: result }
            } else {
                return { ok: false, message: "Apprentice not found." };
            }
        } catch (error) {
            throw { ok: false, message: "An unexpected error has occurred", error }
        }
    }



}




