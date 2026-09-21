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
import {
  Button,
  useListContext,
  useNotify,
  useRefresh,
  useUnselectAll,
} from "react-admin";
import { provisionCognitoAccounts } from "./service";

type Props = {
  // Omitted means everyone still waiting for an account.
  personIds?: (string | number)[];
  label: string;
  onDone?: () => void;
};

// Creating the Cognito accounts is what emails people their temporary
// password, and an email cannot be unsent, so this always asks first.
export const SendInvitations = ({ personIds, label, onDone }: Props) => {
  const client = useApolloClient();
  const notify = useNotify();
  const refresh = useRefresh();
  const [open, setOpen] = useState(false);
  const [running, setRunning] = useState(false);

  const run = async () => {
    setRunning(true);
    try {
      const result = await provisionCognitoAccounts(client, personIds);
      const parts = [`Invited ${result.created}`];
      if (result.resent > 0) {
        parts.push(`resent to ${result.resent}`);
      }
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
      if (onDone) {
        onDone();
      }
    } catch (e) {
      notify(e instanceof Error ? e.message : "Could not send invitations", {
        type: "error",
      });
    } finally {
      setRunning(false);
    }
  };

  const explanation = personIds
    ? `This emails a temporary password to the ${personIds.length} selected ${
        personIds.length === 1 ? "person" : "people"
      }. Anyone already invited who has not signed in gets a fresh one, which is how to help someone whose first email went to spam. Anyone who has signed in is skipped.`
    : "This emails a temporary password to everyone who has never been invited. Nobody who was already invited is emailed again, and anyone who has signed in is skipped.";

  return (
    <>
      <Button onClick={() => setOpen(true)} label={label} />

      <Dialog open={open} onClose={() => !running && setOpen(false)}>
        <DialogTitle>{label}?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {explanation}
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

// Shown in the bar that appears once rows are ticked, beside Delete.
export const SendInvitationsBulkAction = () => {
  const { selectedIds } = useListContext();
  const unselectAll = useUnselectAll("people");

  return (
    <SendInvitations
      personIds={selectedIds}
      label="Send invitations"
      onDone={unselectAll}
    />
  );
};
