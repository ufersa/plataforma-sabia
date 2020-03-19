module.exports = {
	webpack: config => {
		// Fixes npm packages that depend on `fs` module
		return {
			...config,
			node: {
				fs: "empty"
			}
		};
	}
};
