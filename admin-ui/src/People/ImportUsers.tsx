import { useApolloClient } from "@apollo/client";
import {
  Alert,
  Button,
  LinearProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { parseCsv, pick } from "./csv";
import { importPerson } from "./service";

const EMAIL_KEYS = ["email", "emailaddress"];
const CLIENT_ID_KEYS = ["clientid", "client"];
const NAME_KEYS = ["fullname", "name"];

type ParsedRow = {
  row: number;
  email: string | null;
  clientId: string | null;
  fullName: string | null;
};

type Failure = { row: number; email: string | null; reason: string };

export const ImportUsers = () => {
  const client = useApolloClient();
  const navigate = useNavigate();

  const [fileName, setFileName] = useState<string | null>(null);
  const [rows, setRows] = useState<ParsedRow[]>([]);
  const [parseError, setParseError] = useState<string | null>(null);
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(0);
  const [succeeded, setSucceeded] = useState(0);
  const [failures, setFailures] = useState<Failure[]>([]);
  const [finished, setFinished] = useState(false);

  const missingEmail = rows.filter((r) => !r.email);
  const importable = rows.filter((r) => r.email);

  const handleFile = async (file: File) => {
    setFileName(file.name);
    setParseError(null);
    setRows([]);
    setFinished(false);
    setFailures([]);
    setSucceeded(0);
    setDone(0);

    try {
      const parsed = parseCsv(await file.text());
      if (parsed.length === 0) {
        setParseError("that file has no data rows");
        return;
      }
      setRows(
        parsed.map(({ row, values }) => ({
          row,
          email: pick(values, EMAIL_KEYS),
          clientId: pick(values, CLIENT_ID_KEYS),
          fullName: pick(values, NAME_KEYS),
        }))
      );
    } catch (e) {
      setParseError(e instanceof Error ? e.message : String(e));
    }
  };

  // Rows go one at a time so a single bad row can be reported against its
  // own row number instead of failing the whole upload.
  const runImport = async () => {
    setRunning(true);
    setFinished(false);
    setFailures([]);
    setSucceeded(0);
    setDone(0);

    const collected: Failure[] = [];
    let ok = 0;

    for (const row of importable) {
      try {
        await importPerson(client, row.email!, row.clientId, row.fullName);
        ok += 1;
        setSucceeded(ok);
      } catch (e) {
        collected.push({
          row: row.row,
          email: row.email,
          reason: e instanceof Error ? e.message : String(e),
        });
        setFailures([...collected]);
      }
      setDone((d) => d + 1);
    }

    setRunning(false);
    setFinished(true);
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Import users from CSV
      </Typography>
      <Typography variant="body2" gutterBottom>
        The file needs an email column. CLIENT_ID and name columns are
        optional. Importing the same file twice is safe, existing people are
        matched rather than duplicated.
      </Typography>

      <Button variant="contained" component="label" sx={{ mt: 2 }}>
        Choose CSV
        <input
          hidden
          type="file"
          accept=".csv,text/csv"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              handleFile(file);
            }
          }}
        />
      </Button>
      {fileName && (
        <Typography variant="body2" sx={{ mt: 1 }}>
          {fileName}
        </Typography>
      )}

      {parseError && (
        <Alert severity="error" sx={{ mt: 2 }}>
          Could not read the file: {parseError}
        </Alert>
      )}

      {rows.length > 0 && (
        <>
          <Alert severity="info" sx={{ mt: 2 }}>
            {importable.length} row{importable.length === 1 ? "" : "s"} ready to
            import
            {missingEmail.length > 0 &&
              `, ${missingEmail.length} skipped because they have no email`}
            .
          </Alert>

          <TableContainer sx={{ mt: 2, maxHeight: 320 }}>
            <Table size="small" stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>Row</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>CLIENT_ID</TableCell>
                  <TableCell>Name</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.slice(0, 20).map((row) => (
                  <TableRow key={row.row}>
                    <TableCell>{row.row}</TableCell>
                    <TableCell>{row.email ?? "(missing)"}</TableCell>
                    <TableCell>{row.clientId ?? ""}</TableCell>
                    <TableCell>{row.fullName ?? ""}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          {rows.length > 20 && (
            <Typography variant="caption">
              Showing the first 20 of {rows.length} rows.
            </Typography>
          )}

          <Button
            variant="contained"
            sx={{ mt: 2 }}
            disabled={running || importable.length === 0}
            onClick={runImport}
          >
            {running ? "Importing..." : `Import ${importable.length} users`}
          </Button>
        </>
      )}

      {running && (
        <>
          <LinearProgress
            variant="determinate"
            value={(done / importable.length) * 100}
            sx={{ mt: 2 }}
          />
          <Typography variant="body2" sx={{ mt: 1 }}>
            {done} of {importable.length}
          </Typography>
        </>
      )}

      {finished && (
        <Alert
          severity={failures.length > 0 ? "warning" : "success"}
          sx={{ mt: 2 }}
        >
          Imported {succeeded} of {importable.length}.
          {failures.length > 0 && ` ${failures.length} failed.`}
        </Alert>
      )}

      {failures.length > 0 && (
        <TableContainer sx={{ mt: 2, maxHeight: 240 }}>
          <Table size="small" stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Row</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Problem</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {failures.map((f) => (
                <TableRow key={f.row}>
                  <TableCell>{f.row}</TableCell>
                  <TableCell>{f.email}</TableCell>
                  <TableCell>{f.reason}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {finished && (
        <Button sx={{ mt: 2 }} onClick={() => navigate("/people")}>
          Back to users
        </Button>
      )}
    </Paper>
  );
};
