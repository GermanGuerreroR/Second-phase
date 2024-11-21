export abstract class Person {
    constructor(public personalInfo: {
        id?: number,
        name: string,
        email: string,
        userName: string,
        password: string
    }) { };
}