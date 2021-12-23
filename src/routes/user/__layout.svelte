<script>
import { page, session } from "$app/stores";
</script>

{#if $session.user}
<div class="page_content">
	<div class="tab_bar">
		<a class="button" href="/user" class:button_highlight={$page.path === "/user"}>
			<i class="icon">home</i>
			My home
		</a>
		<a class="button" href="/user/settings" class:button_highlight={$page.path === "/user/settings"}>
			<i class="icon">settings</i>
			Account settings
		</a>
		<a class="button" href="/user/api_keys" class:button_highlight={$page.path === "/user/api_keys"}>
			<i class="icon">vpn_key</i>
			API keys
		</a>
		<a class="button" href="/user/subscription" class:button_highlight={$page.path === "/user/subscription"}>
			<i class="icon">shopping_cart</i>
			Subscription
		</a>
		{#if $session.user.subscription.type !== "patreon"}
			<a class="button" href="/user/transactions" class:button_highlight={$page.path === "/user/transactions"}>
				<i class="icon">receipt_long</i>
				Transactions
			</a>
		{/if}
	</div>

	<slot></slot>
</div>
{/if}
