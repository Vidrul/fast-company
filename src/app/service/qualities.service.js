import httpService from "./http.service";

const qualitiesEndpoint = "quality/";

const qualityService = {
    get: async () => {
        const { data } = await httpService.get(qualitiesEndpoint);
        return data;
    }
};

export default qualityService;
