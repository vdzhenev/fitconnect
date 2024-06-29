import { IdType } from "../shared/shared-types";

enum CourseStatus {
    published = 0,
    entered,
    finished
}

export class CourseCreateDto {
    constructor(
        public title: string,
        public content: string,
        public authorId: IdType,
        public publishDate: number,
        public imageUrl: string,
        public tags: string[],
        public exerciseIds: IdType[],
        public id?: IdType
    ) {}
}

export class Course extends CourseCreateDto{
    static className = 'Course';
    override id: IdType = 0;
}