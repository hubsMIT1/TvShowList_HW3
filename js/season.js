class Season {

    constructor(seasons, visit, TvShow, indx, select_opt, cntTime, checkWatched, watchTimeKeeper) {
        this.seasons = seasons;
        // this.show_content = show_content;
        this.TvShow = TvShow;
        this.indx = indx;
        this.select_opt = select_opt;
        this.cntTime = cntTime;
        this.checkWatched = checkWatched;
        this.visit = visit;
        this.watchTimeKeeper = watchTimeKeeper
        // console.log(this.select_opt.value)
        this.createSeasonContainer();
    }


    createSeasonContainer() {
        const self = this;
        // console.log(self.select_opt,self.indx,self.cntTime)
        document.querySelector('.show-time-spent').style.display = 'flex';

        // this.countTime = 0;
        self.visit.count = 0;
        // console.log(self.visit.count)
        let ind = this.select_opt - 1;
        // console.log(typeof ind,self.indx)
        self.seasons.innerHTML = "";
        const selected_sesaon = document.createElement('h3');
        selected_sesaon.className = 'selecetd-season-title'
        const season_checkbox = document.createElement('div')
        season_checkbox.className = 'season-checkbox'
        const all_seasons_checkbox = document.createElement('img')//document.createElement('input')

        all_seasons_checkbox.alt = 'eye-img'
        all_seasons_checkbox.className = 'eye-img'
        // console.log(this.cntTime[this.indx][ind])
        all_seasons_checkbox.src = self.cntTime[self.indx][ind] === self.visit.count ? '../images/eye-green.png' : '../images/eye-gray.png';

        // all_seasons_checkbox.name = 'all-seasons'

        const checkbox_label = document.createElement('label')
        checkbox_label.className = 'checkbox-title';
        checkbox_label.innerText = "Marcos";
        selected_sesaon.innerText = "Season " + this.select_opt
        this.seasons.appendChild(selected_sesaon);
        this.seasons.appendChild(season_checkbox)
        season_checkbox.appendChild(all_seasons_checkbox)
        season_checkbox.appendChild(checkbox_label);

        // on changing todos checkbox
        // this.visi = false;
        all_seasons_checkbox.addEventListener("click", () => {
            // console.log("af;asd;flaksd;lfjaslf",ind,self.cntTime[self.indx][ind])
            if (self.cntTime[self.indx][ind] === self.visit.count) self.visit.vis = 1;
            else self.visit.vis = false;
            // console.log(self.visit.count,self.visit.vis,"souvis")
        })
        // console.log(ind)
        this.TvShow.seasons[ind].forEach((season, index) => {
            // console.log(self.indx)
            self.visit.count += parseInt(season.runtime)

            // console.log(self.visit.count)
            const episode = new Episode(season, index, self.indx, ind, self.seasons, all_seasons_checkbox, self.visit, self.checkWatched, self.cntTime, self.watchTimeKeeper);

        })

    }
}