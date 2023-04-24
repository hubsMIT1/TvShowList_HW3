class Episode {
    constructor(season, index, indx, ind, seasons, all_episode_vis, visit, checkWatched, cntTime, watchTimeKeeper) {
        this.season = season
        this.index = index
        this.ind = ind
        this.indx = indx
        this.seasons = seasons
        this.all_episode_vis = all_episode_vis
        this.visit = visit
        this.checkWatched = checkWatched;
        this.cntTime = cntTime
        this.watchTimeKeeper = watchTimeKeeper
        console.log(checkWatched[this.indx].length)
        this.createEpisode()
    }
    createEpisode() {
        const self = this;
        console.log(this.visit.count)
      
        const season_list = document.createElement('div');
        // season_list.appendChild(movingDiv)
        season_list.className = 'seasons-list'
        const season_img = document.createElement('div')
        season_img.className = 'season-img'
        const season_show_img = document.createElement('img')
        season_show_img.alt = 'season-show-img'

        season_show_img.src = this.season.image
        // overlay image add after watched 
        const overlay = document.createElement('div')
        const overlaybox = document.createElement('div');
        const overlay_img = document.createElement('img');
        overlay_img.alt = "watched"
        const checkimg = '../images/check.png';

        overlay_img.src = checkimg
        overlay.className = `overlay`

        overlaybox.className = 'overlayb'
        overlay_img.className = 'overlay-img';
        console.log(this.indx, this.ind, this.index, this.checkWatched[this.indx].length)

        overlay.style.display = this.checkWatched[this.indx][this.ind][this.index] ? 'flex' : 'none';

        overlaybox.appendChild(overlay_img);
        overlay.appendChild(overlaybox)

        season_list.appendChild(season_img);
        season_img.appendChild(season_show_img);
        season_img.appendChild(overlay);

        const season_content = document.createElement('div')
        season_content.className = 'season-content'
        const season_title_content = document.createElement('div')
        season_title_content.className = 'season-title-content'
        // const chekbox_input = document.createElement('input');
        // chekbox_input.type = 'checkbox';
        // chekbox_input.checked = checkWatched[indx][ind][index]==undefined ? false: checkWatched[indx][ind][index];
        const epsd_title = document.createElement('h3')

        epsd_title.className = 'title';

        // const titleContainer = season_list
        const title = season_list

//here swipp code  to mark watched or unwatched
        let isDragging = false;
        let lastX = 0;
        let translateX = 0;
        let bgColor = "#fff";

        title.addEventListener("mousedown", e => {
            isDragging = true;
            lastX = e.clientX;
            title.style.cursor = "grabbing";
        });

        title.addEventListener("mousemove", e => {
            if (isDragging) {
                const deltaX = e.clientX - lastX;
                lastX = e.clientX;
                translateX += deltaX;
                title.style.transform = `translateX(${translateX}px)`;
                title.style.backgroundColor = bgColor;
            }
        });

        title.addEventListener("mouseup", e => {
            isDragging = false;
            title.style.cursor = "grab";
            if (translateX > 0) {
                // bgColor = "#ff0000";
                changeState('right')
            } else if (translateX < 0) {
                // bgColor = "#008000";
                changeState('left')
            } else {
                // bgColor = "#fff";
                changeState('')
            }
            changeState()
            title.style.backgroundColor = bgColor;
            title.style.transition = "transform 0.5s, background-color 0.5s";
            title.style.transform = "translateX(0)";
            translateX = 0;
        });

        title.addEventListener("mouseleave", e => {
            if (isDragging) {
                title.dispatchEvent(new Event("mouseup"));
            }
        });


        // self.countTime += parseInt(this.season.runtime)
        console.log("countine", self.visit.count)
        this.all_episode_vis.addEventListener("click", () => {
            console.log(this.indx, this.ind, this.index, this.checkWatched[this.indx].length)

            const ch = this.checkWatched[this.indx][this.ind][this.index];
            console.log(ch, self.visit.vis)

            const rumtime = parseInt(this.season.runtime)
            if (!ch) {
                if (this.cntTime[this.indx][this.ind] === undefined) this.cntTime[this.indx][this.ind] = 0 + rumtime
                else this.cntTime[this.indx][this.ind] += rumtime;
                this.checkWatched[this.indx][this.ind][this.index] = true;

            }
            else if (this.visit.vis && ch) {
                this.cntTime[this.indx][this.ind] -= rumtime;
                this.checkWatched[this.indx][this.ind][this.index] = false;
            }

            overlay.style.display = !ch || !this.visit.vis ? 'flex' : 'none';
            console.log(this.cntTime[this.indx][this.ind], self.visit.count)
            this.all_episode_vis.src = this.cntTime[this.indx][this.ind] === this.visit.count ? './images/eye-green.png' : './images/eye-gray.png';
            console.log(this.cntTime[this.indx][this.ind], self.visit.count)
           
             this.watchTimeKeeper.covertMin(this.cntTime);

        })
        this.all_episode_vis.src = this.cntTime[this.indx][this.ind] === self.visit.count ? './images/eye-green.png' : './images/eye-gray.png';
        // season_img.addEventListener('click', () =>{
        const changeState = (props) => {
            const ch = this.checkWatched[this.indx][this.ind][this.index];
            console.log(ch)
            if (!ch && props === 'right') {
                overlay.style.display = 'flex';
                if (this.cntTime[this.indx][this.ind] === undefined) this.cntTime[this.indx][this.ind] = 0;
                this.cntTime[this.indx][this.ind] += parseInt(this.season.runtime)
                this.checkWatched[this.indx][this.ind][this.index] = true;
                this.watchTimeKeeper.covertMin(this.cntTime);
            }
            else if (ch && props === 'left') {
                overlay.style.display = 'none';
                this.cntTime[this.indx][this.ind] ? this.cntTime[this.indx][this.ind] -= parseInt(this.season.runtime) : 0;
                this.checkWatched[this.indx][this.ind][this.index] = false;
                this.watchTimeKeeper.covertMin(this.cntTime);

            }
            console.log(this.cntTime[this.indx][this.ind], this.visit.count)
            if (this.cntTime[this.indx][this.ind] === this.visit.count) {
                this.all_episode_vis.src = '/images/eye-green.png';
            } else {
                this.all_episode_vis.src = '/images/eye-gray.png';
            }
        }
        epsd_title.innerText = "S" + (this.ind < 10 ? "0" : '') + (this.ind + 1) + "E" + (this.season.number < 10 ? '0' : '') + this.season.number + ": " + this.season.name

        // season_title_content.appendChild(chekbox_input)
        season_title_content.appendChild(epsd_title)
        season_content.appendChild(season_title_content)

        const season_date = document.createElement('time');
        season_date.className = 'season-date';
        season_date.innerText = this.season.airdate.replace(/-/g, '/');
        const season_summary = document.createElement('p')
        season_summary.classList = 'season-summary  season-summary-content'
        season_summary.innerText = this.season.summary;
        season_content.appendChild(season_date);
        season_content.appendChild(season_summary)
        season_list.appendChild(season_content)
        this.seasons.appendChild(season_list);
    }
}
