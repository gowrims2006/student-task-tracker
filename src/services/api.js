const API_URL = 'https://jsonplaceholder.typicode.com/todos';

// Part 1: GET - Tasks fetch cheyyan
export const getTasks = async () => {
    const response = await fetch(API_URL + '?_limit=10');
    if (!response.ok) throw new Error('Failed to fetch tasks');
    return response.json();
};

// Part 4: POST - Puthiya task add cheyyan  
export const createTask = async (taskData) => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(taskData),
    });
    if (!response.ok) throw new Error('Failed to create task');
    return response.json();
};