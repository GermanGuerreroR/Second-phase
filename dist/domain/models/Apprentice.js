"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Apprentice = void 0;
const Person_1 = require("../abstract-classes/Person");
class Apprentice extends Person_1.Person {
    constructor(personalInfo, apprenticeInfo, customTrainingGoalInfo) {
        super(personalInfo);
        this.personalInfo = personalInfo;
        this.apprenticeInfo = apprenticeInfo;
        this.customTrainingGoalInfo = customTrainingGoalInfo;
    }
}
exports.Apprentice = Apprentice;
//# sourceMappingURL=Apprentice.js.map