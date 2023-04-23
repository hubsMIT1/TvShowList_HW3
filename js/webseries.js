class WebSeries {
    constructor(main_container,TvShow,indx,cntTime,checkWatched,watchTimeKeeper){
        this.main_container = main_container;
        this.TvShow = TvShow;
        this.indx = indx;
        this.cntTime = cntTime
        this.checkWatched = checkWatched;
        this.watchTimeKeeper = watchTimeKeeper;
        this.countTime = 0;
        this.visi = false;
        this.visit = {count:0,vis:0}
        this.ind = 0;
        this.createShowSection();
    }
    createShowSection() {
        console.log(this.indx,this.cntTime);
        const container = document.createElement('div');
    container.className = 'show-list-box';
    const show_img_header = document.createElement('div');
    show_img_header.className = 'show-img-header'
    const show_img = document.createElement('img');
    show_img.className = 'show-img';

    show_img.src = this.TvShow.image;

    show_img.alt = "shows-header-img";
    show_img_header.appendChild(show_img);

    //-> selection of season (select tag)
    const select_opt = document.createElement('select');
    select_opt.className = 'select-opt';
    // select_opt.onChange = seasonFunction();
    const defaultOption = document.createElement('option');

    defaultOption.innerText = "Season"

    select_opt.appendChild(defaultOption)
    select_opt.selectedIndex = 0;
    defaultOption.disabled = true;

    //-> option for season in a webseries
    this.TvShow.seasons.forEach((season, index) => {
        const option = document.createElement('option');
        option.value = (parseInt(index) + 1);
        option.innerHTML = "Season " + (parseInt(index) + 1);
        select_opt.appendChild(option)
            this.checkWatched[this.indx][index] = new Array();
            // checkWatched[this.indx][index][index] = 0;
    })
    
    console.log(this.checkWatched[1].length)
    show_img_header.appendChild(select_opt);
    container.appendChild(show_img_header)
    
    //right side  
    // for title and summary of webseries 
    const show_content = document.createElement('div');
    show_content.className = 'show-content';
    const show_name_content = document.createElement('div')
    show_name_content.className = 'show-name-content';

    const show_name = document.createElement('h5');
    show_name.className = 'show-name';
    show_name.innerHTML = this.TvShow.name;
    const realeased_time = document.createElement('a')
    realeased_time.className = 'show-released-time';
    realeased_time.href = this.TvShow.officialSite;
    
    realeased_time.innerText = "Premiered at " + this.TvShow.channel + " on " + this.TvShow.premiered.replace(/-/g, '/') + "(" + this.TvShow.status + ")";
    
    show_name_content.appendChild(show_name);
    show_name_content.appendChild(realeased_time);
    show_content.appendChild(show_name_content)
    
    container.appendChild(show_content);

    const show_summary_content = document.createElement('div')
    show_summary_content.classname = 'show-summary-content'
    const show_summary = document.createElement('p');
    show_summary.className = 'show-summary';

    show_summary.innerHTML = this.TvShow.summary;
    
    show_summary_content.appendChild(show_summary);
    show_content.appendChild(show_summary_content)
    
    const show_genres = document.createElement('div');
    show_genres.classList = 'show-genres-content genres-list';
    //    console.log(show_genres)
    const genre_title = document.createElement('h3');
    genre_title.className = 'genre-title';
    genre_title.innerText = "Genres: "
    show_genres.appendChild(genre_title);
    
    //-> genres 
    this.TvShow.genres.forEach(genres => {
        const genre = document.createElement('li');
        genre.className = 'genre';
        genre.innerText = genres;
        show_genres.appendChild(genre)
    })
    
    show_content.appendChild(show_genres)
    this.main_container.appendChild(container);

    const seasons = document.createElement('div')
    seasons.className = 'seasons'
    console.log(this.indx)
    const self = this;
    select_opt.addEventListener("change", function () {
        // this.ind = select_opt
        const seasonns = new Season(seasons,self.visit,self.TvShow,self.indx,select_opt.value,self.cntTime,self.checkWatched,self.watchTimeKeeper)
        // const seasonns = new Season(seasons,show_content,this.TvShow,this.indx,select_opt,this.cntTime,this.checkWatched)
        show_content.appendChild(seasons)
    
    })
    }
}