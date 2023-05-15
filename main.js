const API_KEY = '2386dbaf';

/*
 Обработчик события отправки формы поиска.
 Извлекает данные из формы и запускает поиск фильмов.
 */
document.getElementById('searchForm'), addEventListener('submit', async (e) => {
// Отменяем перезагрузку страницы.
    e.preventDefault()
// Получаем введённое значение.
    let title = document.getElementById('searchInput').value;
// Получаем выбранный тип.
    let type = document.getElementById('typeSelect').value;
// Выполняем поиск фильмов с первой страницы.
    await searchMovies(title, type, 1);
// Показываем кнопку закрытия после поиска.
    document.querySelector('.close').style.display = 'block';
})


/**
 * Обработчики событий для закрытия модального окна.
 */
// Получаем элементы модального окна и кнопку закрытия
const modal = document.getElementById('movieDetailsModal');
const span = document.querySelector('.close');

// Закрываем модальное окно при клике на кнопку закрытия
span.onclick = () => {
    modal.style.display = "none";
};

// Закрываем модальное окно при клике вне его области
window.onclick = (event) => {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};

// Скрываем кнопку закрытия при загрузке страницы
window.onload = () => {
    document.querySelector('.close').style.display = 'none';
};

/*
  Функция для поиска фильмов по заданным параметрам.
  Выполняет запрос и обрабатывает полученные данные.
 */
const searchMovies = async (title, type, page) => {
    try {
        const response = await fetch(`http://www.omdbapi.com/?s=${title}&type=${type}&page=${page}&apikey=${API_KEY}`);
        const data = await response.json();
// Если API вернул ошибку, выводим сообщение об ошибке и очищаем пагинацию
        if (data.Response === 'False') {
            let moviesList = document.getElementById('moviesList');
            moviesList.innerHTML = `<p class='error'>${data.Error}</p>`;
            document.getElementById('pagination').innerHTML = '';
        }
// Если API вернул список фильмов, отображаем фильмы на странице и пагинацию
        else {
            displayMovies(data.Search);
            displayPagination(data.totalResults, title, type, page);
        }
    }
// Выводим ошибку в консоль, если запрос к API не удался
    catch (error) {
        console.error(error);
    }
};

/*
  Функция для отображения списка фильмов на странице.
  Использует шаблон Handlebars для форматирования информации о фильме.
 */
const displayMovies = (movies) => {
    let moviesList = document.getElementById('moviesList');
    moviesList.innerHTML = '';
    movies.forEach(movie => {

// Изображение по умолчанию
        movie.poster = movie.Poster !== "N/A" ? movie.Poster : defaultPoster;

        let movieItem = document.createElement('div');
        movieItem.classList.add('movieItem')
// Используем шаблон Handlebars для форматирования информации о фильме.
        movieItem.innerHTML = movieTemplate(movie);
        moviesList.appendChild(movieItem);
    });
};

/*
  Функция для отображения пагинации.
  Создает кнопки для перехода по страницам.
 */
const displayPagination = (totalResults, title, type, currentPage) => {
    let pagination = document.getElementById('pagination');
    pagination.innerHTML = '';
    let pages = Math.ceil(totalResults / 10);
    let startPage = Math.max(currentPage - 2, 1);
    let endPage = Math.min(startPage + 4, pages);
// Удаление активных классов со всех кнопок
    Array.from(pagination.getElementsByTagName('button')).forEach(button => {
        button.classList.remove('active');
    });
// Создание кнопки "Предыдущая страница".
    if (currentPage > 1) {
        let prevButton = document.createElement('button');
        prevButton.classList.add('btnPrev');
        prevButton.innerText = '<';
        prevButton.addEventListener('click', async () => {
            await searchMovies(title, type, currentPage - 1);
        });
        pagination.appendChild(prevButton);
    }
// Создание кнопок с номерами страниц.
    for (let i = startPage; i <= endPage; i++) {
        let pageButton = document.createElement('button');
        pageButton.classList.add('btnNum');
        pageButton.innerText = i;
        // Добавление активного класса к кнопке текущей страницы.
        if (i === currentPage) {
            pageButton.classList.add('active');
        }
        pageButton.addEventListener('click', async () => {
            await searchMovies(title, type, i);
        });
        pagination.appendChild(pageButton);
    }
// Создание кнопки "Следующая страница".
    if (currentPage < pages) {
        let nextButton = document.createElement('button');
        nextButton.classList.add('btnNext');
        nextButton.innerHTML = '>';
        nextButton.addEventListener('click', async () => {
            await searchMovies(title, type, currentPage + 1);
        });
        pagination.appendChild(nextButton);
    }
};

/*
  Функция для получения подробной информации о фильме.
  Обрабатывает полученные данные и отображает модальное окно с информацией о фильме.
 */
const getMovieDetails = async (id) => {
// Выполняем запрос к API для получения информации о фильме
    try {
        const response = await fetch(`http://www.omdbapi.com/?i=${id}&apikey=${API_KEY}`);
        const data = await response.json();
// Изображение по умолчанию
        data.poster = data.Poster !== "N/A" ? data.Poster : defaultPoster;
// Используем шаблон Handlebars для форматирования информации о фильме
        let movieDetails = document.getElementById('movieDetails');
        movieDetails.innerHTML = movieDetailsTemplate(data);
// Показываем модальное окно с информацией о фильме
        modal.style.display = 'block';
    }
// Выводим ошибку в консоль, если запрос к API не удался
    catch (error){
        console.error(error);
    }
}

