import axios from "axios";

export default function handler(req, res) {
  const { encryptionValues } = req.query;
  console.log(encryptionValues);
  if (req.method === "GET") {
    const options = {
      method: "GET",
      url: "https://qrcodeutils.p.rapidapi.com/qrcodefree",
      params: {
        text: encryptionValues,
        validate: "true",
        size: "200",
        type: "svg", // type: svg, png etc
        level: "H", // level of validation
      },
      headers: {
        "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPIDAPI_KEY,
        "X-RapidAPI-Host": "qrcodeutils.p.rapidapi.com",
      },
    };

    axios
      .request(options)
      .then((response) => {
        // console.log(response.data)
        res.status(200).json(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    res.status(400);
  }
}
