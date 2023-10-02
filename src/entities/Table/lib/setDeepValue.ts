export const setDeepValue = (state: any, value: any, path: string) => {
    const nextState = {...state}
    nextState[path] = value
    return nextState;
}