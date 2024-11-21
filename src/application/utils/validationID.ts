



export const validationID = (id: number): any => {
    if (isNaN(id) || !id || id < 0) return { ok: false, message: "The entered ID must be a numeric value and is mandatory" };

    //throw error
};




// export function validationID(id: number): any {

//     if (!id || Number.isNaN(id) || id <= 0) return { ok: false, message: "The entered ID must be a numeric value and is mandatory" };

// }