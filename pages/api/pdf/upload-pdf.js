import { writeFile } from "fs/promises";

export async function handle(req, res) {
    const data = await req.formData();
    const file = data.get("file");
    console.log(req.body)

    if (!file) {
        return res.json({ success: false });
    }

    // const bytes = await file.arrayBuffer();
    // const buffer = Buffer.from(bytes);

    // const path = `/temp/${file.name}`;
    // await writeFile(path, buffer);
    // console.log(`Open ${path} to see the upload file`);

    // return res.json({ success: true });
}
