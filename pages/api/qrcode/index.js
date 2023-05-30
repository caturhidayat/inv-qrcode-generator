import QRCode from "qrcode";

export default function handler(req, res) {
    const { encryptionValues } = req.query;
    // console.log(encryptionValues);

    if (req.method === "GET") {
        QRCode.toDataURL(encryptionValues, {
            // scale: 2,
            width: 250
        })
            .then((response) => {
                // console.log(response)
                res.status(200).json(response);
            })
            .catch((error) => {
                console.log(error);
            });
    } else {
        res.status(400);
    }

    // .then((url) => {
    //     return url;
    // })
    // .catch((err) => {
    //     console.log(err);
    // });
}
