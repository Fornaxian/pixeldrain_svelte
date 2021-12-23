export const getSession = async req => {
	let resp = await fetch(
		"https://pixeldrain.com/api/user",
		{
			headers: {
				"Cookie": req.headers["cookie"],
				"User-Agent": req.headers["user-agent"],
			}
		}
	)

	if (resp.status >= 400) {
		return { user: null }
	}

	return {
		user: await resp.json()
	}
}
