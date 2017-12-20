export const getFullApiUrl = (api, GROUP_ID) => {
    if (typeof api !== 'string' || typeof GROUP_ID !== 'string') {
        throw new Error(
            `'api' and 'GROUP_ID' arguments passed should be a string!`
        );
    }

    return `${api}/${GROUP_ID}`;
};
