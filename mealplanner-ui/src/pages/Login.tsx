import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
	Modal,
	Box,
	Button,
	IconButton,
	InputAdornment,
	TextField,
	Typography,
} from "@mui/material";
import { graphql } from "babel-plugin-relay/macro";
import { useState } from "react";
import { useLazyLoadQuery } from "react-relay";
import { Navigate } from "react-router";
import { getCurrentPerson, login, updatePersonTerms } from "../state/state";
import { LoginQuery } from "./__generated__/LoginQuery.graphql";

const query = graphql`
  query LoginQuery {
    currentPerson {
      fullName
      email
    }
    gqLocalState {
      currentUser {
        personID
      }
    }
  }
`;


// const API_BASE = process.env.REACT_APP_API_BASE_URL ?? "http://localhost:4000"; // "" => same-origin in prod
// const AUTH_URL = `${API_BASE || window.location.origin}/auth/google`;
// console.log('auth_url', AUTH_URL)

export const authStartUrl = () =>
  `${window.location.origin}/auth/google`;

export const Login = () => {
	let [username, setUsername] = useState("");
	let [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [result, setResult] = useState("");

	const handleVisibility = () => {
		setShowPassword(!showPassword);
	};

	const handleLogin = async () => {
		try {
			console.log(username, password)
			await login(username, password);
			console.log("login successful");
		} catch (err: any) {
			console.log("login error", err);
			setResult(err);
		}
	};

	let data = useLazyLoadQuery<LoginQuery>(
		query,
		{},
		{
			fetchPolicy: "network-only",
			fetchKey: getCurrentPerson().personID,
			networkCacheConfig: {
				force: true,
			},
		}
	);
	if (data.gqLocalState.currentUser?.personID) {
		return <Navigate to="/mealplans" replace />;
	}

	return (
		<main
			style={{
				height: "560px",
				backgroundImage: `url('/images/veggie-background-log-in.png')`,
				backgroundSize: "cover",
				// backgroundPosition: "center",
				display: "flex",
				justifyContent: "center",
				// alignItems: "center"
			}}
		>
			<Modal open={true} hideBackdrop>
				<Box
					onKeyPress={(ev) => {
						if (ev.key === "Enter") {
							handleLogin();
							ev.preventDefault();
						}
					}}
					sx={{
						width: 400,
						margin: "auto",
						mt: "8rem",
						p: 4,
						borderRadius: 2,
						display: "flex",
						flexDirection: "column",
						gap: "1rem",
						textAlign: "center",
						boxShadow: 6,
						bgcolor: "rgba(255, 255, 255, 0.85)",
						// bgcolor: "white"
						// backdropFilter: "blur(6px)", // optional for glassmorphism
					}}
				>

					<Typography variant="h5">Looking for a healthier meal?</Typography>

					<Button
						variant="outlined"
						color="primary"
						style={{ textTransform: "none" }}
						onClick={() => window.location.assign(authStartUrl())} 						
						// onClick={() => window.location.assign(AUTH_URL)} // force full-page nav (HashRouter can't hijack)
					>
						<img
							src="https://developers.google.com/identity/images/g-logo.png"
							alt="Google"
							style={{ height: 20, marginRight: 8 }}
						/>
						Continue with Google
					</Button>

					<Typography variant="body2" sx={{ mt: 1 }}>
						OR
					</Typography>

					{/* username field */}
					<TextField
						variant="filled"
						placeholder="username"
						onChange={(e) => setUsername(e.target.value)}
						value={username}
					></TextField>

					{/* password field */}
					<TextField
						type={showPassword ? "text" : "password"}
						placeholder="password"
						variant="filled"
						onChange={(e) => setPassword(e.target.value)}
						value={password}
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
					></TextField>

					{result ? (
						<Typography variant="body2" color={"red"}>
							{result}
						</Typography>
					) : (
						<></>
					)}

					<Button variant="contained" onClick={handleLogin}>
						Login
					</Button>

					<Typography fontSize="small" marginTop={"3rem"}>
						Don't have an account? <br />
						Contact{" "}
						<label style={{ color: "green" }}>
							john.doe@greenervillage.com
						</label>{" "}
						to get started
					</Typography>
				</Box>

			</Modal>


		</main>
	);
};