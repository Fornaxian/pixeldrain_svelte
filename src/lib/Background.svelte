<script>
import { onMount } from "svelte";

onMount(() => {
	let now = new Date()
	let file = ""

	const MON = 1, TUE = 2, WED = 3, THU = 4, FRI = 5, SAT = 6, SUN = 0
	const JAN = 0, FEB = 1, MAR = 2, APR = 3, MAY = 4, JUN = 5, JUL = 6, AUG = 7, SEP = 8, OCT = 9, NOV = 10, DEC = 11

	if (now.getDay() === WED && Math.random() > 0.95) {
		file = "checker_wednesday"
	} else if (now.getMonth() === AUG && now.getDate() === 8) {
		file = "checker_dwarf"
	} else if (now.getMonth() === AUG && now.getDate() === 24) {
		file = "checker_developers"
	} else if (now.getMonth() === OCT && now.getDate() === 31) {
		file = "checker_halloween"
	} else if (now.getMonth() === DEC && (now.getDate() === 25 || now.getDate() === 26 || now.getDate() === 27)) {
		file = "checker_christmas"
	} else {
		file = "checker"+Math.floor(Math.random()*18)
	}

	document.documentElement.style.setProperty(
		"--background_pattern",
		"url('/img/background/"+file+".png')",
	)
})
</script>

<svelte:head>
	<style>
	html {
		--background_pattern: none;
	}
	body, .checkers {
		background-image: var(--background_pattern);
		background-color: #111111; /* Fallback */
		background-color: var(--layer_1_color);
		background-repeat: repeat;
		background-attachment: fixed;
		background-blend-mode: luminosity;
	}
	</style>
</svelte:head>
