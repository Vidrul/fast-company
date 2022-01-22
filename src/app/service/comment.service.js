import httpService from "./http.service";

const commnentEndpoint = "comment/";

const commentService = {
    createComment: async (payload) => {
        const { data } = await httpService.put(
            commnentEndpoint + payload._id,
            payload
        );
        return data;
    },

    getComments: async (pageId) => {
        const { data } = await httpService.get(commnentEndpoint, {
            params: {
                orderBy: '"pageId"',
                equalTo: `"${pageId}"`
            }
        });
        console.log(data);
        return data;
    },

    deleteComment: async (commentId) => {
        const { data } = await httpService.delete(commnentEndpoint + commentId);
        return data;
    }
};

export default commentService;
