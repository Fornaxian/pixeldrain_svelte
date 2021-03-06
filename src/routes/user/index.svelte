<script>
import { onDestroy, onMount } from "svelte";
import { formatDataVolume, formatThousands } from "$lib/util/Formatting.svelte";
import Chart from "$lib/util/Chart.svelte";
import Euro from "$lib/util/Euro.svelte"
import StorageProgressBar from "$lib/user_home/StorageProgressBar.svelte";
import HotlinkProgressBar from "$lib/user_home/HotlinkProgressBar.svelte";
import { session } from "$app/stores";
import { api_endpoint } from "$lib/Constants.svelte";

let graph_views_downloads = null
let graph_bandwidth = null
let time_start = ""
let time_end = ""
let total_views = 0
let total_downloads = 0
let total_bandwidth = 0
let total_transfer_paid = 0

let load_graphs = async (minutes, interval) => {
	let end = new Date()
	let start = new Date()
	start.setMinutes(start.getMinutes() - minutes)

	try {
		let views = get_graph_data("views", start, end, interval);
		let downloads = get_graph_data("downloads", start, end, interval);
		let bandwidth = get_graph_data("bandwidth", start, end, interval);
		let transfer_paid = get_graph_data("transfer_paid", start, end, interval);
		views = await views
		downloads = await downloads
		bandwidth = await bandwidth
		transfer_paid = await transfer_paid

		graph_views_downloads.data().labels = views.timestamps;
		graph_views_downloads.data().datasets[0].data = views.amounts
		graph_views_downloads.data().datasets[1].data = downloads.amounts
		graph_bandwidth.data().labels = bandwidth.timestamps;
		graph_bandwidth.data().datasets[0].data = bandwidth.amounts
		graph_bandwidth.data().datasets[1].data = transfer_paid.amounts

		graph_views_downloads.update()
		graph_bandwidth.update()

		time_start = views.timestamps[0];
		time_end = views.timestamps.slice(-1)[0];
	} catch (err) {
		console.error("Failed to update graphs", err)
		return
	}
}

let get_graph_data = async (stat, start, end, interval) => {
	let resp = await fetch(
		api_endpoint + "/user/time_series/" + stat +
		"?start=" + start.toISOString() +
		"&end=" + end.toISOString() +
		"&interval=" + interval
	)
	resp = await resp.json()

	// Convert the timestamps to a human-friendly format
	resp.timestamps.forEach((val, idx) => {
		let date = new Date(val);
		let str = ("00" + (date.getMonth() + 1)).slice(-2);
		str += "-" + ("00" + date.getDate()).slice(-2);
		str += " " + ("00" + date.getHours()).slice(-2);
		str += ":" + ("00" + date.getMinutes()).slice(-2);
		resp.timestamps[idx] = "  " + str + "  "; // Poor man's padding
	});

	// Add up the total amount and save it in the correct place
	let total = resp.amounts.reduce((acc, cur) => { return acc + cur }, 0)

	if (stat == "views") {
		total_views = total;
	} else if (stat == "downloads") {
		total_downloads = total;
		graph_views_downloads.update()
	} else if (stat == "bandwidth") {
		total_bandwidth = total;
	} else if (stat == "transfer_paid") {
		total_transfer_paid = total;
	}

	return resp
}

let graph_timeout = null
let graph_timespan = 0
let update_graphs = (minutes, interval, live) => {
	if (graph_timeout !== null) { clearTimeout(graph_timeout) }
	if (live) {
		graph_timeout = setTimeout(() => { update_graphs(minutes, interval, true) }, 6000)
	}

	graph_timespan = minutes

	load_graphs(minutes, interval)
	load_direct_bw()
}

let transfer_cap = 0
let transfer_used = 0
let storage_space_used = 0
let load_direct_bw = () => {
	let today = new Date()
	let start = new Date()
	start.setDate(start.getDate() - 30)

	fetch(
		api_endpoint + "/user/time_series/transfer_paid" +
		"?start=" + start.toISOString() +
		"&end=" + today.toISOString() +
		"&interval=60"
	).then(resp => {
		if (!resp.ok) { return Promise.reject("Error: " + resp.status); }
		return resp.json();
	}).then(resp => {
		let total = resp.amounts.reduce((accum, val) => accum += val, 0);
		transfer_used = total
		storage_space_used = $session.user.storage_space_used
	}).catch(e => {
		console.error("Error requesting time series: " + e);
	})
}

onMount(() => {
	if ($session.user.monthly_transfer_cap > 0) {
		transfer_cap = $session.user.monthly_transfer_cap
	} else if ($session.user.subscription.monthly_transfer_cap > 0) {
		transfer_cap = $session.user.subscription.monthly_transfer_cap
	} else {
		transfer_cap = -1
	}

	graph_views_downloads.data().datasets = [
		{
			label: "Views",
			borderWidth: 2,
			pointRadius: 0,
			borderColor: "#32bf2b",
			backgroundColor: "#32bf2b",
		},
		{
			label: "Downloads",
			borderWidth: 2,
			pointRadius: 0,
			borderColor: "#bf2b32",
			backgroundColor: "#bf2b32",
		},
	];
	graph_bandwidth.data().datasets = [
		{
			label: "Bandwidth (total)",
			borderWidth: 2,
			pointRadius: 0,
			borderColor: "#32bf2b",
			backgroundColor: "#32bf2b",
		},
		{
			label: "Bandwidth (premium)",
			borderWidth: 2,
			pointRadius: 0,
			borderColor: "#bf2b32",
			backgroundColor: "#bf2b32",
		},
	];

	update_graphs(1440, 1, true);
})
onDestroy(() => {
	if (graph_timeout !== null) {
		clearTimeout(graph_timeout)
	}
})
</script>

<div>
	<div class="limit_width">
		<h2>Account information</h2>
		<ul>
			<li>Username: {$session.user.username}</li>
			<li>E-mail address: {$session.user.email}</li>
			<li>
				Supporter level: {$session.user.subscription.name}
				{#if $session.user.subscription.type === "patreon"}
					(<a href="https://www.patreon.com/join/pixeldrain/checkout?edit=1">Manage subscription</a>)
				{/if}
				<ul>
					<li>
						Max file size: {formatDataVolume($session.user.subscription.file_size_limit, 3)}
					</li>
					{#if $session.user.subscription.file_expiry_days > 0}
						<li>Files expire after {$session.user.subscription.file_expiry_days} days</li>
					{:else}
						<li>Files never expire</li>
					{/if}
				</ul>
			</li>
			{#if $session.user.balance_micro_eur !== 0}
				<li>
					Current account balance: <Euro amount={$session.user.balance_micro_eur}></Euro>
				</li>
			{/if}
		</ul>

		<div class="indent">
			{#if $session.user.subscription.storage_space === -1}
				Storage space used: {formatDataVolume(storage_space_used, 3)}<br/>
			{:else}
				<StorageProgressBar used={storage_space_used} total={$session.user.subscription.storage_space}></StorageProgressBar>
			{/if}

			{#if transfer_cap === -1}
				Paid transfers in the last 30 days: {formatDataVolume(transfer_used, 3)}<br/>
			{:else}
				Paid transfers:
				{formatDataVolume(transfer_used, 3)}
				out of
				{formatDataVolume(transfer_cap, 3)}
				(<a href="/user/subscription">Set your transfer limit on the subscription page</a>)
				<HotlinkProgressBar used={transfer_used} total={transfer_cap}></HotlinkProgressBar>
			{/if}
		</div>

		<h3>Exports</h3>
		<div style="text-align: center;">
			<a href="/user/export/files" class="button">
				<i class="icon">list</i>
				Export uploaded files to CSV
			</a>
			<a href="/user/export/lists" class="button">
				<i class="icon">list</i>
				Export created lists to CSV
			</a>
		</div>

		<h2>Statistics</h2>
		<p>
			Here you can see how often your files are viewed, downloaded
			and how much bandwidth they consume. The buttons at the top
			can be pressed to adjust the timeframe. If you choose 'Day'
			the statistics will be updated periodically. No need to
			refresh the page.
		</p>
	</div>
	<div class="highlight_light">
		<button
			on:click={() => { update_graphs(1440, 1, true) }}
			class:button_highlight={graph_timespan == 1440}>
			Day (1m)
		</button>
		<button
			on:click={() => { update_graphs(10080, 10, false) }}
			class:button_highlight={graph_timespan == 10080}>
			Week (10m)
		</button>
		<button
			on:click={() => { update_graphs(20160, 60, false) }}
			class:button_highlight={graph_timespan == 20160}>
			Two Weeks (1h)
		</button>
		<button
			on:click={() => { update_graphs(43200, 1440, false) }}
			class:button_highlight={graph_timespan == 43200}>
			Month (1d)
		</button>
		<button
			on:click={() => { update_graphs(131400, 1440, false) }}
			class:button_highlight={graph_timespan == 131400}>
			Quarter (1d)
		</button>
		<button
			on:click={() => { update_graphs(525600, 1440, false) }}
			class:button_highlight={graph_timespan == 525600}>
			Year (1d)
		</button>
		<button
			on:click={() => { update_graphs(1051200, 1440, false) }}
			class:button_highlight={graph_timespan == 1051200}>
			Two Years (1d)
		</button>
		<br/>
		Total usage from {time_start} to {time_end}<br/>
		{formatThousands(total_views)} views,
		{formatThousands(total_downloads)} downloads,
		{formatDataVolume(total_bandwidth, 3)} bandwidth and
		{formatDataVolume(total_transfer_paid, 3)} paid transfers
	</div>
	<div class="limit_width">
		<h3>Premium transfers and total bandwidth usage</h3>
		<p>
			A premium transfer is when a file is downloaded using the data cap
			on your subscription plan. These can be files you downloaded from
			other people, or other people downloading your files if you have
			bandwidth sharing enabled. Bandwidth sharing can be changed on
			<a href="/user/subscription">the subscription page</a>.
		</p>
		<p>
			Total bandwidth usage is the combined bandwidth usage of all the
			files on your account. This includes paid transfers.
		</p>
	</div>
	<Chart bind:this={graph_bandwidth} data_type="bytes"/>
	<div class="limit_width">
		<h3>Views and downloads</h3>
		<p>
			A view is counted when someone visits the download page of one of
			your files. Views are unique per user per file.
		</p>
		<p>
			Downloads are counted when a user clicks the download button on one
			of your files. It does not matter whether the download is completed
			or not, only the start of the download is counted.
		</p>
	</div>
	<Chart bind:this={graph_views_downloads} data_type="number"/>
</div>
