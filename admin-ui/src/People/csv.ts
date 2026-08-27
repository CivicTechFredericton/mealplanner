// A small RFC 4180 CSV reader.
//
// Written by hand rather than pulled from a library because this project is
// on TypeScript 4.6, which cannot parse the @types/node that ships with the
// usual CSV packages. It handles what a spreadsheet export actually produces:
// quoted fields containing commas or line breaks, doubled quotes as an escape,
// CRLF or LF endings, and a leading byte order mark.

// Headers vary between exports, so match them loosely. "CLIENT_ID",
// "client id" and "clientId" all collapse to the same key.
export const normalizeHeader = (header: string) =>
  header.toLowerCase().replace(/[^a-z0-9]/g, "");

export const splitCsv = (text: string): string[][] => {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let inQuotes = false;
  let i = text.charCodeAt(0) === 0xfeff ? 1 : 0;

  const endField = () => {
    row.push(field);
    field = "";
  };
  const endRow = () => {
    endField();
    rows.push(row);
    row = [];
  };

  while (i < text.length) {
    const char = text[i];

    if (inQuotes) {
      if (char === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i += 2;
          continue;
        }
        inQuotes = false;
        i += 1;
        continue;
      }
      field += char;
      i += 1;
      continue;
    }

    if (char === '"') {
      inQuotes = true;
      i += 1;
      continue;
    }
    if (char === ",") {
      endField();
      i += 1;
      continue;
    }
    if (char === "\r" || char === "\n") {
      if (char === "\r" && text[i + 1] === "\n") {
        i += 1;
      }
      endRow();
      i += 1;
      continue;
    }

    field += char;
    i += 1;
  }

  // Whatever is left over, unless the file ended on a line break.
  if (field !== "" || row.length > 0) {
    endRow();
  }

  // Drop rows that are entirely blank, which trailing newlines produce.
  return rows.filter((cells) => cells.some((value) => value.trim() !== ""));
};

export type CsvRecord = Record<string, string>;

// Returns one record per data row, keyed by normalized header. `row` is the
// position in the file counting the header as row 1, which is what an admin
// sees when they open the file in a spreadsheet.
export const parseCsv = (text: string): { row: number; values: CsvRecord }[] => {
  const rows = splitCsv(text);
  if (rows.length === 0) {
    return [];
  }

  const headers = rows[0].map(normalizeHeader);

  return rows.slice(1).map((cells, index) => {
    const values: CsvRecord = {};
    headers.forEach((header, column) => {
      values[header] = (cells[column] ?? "").trim();
    });
    return { row: index + 2, values };
  });
};

// Returns the first non-empty value among the given keys.
export const pick = (values: CsvRecord, keys: string[]): string | null => {
  for (const key of keys) {
    const value = values[key];
    if (value !== undefined && value !== "") {
      return value;
    }
  }
  return null;
};
