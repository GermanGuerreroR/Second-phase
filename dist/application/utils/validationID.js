"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationID = void 0;
const validationID = (id) => {
    if (isNaN(id) || !id || id < 0)
        return { ok: false, message: "The entered ID must be a numeric value and is mandatory" };
    //throw error
};
exports.validationID = validationID;
// export function validationID(id: number): any {
//     if (!id || Number.isNaN(id) || id <= 0) return { ok: false, message: "The entered ID must be a numeric value and is mandatory" };
// }
