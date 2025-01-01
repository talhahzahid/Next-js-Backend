export let todos = [
    { id: 1, title: " Next.js" },
    { id: 2, title: "Hello project" },
];


export const updateTodos = (newTodos) => {
    todos = newTodos;
};