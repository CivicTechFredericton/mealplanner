import { useApolloClient } from "@apollo/client";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button as MuiButton,
} from "@mui/material";
import { useState } from "react";
import { Button, useNotify, useRefresh } from "react-admin";
import { provisionCognitoAccounts } from "./service";

// Creating the Cognito accounts is what emails people their temporary
// password, and an email cannot be unsent, so this always asks first.
export const SendInvitations = () => {
  const client = useApolloClient();
  const notify = useNotify();
  const refresh = useRefresh();
  const [open, setOpen] = useState(false);
  const [running, setRunning] = useState(false);

  const run = async () => {
    setRunning(true);
    try {
      const result = await provisionCognitoAccounts(client);
      const parts = [`Invited ${result.created}`];
      if (result.alreadyExisted > 0) {
        parts.push(`${result.alreadyExisted} already had an account`);
      }
      if (result.failures.length > 0) {
        parts.push(`${result.failures.length} failed`);
      }

      notify(parts.join(", "), {
        type: result.failures.length > 0 ? "warning" : "success",
      });

      if (result.failures.length > 0) {
        // The notification is too small for a list, so put the detail
        // somewhere an admin can actually read it.
        console.warn("Invitation failures:", result.failures);
      }
      refresh();
      setOpen(false);
    } catch (e) {
      notify(e instanceof Error ? e.message : "Could not send invitations", {
        type: "error",
      });
    } finally {
      setRunning(false);
    }
  };

  return (
    <>
      <Button onClick={() => setOpen(true)} label="Send invitations" />

      <Dialog open={open} onClose={() => !running && setOpen(false)}>
        <DialogTitle>Send invitations?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This creates a login for everyone who has been imported but has
            not signed in yet, and emails each of them a temporary password.
            Anyone who already has a login is skipped.
            <br />
            <br />
            Emails cannot be unsent, so check the list first.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <MuiButton disabled={running} onClick={() => setOpen(false)}>
            Cancel
          </MuiButton>
          <MuiButton disabled={running} variant="contained" onClick={run}>
            {running ? "Sending..." : "Send"}
          </MuiButton>
        </DialogActions>
      </Dialog>
    </>
  );
};
