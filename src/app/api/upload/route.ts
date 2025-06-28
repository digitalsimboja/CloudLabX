import { NextResponse } from "next/server";
import { Readable } from "stream";
import csvParser from "csv-parser";
import * as XLSX from "xlsx";

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("file") as File | null;

  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  const fileName = file.name.toLowerCase();
  const buffer = Buffer.from(await file.arrayBuffer());
  let rows: any[] = [];

  try {
    if (fileName.endsWith(".csv")) {
      // CSV Parsing
      const allRows = await new Promise<any[]>((resolve, reject) => {
        const results: any[] = [];
        Readable.from(buffer)
          .pipe(csvParser())
          .on("data", (data: any) => results.push(data))
          .on("end", () => resolve(results))
          .on("error", (err) => reject(err));
      });

      rows = allRows.filter((row) =>
        Object.values(row).some((val) => String(val).trim() !== "")
      );
    } else if (fileName.endsWith(".xlsx")) {
      const workbook = XLSX.read(buffer, { type: "buffer" });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];

      const rawSheet = XLSX.utils.sheet_to_json(sheet, {
        header: 1,
        defval: "",
      }) as any[][];

      const firstValidRowIndex = rawSheet.findIndex((row) =>
        row.some((cell) => cell && String(cell).trim() !== "")
      );

      const headers = rawSheet[firstValidRowIndex];
      const dataRows = rawSheet.slice(firstValidRowIndex + 1);

      rows = dataRows
        .map((row) => {
          const obj: Record<string, string> = {};
          headers.forEach((header: string, idx: number) => {
            obj[header || `Column_${idx + 1}`] = row[idx] || "";
          });
          return obj;
        })
        .filter((row) =>
          Object.values(row).some((value) => String(value).trim() !== "")
        );
    } else {
      return NextResponse.json(
        { error: "Unsupported file type. Only .csv and .xlsx allowed." },
        { status: 400 }
      );
    }

    const previewRows = rows.slice(0, 10);
    const columns = Object.keys(previewRows[0] || {});

    // Implement the upload logic here to S3

    return NextResponse.json({ previewRows, columns });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Failed to parse file. Please check the format." },
      { status: 500 }
    );
  }
}
