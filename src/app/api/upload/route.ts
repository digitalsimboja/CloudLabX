import { NextResponse } from "next/server";
import { Readable } from "stream";
import csv from "csv-parser";

export async function POST(req: Request) {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const results: any[] = [];

    if (!file) {
        return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const rows: any[] = [];

    await new Promise((resolve, reject) => {
        Readable.from(buffer)
          .pipe(csv())
          .on("data", (data: any) => rows.push(data))
          .on("end", resolve)
          .on("error", reject);
      });

    const previewRows = rows.slice(0, 10);
    const columns = Object.keys(previewRows[0] || {});

    return NextResponse.json({ previewRows, columns });
}
