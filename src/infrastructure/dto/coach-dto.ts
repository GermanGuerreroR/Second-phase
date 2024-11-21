import { IsEmail, IsString, IsNumber, MinLength, IsStrongPassword, Min, IsDate, validate } from 'class-validator';
import { Type } from 'class-transformer';
import 'reflect-metadata';

export class CoachDto {

    @IsString()
    @MinLength(10)
    name: string;

    @IsEmail()
    email: string;

    @IsString()
    @MinLength(5)
    userName: string;

    @IsStrongPassword()
    @MinLength(8)
    password: string;

    @IsNumber()
    @Min(1)
    experience: number;

    @IsString()
    certificationName: string;

    @IsDate()
    @Type(() => Date)
    certificationDate: Date;

    @IsString()
    certifyingEntity: string;




    @IsString()
    specialityName: string;

    constructor(
        personalInfo: { name: string, email: string, userName: string, password: string },
        coachInfo: { experience: number },
        certificationInfo: { certificationName: string, certificationDate: string | Date, certifyingEntity: string },
        specialityInfo: { specialityName: string }) {
        this.name = personalInfo.name;
        this.email = personalInfo.email;
        this.userName = personalInfo.userName;
        this.password = personalInfo.password;
        this.experience = coachInfo.experience;
        this.certificationName = certificationInfo.certificationName;
        this.certificationDate = certificationInfo.certificationDate instanceof Date
            ? certificationInfo.certificationDate
            : new Date(certificationInfo.certificationDate);
        this.certifyingEntity = certificationInfo.certifyingEntity;
        this.specialityName = specialityInfo.specialityName;
    }

    async validateDto() {
        return await validate(this, {
            validationError: { target: false, value: false }
        });
    }
}
