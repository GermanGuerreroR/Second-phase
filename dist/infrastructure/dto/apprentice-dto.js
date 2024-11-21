"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
exports.ApprenticeDto = void 0;
const class_validator_1 = require("class-validator");
const fitness_level_1 = require("../../domain/enum/apprentice-enum/fitness-level");
const gender_1 = require("../../domain/enum/apprentice-enum/gender");
const training_goal_1 = require("../../domain/enum/apprentice-enum/training-goal");
class ApprenticeDto {
    constructor(personalInfo, apprenticeInfo, customTrainingGoalInfo) {
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
        this.customGoalDescription = customTrainingGoalInfo === null || customTrainingGoalInfo === void 0 ? void 0 : customTrainingGoalInfo.customGoalDescription;
    }
    validateDto() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, class_validator_1.validate)(this, {
                validationError: { target: false, value: false },
            });
        });
    }
}
exports.ApprenticeDto = ApprenticeDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(10),
    __metadata("design:type", String)
], ApprenticeDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], ApprenticeDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(5),
    __metadata("design:type", String)
], ApprenticeDto.prototype, "userName", void 0);
__decorate([
    (0, class_validator_1.IsStrongPassword)(),
    __metadata("design:type", String)
], ApprenticeDto.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], ApprenticeDto.prototype, "dateBirth", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(gender_1.Gender),
    __metadata("design:type", String)
], ApprenticeDto.prototype, "gender", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(training_goal_1.TrainingGoals),
    __metadata("design:type", String)
], ApprenticeDto.prototype, "trainingGoal", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)(x => x.trainingGoal === training_goal_1.TrainingGoals.Other),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ApprenticeDto.prototype, "customGoalDescription", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], ApprenticeDto.prototype, "coachID", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(fitness_level_1.FitnessLevel),
    __metadata("design:type", String)
], ApprenticeDto.prototype, "fitnessLevel", void 0);
//# sourceMappingURL=apprentice-dto.js.map