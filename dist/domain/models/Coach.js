"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Coach = void 0;
const Person_1 = require("../abstract-classes/Person");
class Coach extends Person_1.Person {
    constructor(personalInfo, coachInfo, certificationInfo, specialityInfo) {
        super(personalInfo);
        this.personalInfo = personalInfo;
        this.coachInfo = coachInfo;
        this.certificationInfo = certificationInfo;
        this.specialityInfo = specialityInfo;
    }
}
exports.Coach = Coach;
