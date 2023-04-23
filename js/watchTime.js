class WatchTimeKeeper {
    constructor(totalTimeShow){
        this.totalTimeShow = totalTimeShow;
        // this.times = times;

        this.covertMin(0);
    }

    // callback of this function 
    covertMin(times) {
    // console.log(time);
    let time = 0;
    // this.times = times;
    for(let i=0;i<times.length;i++){
        for(let j=0;j<times[i].length;j++){
            if(times[i][j])
            time += times[i][j];
        }
    }
    let days = parseInt(time / (60 * 24));
    time %= (60 * 24)
    let hrs = parseInt(time / 60);
    time %= 60;
    let min = time;
    this.totalTimeShow.innerHTML = "";
    this.totalTimeShow.innerText = days + " days, " + hrs + " hours, " + min + " min ";
}
}