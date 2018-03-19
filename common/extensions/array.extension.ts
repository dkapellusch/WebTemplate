interface Array < T > {
    range: (n : number) => Array < T >
}

interface ArrayConstructor {
    range : (n : number) => Array < any >
}

Array.constructor.prototype.range = Array.prototype.range = (n : number) => {
    return Array.from(Array(n).keys())
}