import { useApolloClient } from "@apollo/client";
import {
	Button,
	FormControl,
	Grid,
	InputLabel,
	MenuItem,
	Select,
	TextField
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerSocialLoginUser } from "./service";


export const Register = () => {
	const [fullName, setFullName] = useState("");
	const [email, setEmail] = useState("");
	const [loginMode, setLoginMode] = useState("");
	const client = useApolloClient();
	const navigate = useNavigate();
	const isValid = fullName && email && loginMode;


	return (
		<Grid container>
			<Grid item xs={12}>
				<TextField
					required
					fullWidth
					label="Full Name"
					value={fullName}
					onChange={(e) => {
						setFullName(e.target.value);
					}}
				/>
				
				<TextField
					required
					fullWidth
					label="Email"
					value={email}
					onChange={(e) => {
						setEmail(e.target.value);
					}}
				/>

				<FormControl fullWidth required>
					<InputLabel id="login-mode-label">Login Mode</InputLabel>
					<Select
						labelId="login-mode-label"
						value={loginMode}
						label="Login Mode"
						onChange={(e) => setLoginMode(e.target.value)}
					>
						<MenuItem value="Google">Google</MenuItem>
						<MenuItem value="Facebook">Facebook</MenuItem>
					</Select>
				</FormControl>

				<Button
					disabled={!isValid}
					onClick={(e) => {
						e.stopPropagation();
						registerSocialLoginUser(client, fullName, loginMode, email).then(() => {
							navigate("/socialLoginUsers");
						}).catch((err) => {
							console.log('Social Login Registration Failed', err.stack);
						});
					}}
				>
					Register
				</Button>
			</Grid>
		</Grid>
	);
};