import { Person } from "../abstract-classes/Person";


export class Coach extends Person {

  constructor(public personalInfo: {
    id?: number,
    name: string,
    email: string,
    userName: string,
    password: string,
  }, public coachInfo: {
    experience: number,
  }, public certificationInfo: {
    idCertification?: number;
    certificationName: string,
    certificationDate: Date,
    certifyingEntity: string,
    idCoach?: number;
  },
    public specialityInfo: {
      idCoachSpeciality?: number,
      specialityName: string
    }
  ) {
    super(personalInfo);
  }
}