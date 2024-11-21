
import { Person } from "../abstract-classes/Person";
import { FitnessLevel } from "../enum/apprentice-enum/fitness-level";
import { Gender } from "../enum/apprentice-enum/gender";
import { TrainingGoals } from "../enum/apprentice-enum/training-goal";
export class Apprentice extends Person {

    constructor(public personalInfo: {
        id?: number,
        name: string,
        email: string,
        userName: string,
        password: string,
    }, public apprenticeInfo: {
        dateBirth: Date,
        gender: Gender,
        trainingGoal: TrainingGoals;
        coachID: number
        fitnessLevel: FitnessLevel
    }, public customTrainingGoalInfo?: {
        idApprenticeCustomTrainingGoal?: number,
        customGoalDescription?: string | undefined
    }
    ) {
        super(personalInfo);
    }
}