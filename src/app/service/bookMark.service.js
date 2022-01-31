import httpService from "./http.service";

const bookMarksEndpoint = "/bookMark/";

const bookMarkService = {
    getBookMarks: async (authUser) => {
        const { data } = await httpService.get(bookMarksEndpoint, {
            params: {
                orderBy: "authUser",
                equalTo: `${authUser}`
            }
        });

        return data;
    },
    add: async (payload) => {
        const { data } = await httpService.post(bookMarksEndpoint, payload);
        return data;
    },

    remove: async (id) => {
        const { data } = await httpService.delete(bookMarksEndpoint + id);
        return data;
    }
};

export default bookMarkService;
