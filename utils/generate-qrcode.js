const axios = require("axios");


export async function generateQRSvg(string) {
    const options = {
        method: "GET",
        url: "https://qrcodeutils.p.rapidapi.com/qrcodepro",
        params: {
            text: string,
            validate: "true",
            size: "300",
            setlabel: 'true',
            labelalign: 'center',
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

export async function generateQRPng(string) {
    const options = {
        method: "GET",
        url: "https://qrcodeutils.p.rapidapi.com/qrcodepro",
        params: {
            text: string,
            validate: "true",
            size: "300",
            setlabel: 'true',
            labelalign: 'center',
            type: "png",
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

export async function qrcode2dURI(string) {
    QRCode.toDataURL(string, {
        scale: 5
    })
        .then((url) => {
            return url
        })
        .catch(err => {
            console.log(err)
        })
}
