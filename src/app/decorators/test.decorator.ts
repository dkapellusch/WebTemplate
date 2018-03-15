export  function test(target, key, descriptor): any {
	if (descriptor === undefined) {
		descriptor = Object.getOwnPropertyDescriptor(target, key);
	}
	console.log(descriptor);
	const originalMethod = descriptor.value;

	//editing the descriptor/value parameter
	descriptor.value = function() {
		const args = [];
		for (let _i = 0; _i < arguments.length; _i++) {
			args[_i - 0] = arguments[_i];
		}
		const a = args
			.map(function(a) {
				return JSON.stringify(a);
			})
			.join();
		// note usage of originalMethod here
		const result = originalMethod.apply(this, args);
		const r = JSON.stringify(result);
		console.log('Call: ' + key + '(' + a + ') => ' + r);
		return result;
	};

	// return edited descriptor as opposed to overwriting the descriptor
	return descriptor;
}
