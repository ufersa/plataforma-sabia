class BullMock {
	constructor() {
		this.reset();
	}

	reset() {
		this.spy = {
			calls: [],
			called: false,
			fail: null,
		};
	}

	call(...args) {
		const [funcName, ...rest] = args;
		this.spy.calls.push({ funcName, args: rest, fail: this.fail });
		this.spy.called = true;

		if (this.fail) {
			throw new Error(this.fail);
		}
	}

	makeFail(err) {
		this.fail = typeof err === 'string' ? err : 'error';
	}

	clearFail() {
		this.fail = null;
	}

	async add(...args) {
		this.call('add', ...args);
	}

	async schedule(...args) {
		this.call('schedule', ...args);
	}
}

module.exports = new BullMock();
