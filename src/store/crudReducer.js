const initialState = {
    todos: [],
};

const taskReducer = (state = initialState, action) => {
    switch (action.type) {
        case "GETAllTodos":
            return {
                ...state,
                todos: action.payload,
            };
        case "AddTodo":
            return {
                ...state,
                todos: [...state.todos, action.payload],
            };

        default:
            return state;
    }
};
export default taskReducer;
