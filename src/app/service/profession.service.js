import httpService from "./http.service";

const professionsEndpoint = "profession/";

const professionService = {
    get: async () => {
        const { data } = await httpService.get(professionsEndpoint);
        return data;
    }
};

export default professionService;
