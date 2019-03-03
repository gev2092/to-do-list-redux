import {map} from 'lodash';

import {uuid} from '../../utility';
import {statuses} from '../../enums/statuses';

import {types} from './actions';

const initialState = {
    tasks: [
        {
            id: uuid(),
            title: 'User CRUD',
            description: 'Create functionality that I could create, remove, update users.',
            status: statuses.WAITING
        },
        {
            id: uuid(),
            title: 'Remove blog page',
            description: "And that's it",
            status: statuses.WAITING
        },
        {
            id: uuid(),
            title: 'User details',
            description: 'Create user details functionality.',
            status: statuses.IN_PROGRESS
        },
        {
            id: uuid(),
            title: 'User roles',
            description: 'High prority task.',
            status: statuses.DONE
        }
    ]
};

/**
 * @param state
 * @param payload
 * @returns {{tasks: {}}}
 */
function addToDo(state, payload) {
    const {tasks} = state,
        newTask = payload.todo;
    newTask.id = uuid();
    newTask.status = statuses.WAITING;
    tasks.push(payload.todo);
    return {
        ...state,
        tasks: {
            ...tasks
        }
    }
}

/**
 * @param state
 * @param payload
 * @returns {{tasks: Array}}
 */
function changeStatus(state, payload) {
    const tasks = map(state.tasks, task => {
        if (task.id === payload.item.id) {
            task.status = payload.item.toStatus;
        }
        return task;
    });
    return {
        ...state,
        tasks: tasks
    }
}

/**
 * @param state
 * @param action
 * @returns {*}
 */
export default (state = initialState, action = {}) => {
    switch (action.type) {
        case types.ADD_TO_DO:
            return addToDo(state, action.payload);
        case types.CHANGE_STATUS:
            return changeStatus(state, action.payload);
        default:
            return state;
    }
}