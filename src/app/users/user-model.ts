import { IdType } from "../shared/shared-types";

export enum UserType {
    admin = 0,
    anonymous,
    regular,
    instructor
}

export class UserCreateDto {
    constructor(
        public username: string,
        public firstName: string,
        public lastName: string,
        public type: UserType,
        public following: IdType[],
        public courses: IdType[],
        public exercises: IdType[],
        public pictureUrl?: string,
        public id?: IdType
    ) { }
}

export class User extends UserCreateDto {
    static className = 'User';
    override id: IdType = 0;
}