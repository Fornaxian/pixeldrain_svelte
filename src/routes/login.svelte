<script>
import { session } from "$app/stores";

let username = ""
let password = ""

const login = async () => {
	let form = new FormData()
	form.set("username", username)
	form.set("password", password)
	form.set("app", "website login")

	let resp = await fetch("/api/user/login", {method: "POST", body: form})
	if (resp.status >= 400) {
		alert("Login failed: ", await resp.text())
		return
	}

	let sess = await resp.json()
	let expiry = new Date()
	expiry.setFullYear(expiry.getFullYear()+10)

	console.log(sess)

	document.cookie = "pd_auth_key="+sess.auth_key+"; "+
		"Path=/; "+
		"Expires="+expiry.toUTCString()+"; "+
		"Secure; "+
		"SameSite=None"
	location.reload()
}
</script>


<div class="page_content">
	<div class="limit_width">
		<input bind:value={username} type="text" /><br/>
		<input bind:value={password} type="password" /><br/>
		<button on:click={login}>Login</button>
		<br/>
	</div>
</div>
