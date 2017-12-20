export const getPosts = async (api) => {
    let posts = null;
    let message = null;

    const response = await fetch(`${api}?size=10`, {
        method: 'GET'
    });

    if (response.status === 200) {
        ({ data: posts, message } = await response.json());
    } else {
        ({ message } = await response.json());
    }
    console.log(posts);

    return { posts, message };
};
