<script>
import { session } from "$app/stores";

import { onMount } from "svelte";
import HomePage from "../lib/uploader/HomePage.svelte";


function explainFileExpiry() {
	let m = new Modal(
		document.body, null, "File Expiry Postponing", "600px", "auto"
	)
	m.cloneTemplate("tpl_file_expiry")
	m.open()
	return false
}
function explainDirectLinking() {
	let m = new Modal(
		document.body, null, "Hotlinking Bandwidth", "800px", "auto"
	)
	m.cloneTemplate("tpl_direct_linking")
	m.open()
	return false
}

onMount(() => {
	if (window.location.hash === "#direct_linking" || window.location.hash === "#hotlinking") {
		explainDirectLinking()
	}
})
</script>

<picture>
	<source media="(max-width: 800px)" srcset="/img/home_page/header_orbitron.png">
	<img class="header_image" src="/img/home_page/header_orbitron_wide.png" alt="Header">
</picture>
<br/>

<!-- Svelte element -->
<div id="uploader" class="page_content" style="margin-bottom: 50px;">
	<HomePage></HomePage>
</div>

<h1>What is pixeldrain?</h1>
<div class="page_content"><div class="limit_width">
	<p>
		Pixeldrain is a file sharing website built for speed and ease of
		use. You can upload files you want to share online to our
		servers and we will hold on to them for at least a month. During
		this time anyone with the link will be able to download your
		files. Pixeldrain is built to be as fast as possible, so you
		don't have to do any unnecessary waiting when downloading files.
	</p>
	<p>
		Files can be uploaded by clicking the big green upload
		button, or by dragging them onto this page from your file
		manager.
	</p>
	<p>
		If you uploaded multiple files at once you can also create a
		list, which is a collection of files with one single link. Like
		a photo album, a music record or a video compilation. Click the
		'Create list with uploaded files' button after your uploads are
		complete. The files will be saved in the order you uploaded
		them.
	</p>

	<h2 id="pro">Getting more out of pixeldrain</h2>
	<p>
		By purchasing a subscription you support pixeldrain on its
		mission to make content sharing easier, safer and faster for
		everyone. The standard subscription plans use Patreon for
		payment processing. Check out our <a href="#prepaid">prepaid
		plans</a> if you would like to pay using cryptocurrencies.
	</p>
	<p>
		Pixeldrain uses
		<a href="https://en.wikipedia.org/wiki/Byte#Multiple-byte_units"
		target="_blank">SI standard units</a> for measuring file sizes.
		If you are using Microsoft Windows your files may appear smaller
		than they actually are.
	</p>
	<br/>
	<div class="feat_table">
		<div>
			<div></div>
			<div class="feat_normal round_tl">Free</div>
			<div class="feat_pro feat_highlight round_tr">Pro</div>
		</div>
		<div>
			<div class="feat_label">Size limit per file</div>
			<div class="feat_normal">5 GB per file (4.66 GiB)</div>
			<div class="feat_pro">
				<span class="text_highlight">15 GB</span> per file (13.97 GiB)
			</div>
		</div>
		<div>
			<div class="feat_label">
				File expiry
			</div>
			<div class="feat_normal">
				30 days after the last time it is viewed
			</div>
			<div class="feat_pro">
				<span class="text_highlight">90 days</span> after the last time it is viewed
				<br/>
				<button class="round" onclick="return explainFileExpiry()">
					<i class="icon">info</i>
					More information
				</button>
			</div>
		</div>
		<div>
			<div class="feat_label">
				Data transfer limit
			</div>
			<div class="feat_normal">
				Rate limiting mode will be enabled when a file has 3
				times more downloads than views
			</div>
			<div class="feat_pro">
				Transfer limit of <span class="text_highlight">1
				terabyte</span>. If the transfer limit is exceeded
				advertisements will be enabled again
				<br/>
				<button class="round" onclick="return explainDirectLinking()">
					<i class="icon">info</i>
					More information
				</button>
			</div>
		</div>
		<div>
			<div class="feat_label">
				Adver&shy;tise&shy;ments
			</div>
			<div class="feat_normal">
				Banner advertisements on the file viewer page
			</div>
			<div class="feat_pro">
				<span class="text_highlight">No ads</span> on files
				you share. No ads when viewing files uploaded by
				other users
			</div>
		</div>
		<div>
			<div class="feat_label">Privacy</div>
			<div class="feat_normal">
				No trackers, but advertisers can see your IP address
				and browser fingerprint
			</div>
			<div class="feat_pro">
				<span class="text_highlight">Completely
				private</span>. No third party scripts and no
				logging
			</div>
		</div>
		<div>
			<div class="feat_label">
				Storage space
			</div>
			<div class="feat_normal">
				500 gigabytes
			</div>
			<div class="feat_pro">
				<span class="text_highlight">1 terabyte</span>
			</div>
		</div>
		<div>
			<div class="feat_label">
				Download speed
			</div>
			<div class="feat_normal">
				Up to 4 MiB/s, may be slower during busy periods
			</div>
			<div class="feat_pro">
				<span class="text_highlight">High priority</span>
				bandwidth for files you download and files on your
				account
			</div>
		</div>
		<div>
			<div class="feat_label">
				Online file previews
			</div>
			<div class="feat_normal">
				View image, audio, PDF and text files directly in your
				web browser
			</div>
			<div class="feat_pro">
				<span class="text_highlight">Video streaming</span> in
				your web browser. Free users will also be able to watch
				videos you uploaded
			</div>
		</div>
		<div>
			<div></div>
			<div class="feat_normal round_bl">Free</div>
			<div class="feat_pro feat_highlight round_br">
				Only
				<a href="https://www.patreon.com/join/pixeldrain/checkout?rid=5291427" class="button button_highlight round">
					€ 2 per month
				</a>
				or
				<a href="https://www.patreon.com/join/pixeldrain/checkout?rid=5291427&cadence=12" class="button button_highlight round">
					€ 20 per year!
				</a>
				<br/>
				(Excluding tax)
				<br/>
				Subscription managed by Patreon
			</div>
		</div>
	</div>
	<br/>
	<div style="text-align: center;">
		Do you need even more time and space? Check out our other plans
	</div>
	<br/>
	<div class="feat_table">
		<div>
			<div class="cell_background" style="background-image: url('/img/home_page/benefit_5.webp');">
				Resolve<br/>
			</div>
			<div class="feat_pro features_cell round_tr">
				<div><span class="text_highlight">20 GB</span> max file size (18.63 GiB)<br/></div>
				<div><span class="text_highlight">120 days</span> file expiry</div>
				<div><span class="text_highlight">2 TB</span> transfer limit<br/></div>
				<div><span class="text_highlight">2 TB</span> storage space<br/></div>
			</div>
		</div>
		<div>
			<div class="cell_background" style="background-image: url('/img/home_page/benefit_2.webp');">
				Persistence<br/>
			</div>
			<div class="feat_pro features_cell">
				<div><span class="text_highlight">20 GB</span> max file size<br/></div>
				<div><span class="text_highlight">240 days</span> file expiry</div>
				<div><span class="text_highlight">4 TB</span> transfer limit<br/></div>
				<div><span class="text_highlight">4 TB</span> storage space<br/></div>
			</div>
		</div>
		<div>
			<div class="cell_background" style="background-image: url('/img/home_page/benefit_3.webp');">
				Tenacity<br/>
			</div>
			<div class="feat_pro features_cell">
				<div><span class="text_highlight">20 GB</span> max file size<br/></div>
				<div><span class="text_highlight">480 days</span> file expiry</div>
				<div><span class="text_highlight">8 TB</span> transfer limit<br/></div>
				<div><span class="text_highlight">8 TB</span> storage space<br/></div>
			</div>
		</div>
		<div>
			<div class="cell_background" style="background-image: url('/img/home_page/benefit_4.webp');">
				Eternity<br/>
			</div>
			<div class="feat_pro features_cell">
				<div><span class="text_highlight">20 GB</span> max file size<br/></div>
				<div><span class="text_highlight">Files never expire</span></div>
				<div><span class="text_highlight">16 TB</span> transfer limit<br/></div>
				<div><span class="text_highlight">16 TB</span> storage space<br/></div>
			</div>
		</div>
		<div>
			<div class="cell_background" style="background-image: url('/img/home_page/benefit_6.webp');">
				Infinity<br/>
			</div>
			<div class="feat_pro features_cell">
				<div><span class="text_highlight">20 GB</span> max file size<br/></div>
				<div><span class="text_highlight">Files never expire</span></div>
				<div><span class="text_highlight">32 TB</span> transfer limit<br/></div>
				<div><span class="text_highlight">32 TB</span> storage space<br/></div>
			</div>
		</div>
		<div>
			<div class="cell_background" style="background-image: url('/img/home_page/benefit_7.webp');">
				Omnipotence<br/>
			</div>
			<div class="feat_pro features_cell">
				<div><span class="text_highlight">20 GB</span> max file size<br/></div>
				<div><span class="text_highlight">Files never expire</span></div>
				<div><span class="text_highlight">48 TB</span> transfer limit<br/></div>
				<div><span class="text_highlight">48 TB</span> storage space<br/></div>
			</div>
		</div>
		<div>
			<div class="cell_background" style="background-image: url('/img/home_page/benefit_8.webp');">
				Omnipresence<br/>
			</div>
			<div class="feat_pro features_cell">
				<div><span class="text_highlight">20 GB</span> max file size<br/></div>
				<div><span class="text_highlight">Files never expire</span></div>
				<div><span class="text_highlight">64 TB</span> transfer limit<br/></div>
				<div><span class="text_highlight">64 TB</span> storage space<br/></div>
			</div>
		</div>
		<div>
			<div class="cell_background" style="background-image: url('/img/home_page/benefit_9.webp');">
				Omniscience<br/>
			</div>
			<div class="feat_pro features_cell">
				<div><span class="text_highlight">20 GB</span> max file size<br/></div>
				<div><span class="text_highlight">Files never expire</span></div>
				<div><span class="text_highlight">96 TB</span> transfer limit<br/></div>
				<div><span class="text_highlight">96 TB</span> storage space<br/></div>
			</div>
		</div>
		<div>
			<div class="cell_background" style="background-image: url('/img/home_page/benefit_10.webp');">
				Trinity<br/>
			</div>
			<div class="feat_pro features_cell round_br">
				<div><span class="text_highlight">20 GB</span> max file size<br/></div>
				<div><span class="text_highlight">Files never expire</span></div>
				<div><span class="text_highlight">128 TB</span> transfer limit<br/></div>
				<div><span class="text_highlight">128 TB</span> storage space<br/></div>
			</div>
		</div>
	</div>

	<h2 id="prepaid">Prepaid plans</h2>
	<p>
		You you need more bandwidth or storage space there's also
		prepaid plans. For prepaid we charge a base rate of €1 per
		month, the rest of the charges are usage based. We charge €4 per
		TB per month for storage space and €2 per TB for bandwidth
		usage. We accept Bitcoin, Lightning Network and Dogecoin
		payments.
	</p>
	<p>
		If €4 per TB of storage is too much we also have plans with
		cheaper storage and file expiry enabled. Your files will not
		expire as long as they generate traffic, so this can be a viable
		option if your files are accessed often.
	</p>
	<div style="text-align: center;">
		<img src="/img/home_page/coins.png" alt="supported coins" style="width: 250px;"/>
	</div>
	<p>
		To use prepaid you need to register a pixeldrain account. After
		logging in head to the <a href="/user/transactions">transactions
		page</a> to deposit your coins.
	</p>
</div></div>

<template id="tpl_file_expiry">
	<p>
		Files on pixeldrain have to expire eventually. If we didn't do
		this the website would keep growing forever and we would run out
		of money pretty quickly.
	</p>
	<p>
		Unlike most other sharing sites pixeldrain uses a postponing
		system for expiring files. When a file is freshly uploaded it
		gets 30 days by default (90 days if you have the pro plan).
		After these 30 days we will check when the file was last viewed.
		Files which are regularly viewed could still bring new users to
		the platform, it would be rude to show these people a File Not
		Found page. So if the file was viewed in the last 30 days we
		will simply postpone the next check a month. If the file was not
		viewed however it will immediately be removed.
	</p>
	<p>
		Views are only counted when someone visits the download page in
		a web browser. This makes sure that users can see that the file
		comes from pixeldrain.
	</p>
	<p>
		This way we can minimize dead links, and you won't have to tell
		your friends to 'hurry and download this before it expires'.
	</p>
</template>
<template id="tpl_direct_linking">
	<p>
		Paying for bandwidth is the most expensive part of running
		pixeldrain. Because of this we have to limit what can be
		downloaded and by who.
	</p>
	<p>
		Normally when you view a file it's on pixeldrain's file viewer.
		The file viewer is the page with the download button, the name
		of the file and a frame where you can view the file if it's an
		image, video, audio, PDF or text file.
	</p>
	<h3>Rate limiting</h3>
	<p>
		It's also possible to link directly to a file instead of the
		download page. This circumvents our advertisers and branding and
		thus we lose money when people do this. That's why I added 'rate
		limiting mode' to files. This mode is enabled when a file has
		been downloaded three times more than it has been viewed through
		the file viewer. When rate limiting mode is activated a file
		cannot be downloaded through the API, the request needs to come
		from the file viewer page. On the file viewer you will see a
		CAPTCHA to fill in when you click the download button.
	</p>
	<p>
		More information about <a
		href="https://en.wikipedia.org/wiki/Inline_linking"
		target="_blank">Hotlinking on Wikipedia</a>.
	</p>
	<h3>Hotlinking with a Pro subscription</h3>
	<p>
		When you have a Pro subscription you will get a monthly data
		transfer limit for all the files on your account combined. Files
		you download from pixeldrain are subtracted from the data cap.
		If you have <a href="/user/subscription">Bandwidth sharing</a>
		enabled your data cap is also used when other people download
		your files.
	</p>
	<p>
		In principle there is always someone who pays for the bandwidth
		usage when a file is being downloaded:
	</p>
	<ol>
		<li>
			If the person downloading the file has a Pro subscription
			their data cap is used.
		</li>
		<li>
			If the person who uploaded the file has a Pro subscription
			and Bandwidth sharing is enabled on their account, then the
			uploader's data cap is used.
		</li>
		<li>
			If neither the uploader nor the downloader has a Pro
			subscription the download will be supported by
			advertisements on the download page.
		</li>
	</ol>
	<p>
		The bandwidth cap on your account is a 30 day rolling window.
		This means that bandwidth usage will expire 30 days after it was
		used. Your counter will not reset at the start of the next
		month.
	</p>
	<p>
		When a list of files is downloaded with the 'DL all files'
		button each file in the resulting zip file will be counted
		separately.
	</p>
</template>

<style>
.header_image{
	width: 100%;
	max-width: 800px;
	margin: 0 auto 50px auto;
}
.feat_table {
	display: flex;
	flex-direction: column;
}
.feat_table > div {
	display: flex;
	flex-direction: row;
}
.feat_table > div > div:first-child {
	flex: 0 0 20%;
	max-width: 20%;
}
.feat_table > div > div {
	flex: 1 1 0;
	margin: 0.25em;
	padding: 0.5em;
	text-align: center;
	word-wrap: break-word;
	hyphens: auto;
}
.feat_table > div > .feat_label {
	border-top-left-radius: 0.5em;
	border-bottom-left-radius: 0.5em;
	background-color: var(--layer_1_color);
}
.feat_table > div > .feat_normal {
	background-color: var(--layer_3_color);
	box-shadow: 1px 1px 3px -1px var(--shadow_color);
	text-shadow: 1px 1px 3px var(--shadow_color);
}
.feat_table > div > .feat_pro {
	background-color: var(--layer_4_color);
	box-shadow: 1px 1px 3px 0 var(--shadow_color);
	text-shadow: 1px 1px 6px var(--shadow_color);
}
.feat_table > div > .feat_highlight {
	border: 1px solid var(--highlight_color)
}
.text_highlight {
	color: var(--highlight_color);
	text-shadow: 0 0 4px var(--shadow_color);
	font-size: 1.1em;
	font-weight: bold;
}
.feat_table > div > .cell_background {
	flex: 0 0 33%;
	min-width: 33%;
	border-top-left-radius: 0.5em;
	border-bottom-left-radius: 0.5em;
	background-position: center;
	background-size: cover;
	text-align: left;
	font-size: 1.1em;
	color: #ffffff;
	text-shadow: 0 0 3px #000000;
}

.feat_table > div > div.round_tl { border-top-left-radius:     0.5em; }
.feat_table > div > div.round_tr { border-top-right-radius:    0.5em; }
.feat_table > div > div.round_br { border-bottom-right-radius: 0.5em; }
.feat_table > div > div.round_bl { border-bottom-left-radius:  0.5em; }

.features_cell {
	display: flex;
	flex-wrap: wrap;
}
.features_cell > div {
	flex: 1 1 50%;
	min-width: 220px;
}

</style>
