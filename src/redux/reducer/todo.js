import {DISPLAY, ADD_ITEM} from '../action-name'

const initialState = 
{
    listTodo: [],
    title: 'Todo',
    displayInput: false,
    displayBtn: true,
    
}


const reducer = (state = initialState, action) => {
    const newState = {...state}
    switch (action.type) {
        case DISPLAY:
            newState.displayInput = true
            newState.displayBtn = false
            return newState
        case ADD_ITEM:
            newState.displayInput = false
            newState.displayBtn = true
            return newState

        default:
            return {...state, ...action.payload}
    }

}


export default reducer