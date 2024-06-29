import * as express from 'express';
import { Request, Response } from 'express';
import * as dotenv from 'dotenv';
import { HttpError } from './model/error';
import cors from 'cors';

dotenv.config()

const users = [
    { id: 1, username: "pesho", firstName: "Petar", lastName: "Petrov", type: 2, following: [], courses: [], pictureUrl: ''},
    { id: 2, username: "gosho", firstName: "Georgi", lastName: "Georgiev", type: 3, following: [], courses: [], pictureUrl: 'https://hips.hearstapps.com/hmg-prod/images/mh-trainer-2-1533577086.png'},
    { id: 3, username: "ivancho", firstName: "Ivan", lastName: "Ivanov", type: 3, following: [], courses: [], pictureUrl: ''},
    { id: 4, username: "vesko", firstName: "Vasil", lastName: "Vasilev", type: 0, following: [], courses: [], pictureUrl: ''}
];

const exercises = [
    { 
        id: 1, 
        title: "Biceps Curl", 
        content: "Basic exercise that builds up the biceps. Use dumbells or other fitting equipment.",
        authorId: 2,
        publishDate: new Date("2019-06-06"),
        imageUrl: 'https://i0.wp.com/muscu-street-et-crossfit.fr/wp-content/uploads/2021/10/Muscles-Biceps-curl.001.jpeg?fit=1920%2C1080&ssl=1',
        tags: ["arms", "biceps"]
    },
    { 
        id: 2, 
        title: "Prone Leg Curl", 
        content: "Perfect exercise for calf muscles. Done only on machines.",
        authorId: 2,
        publishDate: new Date("2020-03-01"),
        imageUrl: 'https://www.endomondo.com/wp-content/uploads/2023/12/Leg-Curl.jpg',
        tags: ["legs", "calves"]
    },
    { 
        id: 3, 
        title: "Lat Pulldown", 
        content: "Basic exercise that focuses on the back muscles. Use the appropriate machines.",
        authorId: 3,
        publishDate: new Date("2022-02-02"),
        imageUrl: 'https://static.strengthlevel.com/images/exercises/lat-pulldown/lat-pulldown-800.jpg',
        tags: ["back", "trapezius", "latissimus dorsi"]
    },
]

const courses = [
    { 
        id: 1,
        title: 'Full Body Workout for Beginners',
        content: 'Three times a week. Perfect for newcommers.',
        authorId: 2,
        publishDate: new Date('2024-05-25'),
        imageUrl: 'https://i.ytimg.com/vi/LrDbuE33p8c/sddefault.jpg',
        tags: ['beginner', 'full-body'],
        exerciseIds: [0,1,2],
    },
    { 
        id: 2,
        title: 'Full week workout schedule',
        content: 'Work hard. Gain hard.',
        authorId: 3,
        publishDate: new Date('2023-09-10'),
        imageUrl: 'https://i.ytimg.com/vi/PY6DrbX4W4o/maxresdefault.jpg',
        tags: ['intermediate', 'full-body'],
        exerciseIds: [0,1,2],
    }
];

const app = express.default();
app.use(cors());

app.get("/", (req: Request, res: Response) => { 
    res.set('Content-Type', 'text/html')
    res.send("<h1>Hello World!!!</h1>") 
})

app.get("/api/users", (req: Request, res: Response) => {
    res.json(users)
})

app.get("/api/users/:userId", (req: Request, res: Response, next: express.NextFunction) => {
    const user = users.find(u => u.id === +req.params.userId);
    if (user) {
        res.json(user)
    } else {
        next(new HttpError(404, `User with ID='${req.params.userId}' not found`));
    }
});

app.get("/api/exercises", (req: Request, res: Response) => {
    res.json(exercises)
})

app.get("/api/exercises/:exId", (req: Request, res: Response, next: express.NextFunction) => {
    const exercise = exercises.find(ex => ex.id === +req.params.exId);
    if (exercise) {
        res.json(exercise)
    } else {
        next(new HttpError(404, `Exercise with ID='${req.params.exId}' not found`));
    }
});

app.get("/api/courses", (req: Request, res: Response) => {
    res.json(courses)
})

app.get("/api/courses/:courseId", (req: Request, res: Response, next: express.NextFunction) => {
    const course = courses.find(c => c.id === +req.params.courseId);
    if (course) {
        res.json(course)
    } else {
        next(new HttpError(404, `Exercise with ID='${req.params.courseId}' not found`));
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => { 
    console.log(`Server is running in http://localhost:${PORT}`) 
});