const sdk = require("node-appwrite");

const client = new sdk.Client();

client
    .setEndpoint("https://cloud.appwrite.io/v1")
    .setProject("6551010250b9d3e8228d")
    .setKey("724e1503a59d180dfecfb9b558a11372e24d053c1fd63e322a45e08586c93210011fed88695e1fe950ffd421ec7c2121ea0c1a308dab0a503ae279532754ff7a2b61cbe77b909e15ef49579027352cc7547251dc006e9eb01b172b13c8b0aaccb20b9ed36415ae5feabe15b830bdd288e5a140569f0144d3ed78f1d683d15e08");

const databases = new sdk.Databases(client);

var todoDatabase;
var todoCollection;

async function prepareDatabase() {
    todoDatabase = await databases.create(
        sdk.ID.unique(),
        'TodosDB'
    );

    todoCollection = await databases.createCollection(
        todoDatabase.$id,
        sdk.ID.unique(),
        'Todos'
    );

    await databases.createStringAttribute(
        todoDatabase.$id,
        todoCollection.$id,
        'title',
        255,
        true
    );

    await databases.createStringAttribute(
        todoDatabase.$id,
        todoCollection.$id,
        'description',
        255, false,
        'This is a test description'
    );

    await databases.createBooleanAttribute(
        todoDatabase.$id,
        todoCollection.$id,
        'isComplete',
        true
    );
}

async function seedDatabase() {
    var testTodo1 = {
        title: 'Buy apples and sell it to ID 31',
        description: 'At least 2KGs',
        isComplete: true
    };

    var testTodo2 = {
        title: 'Wash the apples Id 31',
        isComplete: true
    };

    var testTodo3 = {
        title: 'Cut the apples please ID 31',
        description: 'Don\'t forget to pack them in a box',
        isComplete: false
    };

    await databases.createDocument(
        todoDatabase.$id,
        todoCollection.$id,
        sdk.ID.unique(),
        testTodo1
    );

    await databases.createDocument(
        todoDatabase.$id,
        todoCollection.$id,
        sdk.ID.unique(),
        testTodo2
    );

    await databases.createDocument(
        todoDatabase.$id,
        todoCollection.$id,
        sdk.ID.unique(),
        testTodo3
    );
}

async function getTodos() {
    var todos = await databases.listDocuments(
        todoDatabase.$id,
        todoCollection.$id
    );

    todos.documents.forEach(todo => {
        console.log(`Title: ${todo.title}\nDescription: ${todo.description}\nIs Todo Complete: ${todo.isComplete}\n\n`);
    });
}

async function runAllTasks() {
    await prepareDatabase();
    await seedDatabase();
    await getTodos();
}

runAllTasks();
