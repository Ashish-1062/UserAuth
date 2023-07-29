document.addEventListener("DOMContentLoaded", () => {
	const signupForm = document.getElementById("signupForm");
	const error = document.getElementById("error");

	signupForm.addEventListener("submit", (e) => {
		e.preventDefault();

		const name = document.getElementById("name").value;
		const email = document.getElementById("email").value;
		const password = document.getElementById("password").value;
		const confirmPassword = document.getElementById("confirmPassword").value;

		// Check if all fields are filled
		if (!name || !email || !password || !confirmPassword) {
			error.classList.remove("hidden");
		} else {
			// Continue with the signup process and store data in local storage
			error.classList.add("hidden");

			// Generate a random 16-byte access token (for demo purposes only)
			const accessToken = [...Array(16)]
				.map(() => Math.random().toString(36)[2])
				.join("");

			// Store user details and access token in local storage
			localStorage.setItem("access_token", accessToken);
			localStorage.setItem("name", name);
			localStorage.setItem("email", email);
			// Add other user details to local storage as needed

			// Display success message and redirect to Profile page (profile.html)
			alert("Signup successful!");
			window.location.href = "profile.html";
		}
	});

	// Profile Page
	if (window.location.pathname === "/profile.html") {
		const accessToken = localStorage.getItem("access_token");
		if (!accessToken) {
			window.location.href = "signup.html";
		} else {
			const profileInfo = document.getElementById("profileInfo");
			const name = localStorage.getItem("name");
			const email = localStorage.getItem("email");
			// Retrieve and display other user details from local storage as needed

			profileInfo.innerHTML = `
          <p>Welcome, ${name}!</p>
          <p>Email: ${email}</p>
          <!-- Display other user details here as needed -->
        `;

			const logoutButton = document.getElementById("logout");
			logoutButton.addEventListener("click", () => {
				// Clear local storage and redirect to Signup page
				localStorage.clear();
				window.location.href = "signup.html";
			});
		}
	}
});
// ... (The existing code remains unchanged)

// Profile Page
if (window.location.pathname === "/profile.html") {
	document.addEventListener("DOMContentLoaded", () => {
		const accessToken = localStorage.getItem("access_token");
		if (!accessToken) {
			// Redirect to Signup page if the user is not logged in
			window.location.href = "signup.html";
		} else {
			// Display user details on the Profile page
			const fullName = localStorage.getItem("name");
			const email = localStorage.getItem("email");
			const password = localStorage.getItem("password");

			const fullNameElement = document.getElementById("fullName");
			const emailElement = document.getElementById("email");
			const tokenElement = document.getElementById("token");
			const passwordElement = document.getElementById("password");

			fullNameElement.textContent = fullName;
			emailElement.textContent = email;
			tokenElement.textContent = accessToken;
			passwordElement.textContent = password;

			const logoutButton = document.getElementById("logout");
			logoutButton.addEventListener("click", () => {
				// Clear local storage and redirect to Signup page on logout
				localStorage.clear();
				window.location.href = "signup.html";
			});
		}
	});
}
