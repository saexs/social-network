const ADD_NEW_TEXT_MESSAGE = 'ADD-NEW-TEXT-MESSAGE'

type addNewMessageType = {
    type: typeof ADD_NEW_TEXT_MESSAGE
    message: string
}
export const addNewMessage = (message: string): addNewMessageType => {
    return (
        { type: ADD_NEW_TEXT_MESSAGE, message }
    )
}

type messageReducerActionsType = addNewMessageType

type dialogType = {
    id: number
    name: string
}
type messagesType = {
    id: number
    message: string
}

let messagesPage = {
    dialogs: [
        { id: 1, name: 'Dimych' },
        { id: 2, name: 'Andrey' },
        { id: 3, name: 'Sasha' },
        { id: 4, name: 'Dima' },
        { id: 5, name: 'Valera' },
        { id: 6, name: 'Danil' }
    ] as Array<dialogType>,
    messages: [
        { id: 1, message: 'Hi Alexander' },
        { id: 2, message: 'How are u?' },
        { id: 3, message: 'What are u doing?' },
        { id: 4, message: 'Lets code on React' },
        { id: 4, message: 'Im free' }
    ] as Array<messagesType>,
}
export type messagePageType = typeof messagesPage

const messageReducer = (state = messagesPage, action: messageReducerActionsType): messagePageType => {
    if (action.type === ADD_NEW_TEXT_MESSAGE) {
        let message = action.message
        return {
            ...state,
            messages: [...state.messages, { id: 5, message: message }],
        }
    }
    return state
};

export default messageReducer