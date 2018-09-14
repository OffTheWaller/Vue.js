function Timer () {
    this.id = 1;

    var _this = this;
    setTimeout(function () {
        console.log(this.id); //undefined
        console.log(_this.id); //1
    }, 1000);

    setTimeout(() => {
        console.log(this.id); //1
    }, 5000);
}
Timer();