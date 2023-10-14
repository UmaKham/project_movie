import {
    movies
} from './db.js'

let ul = document.querySelector('.promo__interactive-list')

let promo_bg = document.querySelector('.promo__bg')
let promo_genre = document.querySelector('.promo__genre')
let promo_title = document.querySelector('.promo__title')
let promo_descr = document.querySelector('.promo__descr')

let inp_search = document.querySelector('#search')
let genres = movies.map(item => item.Genre)
genres = ['All', ...new Set(genres)]
let genre_menu_list = document.querySelector('.promo__menu-list ul')

genre_promo_menu(genres)

function genre_promo_menu (arr) {
    genre_menu_list.innerHTML = ''
    
    for(let item of arr) {
        let li = document.createElement('li')
        let a = document.createElement('a')
        
        a.classList.add('promo__menu-item')
        a.innerHTML = item
        a.href = '#'

        genre_menu_list.append(li)
        li.append(a)

        if(arr.indexOf(item) === 0) a.classList.add('promo__menu-item_active')
        
        li.onclick = () => {
            let d = document.querySelector('.promo__menu-item_active')
            d.classList.remove('promo__menu-item_active')
            a.classList.add('promo__menu-item_active') 

            let genre_movie = movies.filter(movie => {
                if(item === movie.Genre) {
                    return movie;
                }
            })
        reload(genre_movie)
    }
}

}

genre_promo_menu(genres)

inp_search.onkeyup = () => {
    let val = inp_search.value.toLowerCase().trim()

    let filtered = movies.filter(item => {
        let title = item.Title.toLowerCase().trim()

        if(title.includes(val)) {
            return item
        }
    }) 

    reload(filtered)
}

reload(movies)

function reload(arr) {
    ul.innerHTML = ""

    changeMovie(arr[0])

    for (let item of arr) {
        let li = document.createElement('li')
        let del = document.createElement('div')

        li.classList.add('promo__interactive-item')
        del.classList.add('delete')

        li.innerHTML = item.Title

        li.append(del)
        ul.append(li)

        li.onclick = () => {
            changeMovie(item)
        }
    }
}

function changeMovie(item) {
    promo_bg.style.backgroundImage = `url(${item.Poster})`
    promo_genre.innerHTML = item.Genre
    promo_title.innerHTML = item.Title
    promo_descr.innerHTML = item.Plot
    
    let promo_rating = document.querySelector('.promo__ratings')
    let rating_source = document.createElement('span')
    let rating_value = document.createElement('span')
    promo_rating.innerHTML = ''
    promo_rating.append(rating_source, rating_value)
    rating_source.innerHTML = item.Ratings[0].Source
    rating_value.innerHTML = item.Ratings[0].Value
}