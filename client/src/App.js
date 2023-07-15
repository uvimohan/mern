import { useState } from 'react'

function App() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	async function registerUser(e) {
		e.preventDefault();
		try {
			const response = await fetch("http://localhost:8000/api/register", {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					name,
					email,
					password
				})
			})
			const data = await response.json();
			console.log(data)
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<div className="App">
			<h3 style={{ margin: 5 }}>Register</h3>
			<form onSubmit={registerUser}>
				<input
					style={{ margin: 5 }}
					value={name}
					onChange={(e) => setName(e.target.value)}
					type='text'
					placeholder='Name'
				/>
				<br />
				<input
					style={{ margin: 5 }}
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					type='email'
					placeholder='Email'
				/>
				<br />
				<input
					style={{ margin: 5 }}
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					type='password'
					placeholder='Password'
				/>
				<br />
				<input
					style={{ margin: 5 }}
					type="submit"
					value="Register"
				/>
			</form>
		</div>
	);
}

export default App;