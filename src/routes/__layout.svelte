<script>
import { session } from "$app/stores";
import Background from "$lib/Background.svelte";

let nav
let body

const toggle_menu = () => {
	if (nav.offsetLeft === 0) {
		// Menu is visible, hide it
		nav.style.left = -nav.offsetWidth + "px";
		body.style.left = "0";
	} else {
		// Menu is hidden, show it
		nav.style.left = "0";
		body.style.left = nav.offsetWidth + "px";
	}
}
const reset_menu = () => {
	nav.style.left = "";
	body.style.left = "";
}

const logout = async () => {
	let resp = await fetch("/api/user/session", {method: "DELETE"})
	if (resp.status >= 400) {
		alert("Failed to delete session: ", await resp.text())
		return
	}

	document.cookie = "pd_auth_key=; Path=/; Expires="+new Date(0).toUTCString()+";"

	location.reload()
}
</script>

<svelte:head>
	<link rel="stylesheet" href="/layout.css"/>
	<style>
		:root {
			--text_color:                 #cccccc;
			--input_color:                #550eb3;
			--input_color_dark:           #510da9;
			--input_text_color:           #ffffff;
			--highlight_color:            #32bf2b;
			--highlight_color_dark:       #30b629;
			--highlight_text_color:       #000000;
			--danger_color:               #bf2b32;
			--danger_color_dark:          #b62930;
			--scrollbar_foreground_color: #550eb3;
			--scrollbar_hover_color:      #7113eb;
			--scrollbar_background_color: #11031a;

			--layer_1_color:        #140320;
			--layer_1_color_border: #220637;
			--layer_2_color:        #220735;
			--layer_2_color_border: #300a4b;
			--layer_3_color:        #330d4e;
			--layer_3_color_border: #411163;
			--layer_4_color:        #431564;
			--layer_4_color_border: #51197a;

			--shadow_color:     #000000;
		}
	</style>
</svelte:head>

<Background></Background>

<button class="button_toggle_navigation" on:click={toggle_menu}>☰</button>
<div bind:this={nav} class="page_navigation">
	<a href="/">Home</a>
	<hr />
	{#if $session.user}
		<a href="/user">{$session.user.username}</a>
		<a href="/user/filemanager#files">My Files</a>
		<a href="/user/filemanager#lists">My Albums</a>
		{#if $session.user.is_admin}
			<a href="/user/buckets">Buckets</a>
			<a href="/admin">Admin Panel</a>
		{/if}
		<a on:click|preventDefault={logout} href="return false;">Log out</a>
	{:else}
		<a href="/login">Login</a>
		<a href="/register">Register</a>
		<a href="/history">Upload History</a>
	{/if}
	<hr />
	<a href="/about">About</a>
	<a href="/apps">Apps</a>
	<a href="/appearance">Theme</a>
	<a href="/api">API</a>
	<a href="/acknowledgements">Acknowledgements</a>
	<a href="https://stats.uptimerobot.com/p9v2ktzyjm" target="_blank">Server Status</a>
</div>

<div bind:this={body} class="page_body">
	<slot></slot>

	<div class="highlight_dark">
		<div style="display: inline-block; margin: 0 8px 0 8px;">
			Pixeldrain is a product by <a href="//fornaxian.tech" target="_blank">Fornaxian Technologies</a>
		</div>
		<div style="display: inline-block; margin: 0 8px 0 8px;">
			(
			<a href="https://www.patreon.com/pixeldrain" target="_blank">Patreon</a> |
			<a href="https://twitter.com/Fornax96" target="_blank">Twitter</a> |
			<a href="https://reddit.com/r/pixeldrain" target="_blank">Reddit</a> |
			<a href="https://github.com/Fornaxian" target="_blank">GitHub</a> |
			<a href="https://mastodon.social/web/@fornax" target="_blank">Mastodon</a>
			)
		</div>
		<br/>
		<span class="small_footer_text" style="font-size: .75em; line-height: .75em;">
			page rendered by
		</span>
	</div>
</div>

<style>

.button_toggle_navigation {
	position: fixed;
	backface-visibility: hidden;
	z-index: 300;
	top: 0;
	left: 0;
	padding: 10px 20px 15px 10px;
	font-size: 2em;
	margin: 0;
	background: #3f3f3f;
	background: var(--input_color);
	border-radius: 0;
	border-bottom-right-radius: 90%;
	box-shadow: 2px 2px 8px -3px var(--shadow_color);
}
.button_toggle_navigation:active {
	padding: 15px 15px 10px 15px;
}

.page_navigation {
	position: fixed;
	backface-visibility: hidden;
	z-index: 99;
	width: 18em;
	height: 100%;
	left: 0;
	float: left;
	background-color: #1c1c1c;
	background-color: var(--layer_1_color);
	padding: 20px 0 0.5em 0;
	overflow-y: auto;
	overflow-x: hidden;
	text-align: left;
	box-shadow: inset -8px 0px 8px -8px var(--shadow_color);
	transition: left 0.5s;
}
.page_body {
	position: absolute;
	z-index: 200;
	right: 0;
	height: auto;
	left: 18em;
	min-width: 300px;
	display: inline-block;
	text-align: center; /* Center the header and body */
	overflow-y: auto;
	overflow-x: hidden;
	z-index: 50;
	transition: left 0.5s;
	padding: 70px 0 100px 0;
}
@media (max-width: 1000px) {
	.page_navigation {
		left: -18em;
	}
	.page_body {
		left: 0;
		width: 100%;
	}
}
</style>
