class App{
    constructor(TV_SHOWS,main_container) {
        this.TV_SHOWS = TV_SHOWS;
        this.main_container = main_container;
        this.cntTime = [[]];
        this.checkWatched =[[[]]]
        this.start();
    }

start(){

    for (let i = 0; i < this.TV_SHOWS.length; i++) {
        this.cntTime[i] = new Array();
        this.checkWatched[i] = new Array();
        for(let j=0;j<this.TV_SHOWS[i].seasons.length;j++){
        // this.cntTime[i][j] = new Array();
        this.checkWatched[i][j] = new Array();}
    }
    // for (let i = 0; i < TV_SHOWS.length; i++) {
    //     this.checkWatched[i] = [];
    // }
    const self = this;
    TV_SHOWS.forEach((TvShow,indx)=> {
        // this.cntTime[indx]= new Array();
        // cntTime[indx][0]=0;
        const totalTimeShow = document.getElementById("totalTime");
        //-> Section for all webseries 
        const watchTimeKeeper = new WatchTimeKeeper(totalTimeShow)
        const webseries = new WebSeries(self.main_container, TvShow ,indx,self.cntTime,self.checkWatched,watchTimeKeeper);
    //seasons
    })
}
// var cntTime = [[]];
// var checkWatched = [[[]]]


}
const main_container = document.querySelector('section')
const app = new App(TV_SHOWS,main_container);



