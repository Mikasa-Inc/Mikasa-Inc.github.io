// Элементы DOM
const moodSelectionStep = document.getElementById('mood-selection-step');
const moodAudioStep = document.getElementById('mood-audio-step');
const bookAudioStep = document.getElementById('book-audio-step');
const feedbackStep = document.getElementById('feedback-step');
const thankYouStep = document.getElementById('thank-you-step');

const moodButtons = document.querySelectorAll('.mood-btn');
const moodAudio = document.getElementById('mood-audio');
const bookAudio = document.getElementById('book-audio');
const nextToBookBtn = document.getElementById('next-to-book');
const nextToFeedbackBtn = document.getElementById('next-to-feedback');
const submitFeedbackBtn = document.getElementById('submit-feedback');
const restartBtn = document.getElementById('restart');
const bookInfo = document.getElementById('book-info');
const moodProgress = document.getElementById('mood-progress');
const bookProgress = document.getElementById('book-progress');

// Аудиофайлы для разных настроений
const moodAudioFiles = {
    sad: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    happy: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    neutral: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3"
};

// Аудиофайлы и информация о книгах
const bookAudioFiles = {
    sad: {
        audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
        info: "Отрывок из 'Преступление и наказание' Ф.М. Достоевского"
    },
    happy: {
        audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
        info: "Отрывок из 'Три мушкетера' А. Дюма"
    },
    neutral: {
        audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
        info: "Отрывок из 'Мастер и Маргарита' М.А. Булгакова"
    }
};

// Текущее выбранное настроение
let currentMood = null;

// Обработчики событий для кнопок настроения
moodButtons.forEach(button => {
    button.addEventListener('click', () => {
        currentMood = button.getAttribute('data-mood');
        showMoodAudioStep();
    });
});

// Показать шаг с аудио настроения
function showMoodAudioStep() {
    moodSelectionStep.classList.add('hidden');
    moodAudioStep.classList.remove('hidden');

    // Установить соответствующий аудиофайл
    moodAudio.src = moodAudioFiles[currentMood];

    // Сбросить прогресс
    moodProgress.style.width = '0%';

    // Воспроизвести аудио
    moodAudio.play();
}

// Обработчик события для прогресса воспроизведения настроения
moodAudio.addEventListener('timeupdate', () => {
    const progress = (moodAudio.currentTime / moodAudio.duration) * 100;
    moodProgress.style.width = `${progress}%`;

    // Показать кнопку "Далее" когда аудио закончится
    if (progress >= 99.9) {
        nextToBookBtn.classList.remove('hidden');
    }
});

// Переход к шагу с книгой
nextToBookBtn.addEventListener('click', () => {
    moodAudioStep.classList.add('hidden');
    bookAudioStep.classList.remove('hidden');

    // Установить соответствующий аудиофайл книги
    bookAudio.src = bookAudioFiles[currentMood].audio;
    bookInfo.textContent = bookAudioFiles[currentMood].info;

    // Сбросить прогресс
    bookProgress.style.width = '0%';

    // Воспроизвести аудио
    bookAudio.play();
});

// Обработчик события для прогресса воспроизведения книги
bookAudio.addEventListener('timeupdate', () => {
    const progress = (bookAudio.currentTime / bookAudio.duration) * 100;
    bookProgress.style.width = `${progress}%`;

    // Показать кнопку "Далее" когда аудио закончится
    if (progress >= 99.9) {
        nextToFeedbackBtn.classList.remove('hidden');
    }
});

// Переход к шагу с обратной связью
nextToFeedbackBtn.addEventListener('click', () => {
    bookAudioStep.classList.add('hidden');
    feedbackStep.classList.remove('hidden');
});

// Отправка обратной связи
submitFeedbackBtn.addEventListener('click', () => {
    const feedbackText = document.getElementById('feedback-text').value;

    if (feedbackText.trim() === '') {
        alert('Пожалуйста, напишите ваши впечатления перед отправкой.');
        return;
    }

    // В реальном приложении здесь будет отправка данных на сервер
    console.log('Отзыв пользователя:', feedbackText);

    feedbackStep.classList.add('hidden');
    thankYouStep.classList.remove('hidden');
});

// Начать заново
restartBtn.addEventListener('click', () => {
    thankYouStep.classList.add('hidden');
    moodSelectionStep.classList.remove('hidden');

    // Сбросить форму
    document.getElementById('feedback-text').value = '';
    nextToBookBtn.classList.add('hidden');
    nextToFeedbackBtn.classList.add('hidden');

    // Остановить аудио
    moodAudio.pause();
    bookAudio.pause();
    moodAudio.currentTime = 0;
    bookAudio.currentTime = 0;
});