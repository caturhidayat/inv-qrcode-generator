
const axios = require("axios");


export async function generateQRCode(string) {
    const options = {
        method: "GET",
        url: "https://qrcodeutils.p.rapidapi.com/qrcodefree",
        params: {
            text: string,
            validate: "true",
            size: "300",
            type: "svg",
            level: "H",
        },
        headers: {
            "X-RapidAPI-Key":
                "34f0555bc0msh138ee8b774dd8f6p18e231jsnbd3386a8832c",
            "X-RapidAPI-Host": "qrcodeutils.p.rapidapi.com",
        },
    };
    try {
        axios
            .request(options)
            .then((response) => {
                // res.status(200).json(response.data);
                // console.log(response.data)
                return response.data
            })
            .catch((error) => {
                console.log(error);
            });
    } catch (error) {
        console.error(error);
    }
}
