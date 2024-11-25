const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');

async function getPoke() {
    const pokemons = await fetch("https://pokeapi.co/api/v2/pokemon");
  
}   


// Définition du schéma
const typeDefs = `
  type Student {
    id: ID!
    name: String!
    email: String!
    UE: [String]
  }
  type Course {
    id: ID!
    name: String!
    teacher: String!
  }
 
  type Query {
    students: [Student]
    student(id: ID!): Student
    courses: [Course]
    course(id: ID!): Course
  }
 
  type Mutation {
    addStudent(name: String!, email: String!): Student
    addCourse(name: String!, teacher: String): Course
    addCourseToStudent(idStudent: ID!, idCourse: ID!): Student
  }
`;
 
// Données simulées
const students = [
  { id: '1', name: 'Alice', email: 'alice@example.com', UE: [] },
  { id: '2', name: 'Bob', email: 'bob@example.com' , UE: []},
];

const courses = [
    {id: '1', name: "technoweb", teacher: "Girod"},
    {id: '2', name: "POO", teacher: "Panzoli le goat"}
]

 
// Resolvers : Fournissent la logique pour les requêtes et mutations
const resolvers = {
  Query: {
    students: () => students,
    student: (_, { id }) => students.find(student => student.id === id),
    courses: () => courses,
    course: (_, { id }) => courses.find(course => course.id === id),
  },
  Mutation: {
    addStudent: (_, { name, email }) => {
      const newStudent = {
        id: String(students.length + 1),
        name,
        email,
      };
      students.push(newStudent);
      return newStudent;
    },
    addCourse: (_, {name, teacher}) => {
        const newCourse = {
            id: String(courses.length + 1),
            name,
            teacher,
        };
        courses.push(newCourse);
        return newCourse;
    },
    addCourseToStudent: (_, { idStudent, idCourse }) => {
        const student = students.find(student => student.id === idStudent);
        
        if (student) {
          student.UE.push(idCourse);
          return student;
        }
        return null;
      }
  },
};
pokemon/ditto
// Création du serveur Apollo
const server = new ApolloServer({ typeDefs, resolvers });

startStandaloneServer(server, {
    listen: { port: 4000 },
  }).then(({ url }) => {
    console.log(`🚀 Serveur prêt à l'adresse : ${url}`);
  });
 