// third party
import { Action } from 'redux'

// application
import { useAppAction } from "@/store/hooks";

const APPLY_CLIENT_STATE = 'APPLY_CLIENT_STATE'

function isApplyClientStateAction(action) {
    return action.type === APPLY_CLIENT_STATE
}

export function applyClientState(state) {
    return {
        type: APPLY_CLIENT_STATE,
        state
    }
}

export const useApplyClientState = () => useAppAction(applyClientState)

export function withClientState(
    reducer,
    namespace
) {
    return (state, action) => {
        const childState = reducer(state, action)

        if (isApplyClientStateAction(action)) {
            return {
                ...(action.state[namespace] || childState),
                stateFrom: 'client'
            }
        }

        if ('stateFrom' in childState) {
            return childState
        }

        return {
            ...childState,
            stateFrom: 'server'
        }
    }
}