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
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google"; // npm install @react-oauth/google
// import jwt_decode from 'jwt-decode';
import {jwtDecode} from 'jwt-decode';
import { getCurrentPerson, login, updatePersonTerms, emailVerify } from "../state/state";
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
const GOOGLE_CLIENT_ID = "257812322829-8eldvvic573u11288rrh2u53ver5g1gu.apps.googleusercontent.com";
console.log('client_id', GOOGLE_CLIENT_ID);
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
			await login(username, password);
		} catch (err: any) {
			console.log("login error", err);
			setResult(err);
		}
	};

	const handleGoogleSuccess = async (credentialResponse: any) => {
		try {
			console.log('handleGoogleSuccess - decode credential', credentialResponse );
			const decoded: any = jwtDecode(credentialResponse.credential);
			const email = decoded.email;
			console.log('handleGoogleSuccess', email, decoded);
			
			// You can send this token to your backend to verify/create a session
			const isEmailReg = await emailVerify(email);
			if(!isEmailReg) {
				throw new Error("Login denied. Please contact Greener Village.");
			}
		} catch (err: any) {
			console.log("Google login error", err);
			setResult(err);
		}
	};

	const handleGoogleFailure = () => {
		console.log("Google login failed.");
		setResult("Google login failed.");
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
		<GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
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

						{/* Google login UI placeholder */}
						<GoogleLogin onSuccess={handleGoogleSuccess} onError={handleGoogleFailure}></GoogleLogin>
						{/* <Button
							variant="outlined"
							color="primary"
							style={{ textTransform: "none" }}
							onClick={() => { }}
						>
							<img
								src="https://developers.google.com/identity/images/g-logo.png"
								alt="Google"
								style={{ height: 20, marginRight: 8 }}
							/>
							Continue with Google
						</Button> */}

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


				{/* <section
					onKeyPress={(ev) => {
						if (ev.key === "Enter") {
							handleLogin();
							ev.preventDefault();
						}
					}}
					style={{
						width: "30%",
						height: "400px",
						backgroundColor: "white",
						padding: "2rem",
						margin: "2rem",
						textAlign: "center",
						display: "flex",
						flexDirection: "column",
						gap: "1rem",
					}}
				>
					<Typography variant="h5">Looking for a healthier meal?</Typography>

					<TextField
						variant="filled"
						placeholder="user name"
						onChange={(e) => setUsername(e.target.value)}
					></TextField>

					<TextField
						type={showPassword ? "text" : "password"}
						placeholder="password"
						variant="filled"
						onChange={(e) => setPassword(e.target.value)}
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
				</section> */}
			</main>
		</GoogleOAuthProvider>
	);
};