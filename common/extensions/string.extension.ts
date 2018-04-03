interface String {
    test: () => void;
}

String.prototype.test = function() {
    console.log("woo");
};