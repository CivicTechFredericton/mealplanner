import { useApolloClient } from "@apollo/client";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { resetPassword } from "./service";
type ResetParams = {
  rowId: string;
};
export const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const client = useApolloClient();
  const params = useParams<ResetParams>();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const handleVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <Grid container>
      <Grid xs={12}>
        <TextField
          fullWidth
          label="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type={showPassword ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleVisibility}
                >
                  {showPassword ? (
                    <VisibilityOff></VisibilityOff>
                  ) : (
                    <Visibility></Visibility>
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      <Button
        onClick={(e) => {
          e.stopPropagation();
          resetPassword(client, params.rowId!, password).then(() => {
            navigate("/people");
          });
        }}
        variant="contained"
      >
        Reset Password
      </Button>
    </Grid>
  );
};
