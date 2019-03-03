export const types = {
    CHANGE_STATUS: 'todo.CHANGE_STATUS',
    ADD_TO_DO: 'todo.ADD_TO_DO'
};

/**
 * @param item
 * @returns {{type: string, payload: {item: *}}}
 */
export const changeStatus = (item) => {
    return {
        type: types.CHANGE_STATUS,
        payload: {
            item
        }
    }
};

/**
 * @param todo
 * @returns {{type: string, payload: {todo: *}}}
 */
export const addToDo = (todo) => {
    return {
        type: types.ADD_TO_DO,
        payload: {
            todo
        }
    }
};