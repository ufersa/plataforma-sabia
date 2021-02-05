// eslint-disable-next-line max-classes-per-file
class Resource$Data$Ga {
	constructor(context) {
		this.context = context;
	}

	async get() {
		return this.result;
	}

	set(technologies) {
		this.result = {
			data: {
				rows: [],
			},
		};
		this.result.data.rows = technologies.map((technology) => {
			return [`/t/${technology.slug}`, Math.floor(Math.random() * 500)];
		});
	}
}
class Resource$Data {
	constructor(context) {
		this.context = context;
		this.ga = new Resource$Data$Ga(this.context);
	}
}
class AnalyticsFakeService {
	constructor(options, google) {
		this.context = {
			_options: options || {},
			google,
		};
		this.data = new Resource$Data(this.context);
	}
}

module.exports = new AnalyticsFakeService();
