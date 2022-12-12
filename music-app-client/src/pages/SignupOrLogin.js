import axios from "axios";
import { useState } from "react";


export default function SignupOrLogin({ action }) {
	const [formState, setFormState] = useState({
		email: "",
		password: "",
	});

	// const { getUserInfo } = useContext(UserContext);

	const updateInput = (e, thingToUpdate) => {
		setFormState({ ...formState, [thingToUpdate]: e.target.value });
	};

	const submitSignupForm = () => {
		let endpoint;
		if (action === "signup") endpoint = "signup";
		if (action === "login") endpoint = "login";

		axios.post("http://localhost:5005/" + endpoint,
				{
					email: formState.email,
					password: formState.password,
				},
				{ withCredentials: true }
			)
			.then((response) => {
				getUserInfo();
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (

		<div className={action}>
			{action === "signup" ? "Signup" : "Login"}
			<div>
				Email
				<input
					type="text"
					value={formState.email}
					onChange={(e) => {
						updateInput(e, "email");
					}}
				/>
			</div>
			<div>
				Password
				<input
					type="text"
					value={formState.password}
					onChange={(e) => {
						updateInput(e, "password");
					}}
				/>
			</div>
			<button onClick={submitSignupForm}>Submit</button>
		</div>

	);
}