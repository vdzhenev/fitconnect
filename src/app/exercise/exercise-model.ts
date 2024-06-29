import { IdType } from "../shared/shared-types";

export class ExerciseCreateDto {
    constructor(
        public title: string,
        public content: string,
        public authorId: IdType,
        public publishDate: number,
        public imageUrl: string,
        public tags: string[],
        public id?: IdType
    ) {}
}

export class Exercise extends ExerciseCreateDto{
    static className = 'Exercise';
    override id: IdType = 0;
}