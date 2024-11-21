import { IsDate, IsEmail, IsEnum, IsInt, IsNotEmpty, IsString, IsStrongPassword, MinLength, validate, ValidateIf } from "class-validator";
import { FitnessLevel } from "../../domain/enum/apprentice-enum/fitness-level";
import { Gender } from "../../domain/enum/apprentice-enum/gender";
import { TrainingGoals } from "../../domain/enum/apprentice-enum/training-goal";

export class ApprenticeDto {
    @IsString()
    @MinLength(10)
    name: string;

    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(5)
    userName: string;

    @IsStrongPassword()
    password: string;

    @IsDate()
    dateBirth: Date;

    @IsEnum(Gender)
    gender: Gender;

    @IsEnum(TrainingGoals)
    trainingGoal: TrainingGoals;

    @ValidateIf(x => x.trainingGoal === TrainingGoals.Other)
    @IsString()
    @IsNotEmpty()
    customGoalDescription?: string;

    @IsInt()
    coachID: number;

    @IsEnum(FitnessLevel)
    fitnessLevel: FitnessLevel;

    constructor(
        personalInfo: { name: string; email: string; userName: string; password: string },
        apprenticeInfo: { dateBirth: Date; gender: Gender; trainingGoal: TrainingGoals; coachID: number; fitnessLevel: FitnessLevel },
        customTrainingGoalInfo?: { customGoalDescription?: string }
    ) {
        this.name = personalInfo.name;
        this.email = personalInfo.email;
        this.userName = personalInfo.userName;
        this.password = personalInfo.password;
        this.dateBirth = apprenticeInfo.dateBirth instanceof Date
            ? apprenticeInfo.dateBirth
            : new Date(apprenticeInfo.dateBirth);
        this.gender = apprenticeInfo.gender;
        this.trainingGoal = apprenticeInfo.trainingGoal;
        this.coachID = apprenticeInfo.coachID;
        this.fitnessLevel = apprenticeInfo.fitnessLevel;

        // Asigna si está presente
        this.customGoalDescription = customTrainingGoalInfo?.customGoalDescription;
    }

    async validateDto() {
        return await validate(this, {
            validationError: { target: false, value: false },
        });
    }
}