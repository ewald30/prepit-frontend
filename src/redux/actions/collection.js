const COLLECTION = `COLLECTION`;
export const COLLECTION_SET_SELECTED = `${COLLECTION} Set selected`;

export const setSelectedCollection = (payload) => {
    return {
        type: COLLECTION_SET_SELECTED,
        payload: payload
    }
}