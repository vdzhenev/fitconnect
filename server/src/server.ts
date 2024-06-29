import * as express from 'express';
import { Request, Response } from 'express';
import * as dotenv from 'dotenv';
import { HttpError } from './model/error';
import cors from 'cors';

dotenv.config()

const USERS = [
    { id: 1, username: "pesho", firstName: "Petar", lastName: "Petrov", type: 2, following: [2], courses: [1], exercises: [1,2,3], pictureUrl: ''},
    { id: 2, username: "gosho", firstName: "Georgi", lastName: "Georgiev", type: 3, following: [], courses: [1], exercises: [1, 2, 5, 6, 7], pictureUrl: 'https://hips.hearstapps.com/hmg-prod/images/mh-trainer-2-1533577086.png'},
    { id: 3, username: "ivancho", firstName: "Ivan", lastName: "Ivanov", type: 3, following: [], courses: [2], exercises: [3, 4], pictureUrl: ''},
    { id: 4, username: "vesko", firstName: "Vasil", lastName: "Vasilev", type: 0, following: [], courses: [], exercises: [], pictureUrl: ''}
];

const EXERCISES = [
    { 
        id: 1, 
        title: "Cable Dual Overhead Curl", 
        content: 
            "The cable overhead curl exercise helps isolate and define the biceps.\n" +
            "Steps :\n"+
            "1.) Start off by attaching a stirrup handle to each side of two high pulley cable machines and grab the handles with an under-hand grip (palms up), standing in between the machines with your feet shoulder width apart as this will be your starting position.\n"+
            "2.) Once in position extend your arms out to your sides, keeping your elbows steady and then slowly curl your biceps towards the side of your head, isolating and squeezing the biceps.\n"+
            "3.) Hold this position for a count while squeezing your biceps and then return back to the starting position.",
        authorId: 2,
        publishDate: new Date("2019-06-06"),
        imageUrl: 'https://www.jefit.com/images/exercises/960_590/385.jpg',
        tags: ["machine", "biceps", "strength"]
    },
    { 
        id: 2, 
        title: "Barbell Biceps Curl (Prone)", 
        content: 
            "The barbell lying high bench biceps curl exercise has you lie face down to isolate your biceps and build bigger arms.\n" + 
            "Steps :\n" +
            "1.) Start by lying face down on a high bench with your head at one end and your toes pressed against the floor to support you.\n" +
            "2.) Grab a barbell with an underhand grip (palms facing up) about 12 inches apart.\n" +
            "3.) Extending your arms to the floor, curl your arms back towards your head in a slight arc, so your biceps touch your forearm.\n"+
            "4.) Slowly return to the starting position.\n"+
            "5.) Repeat for as many reps and sets as desired.Perfect exercise for biceps.",
        authorId: 2,
        publishDate: new Date("2020-03-01"),
        imageUrl: 'https://www.jefit.com/images/exercises/960_590/1037.jpg',
        tags: ["biceps", "forearms", "barbell"]
    },
    { 
        id: 3, 
        title: "Back Extensions", 
        content: "Basic exercise that focuses on the back muscles.",
        authorId: 3,
        publishDate: new Date("2022-02-02"),
        imageUrl: 'https://www.jefit.com/images/exercises/960_590/1349.jpg',
        tags: ["back", "body only"]
    },
    { 
        id: 4, 
        title: "Barbell Bench Press", 
        content: 
            "The barbell chest press, also known as the barbell bench press, is a fundamental exercise for building upper body strength, specifically targeting the pectoral muscles, triceps, and shoulders. Here’s a step-by-step guide on how to perform it correctly:\n"+
            "Setup:\n"+
            "Load the barbell with an appropriate amount of weight for your fitness level. Use safety clips to secure the weights. Lie down on the flat bench with your feet flat on the ground and your head, shoulders, and buttocks firmly pressed against the bench.\n"+
            "Hand Placement:\n"+
            "Grip the barbell with both hands slightly wider than shoulder-width apart. Your palms should face forward, and your thumbs should be wrapped around the bar.\n"+
            "Starting Position:\n"+
            "Unrack the barbell by straightening your arms and moving the barbell over your chest. Your arms should be perpendicular to the floor.\n"+
            "Lowering the Barbell:\n"+
            "Inhale deeply and lower the barbell slowly and under control to your mid-chest. Your elbows should bend at about a 45-degree angle to your body. Lower the bar until it lightly touches your chest or is just above it. Do not bounce the bar off your chest.\n"+
            "Pressing the Barbell:\n"+
            "Exhale and press the barbell back up to the starting position by fully extending your arms. Focus on squeezing your chest muscles as you lift the weight. Keep your wrists straight and your elbows slightly tucked in to protect your shoulder joints.",
        authorId: 3,
        publishDate: new Date("2023-02-02"),
        imageUrl: 'https://www.jefit.com/images/exercises/960_590/16.jpg',
        tags: ["chest", "triceps", "shoulder", "barbell"]
    },
    { 
        id: 5, 
        title: "All Fours Quad Stretch", 
        content: 
            "Steps :\n"+
            "1.) To begin this exercise; start off in a kneeling pushing position and lift your right leg off of the floor and hold onto it with your right hand.\n"+
            "2.) With your hand hold onto your ankle and stretch out your upper legs holding on for 15 to 30 seconds, then alternate.\n"+
            "3.) Repeat this exercise for as many repetitions as needed",
        authorId: 2,
        publishDate: new Date("2024-04-04"),
        imageUrl: 'https://www.jefit.com/images/exercises/960_590/1857.jpg',
        tags: ["upper legs", "body only"]
    },
    { 
        id: 6, 
        title: "Band Bench Press", 
        content: 
            "Steps :\n"+
            "1.) To begin this exercise; start off with placing a band under the leg of the bench where your head will be resting.\n"+
            "2.) Following this placement, lie down flat on a flat bench and push your arms forward so that you have the handles in front of you at your shoulder width.\n"+
            "3.) Then bring the handles down as if you are doing a normal barbell bench press.\n"+
            "4.) Right before you are about to touch your chest, squeeze your pectorals and hold the position for a few seconds and return back to the starting position.\n"+
            "5.) Repeat this exercise for as many repetitions as needed.",
        authorId: 2,
        publishDate: new Date("2024-05-01"),
        imageUrl: 'https://www.jefit.com/images/exercises/960_590/1481.jpg',
        tags: ["chest", "triceps", "shoulder", "bands", "bench"]
    },
    { 
        id: 7, 
        title: "Barbell Ab Rollout (Kneeling)", 
        content: 
            "The ab rollout on knees exercise works the abs, lower back and arm muscles and is the proper version of an ab roller workout.\n"+
            "Steps :\n"+
            "1.) Start off placing a barbell on the floor in front of you and kneeling in front of the bar, gripping it with a shoulder-width overhand grip.\n"+
            "2.) With a slow controlled motion, roll the bar out so that your back is straight, bend your knees and keep your feet off the floor.\n"+
            "3.) Keep your arms straight throughout the exercise.\n"+
            "4.) Roll back up bring the bar under your shoulders and return to the starting position.\n"+
            "5.) Repeat for as many reps and sets as desired.",
        authorId: 2,
        publishDate: new Date("2024-05-01"),
        imageUrl: 'https://www.jefit.com/images/exercises/960_590/1177.jpg',
        tags: ["abs", "back", "strength", "barbell"]
    },
]

const COURSES = [
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
    res.json(USERS)
})

app.get("/api/users/:userId", (req: Request, res: Response, next: express.NextFunction) => {
    const user = USERS.find(u => u.id === +req.params.userId);
    if (user) {
        res.json(user)
    } else {
        next(new HttpError(404, `User with ID='${req.params.userId}' not found`));
    }
});

app.get("/api/exercises", (req: Request, res: Response) => {
    res.json(EXERCISES)
})

app.get("/api/exercises/:exId", (req: Request, res: Response, next: express.NextFunction) => {
    const exercise = EXERCISES.find(ex => ex.id === +req.params.exId);
    if (exercise) {
        res.json(exercise)
    } else {
        next(new HttpError(404, `Exercise with ID='${req.params.exId}' not found`));
    }
});

app.get("/api/exercises/tags/:tag", (req: Request, res: Response, next: express.NextFunction) => {
    const exercises = EXERCISES.filter(ex => ex.tags.includes(req.params.tag));
    if (exercises) {
        res.json(exercises)
    } else {
        next(new HttpError(404, `Exercises with tag='${req.params.tag}' not found`));
    }
});

app.get("/api/courses", (req: Request, res: Response) => {
    res.json(COURSES)
})

app.get("/api/courses/:courseId", (req: Request, res: Response, next: express.NextFunction) => {
    const course = COURSES.find(c => c.id === +req.params.courseId);
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