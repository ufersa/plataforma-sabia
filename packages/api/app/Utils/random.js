const random_6d = () => {
	const minm = 100000;
	const maxm = 999999;
	return Math.floor(Math.random() * (maxm - minm + 1)) + minm;
};

module.exports = {
	random_6d,
};
