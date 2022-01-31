const qualitiesArray = [
    {
        _id: "67rdca3eeb7f6fgeed471198",
        name: "Нудила",
        color: "primary"
    },
    {
        _id: "67rdca3eeb7f6fgeed471100",
        name: "Странный",
        color: "secondary"
    },
    {
        _id: "67rdca3eeb7f6fgeed4711012",
        name: "Троль",
        color: "success"
    },
    {
        _id: "67rdca3eeb7f6fgeed471101",
        name: "Алкоголик",
        color: "danger"
    },
    {
        _id: "67rdca3eeb7f6fgeed471102",
        name: "Красавчик",
        color: "info"
    },
    {
        _id: "67rdca3eeb7f6fgeed471102",
        name: "Неуверенный",
        color: "dark"
    }
];

const fetchAll = () =>
    new Promise((resolve) => {
        window.setTimeout(function () {
            resolve(qualitiesArray);
        }, 2000);
    });

export default {
    fetchAll
};
