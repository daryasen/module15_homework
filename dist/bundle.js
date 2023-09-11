/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/scriptEditNew.js":
/*!******************************!*\
  !*** ./src/scriptEditNew.js ***!
  \******************************/
/***/ (() => {

    eval(" \n\n// создание селекта\n\nlet select = function() {\n    let selectHeader = document.querySelectorAll('.header-tabs_select-header');\n    let selectItem = document.querySelectorAll('.header-tabs_select-item');\n    let selectArrow = document.querySelector('.svg-arrow');\n\n    selectHeader.forEach(item => {\n        item.addEventListener('click', selectToggle); // переключаем класс .is-active у .header-tabs_select показывая .header-tabs_select-body.\n    });\n\n    selectItem.forEach(item => { //нажимаем на пункты .header-tabs_select-body и записываем в .header-tabs_select-current.\n        item.addEventListener('click', selectChoose);\n    });\n\n    function selectToggle() {     //переключает .is-active у родителя .header-tabs_select-header (т.е. у .header-tabs_select)\n        this.parentElement.classList.toggle('is-active'); // а .header-tabs_select имея чайлд .header-tabs_select-body, показывает его.\n};\n\n    function selectChoose() {\n        let text = this.innerText; //записываем в text пункт на который мы нажимаем\n        let select = this.closest('.header-tabs_select'); // возвращает ближайший родительский элемент (или сам элемент - .header-tabs_select)\n        let currentText = select.querySelector('.header-tabs_select-current'); // записываем то что у нас в .header-tabs_select-current\n        currentText.innerText = text; //записываем в .header-tabs_select-current то что у нас в text\n        select.classList.remove('is-active'); // убираем .is-active и .header-tabs_select-body пропадает\n\n        removeCheckMarkClass(); //убираем галочку\n        this.classList.add('check-mark'); // дабавляем галочку на выбранный пункт\n    };\n\n    function removeCheckMarkClass() {\n        selectItem.forEach(item => {\n        item.classList.remove('check-mark'); // удаляем класс .check-mark (убираем галочку)\n        });\n    };\n\n    selectArrow.addEventListener('click', function() {\n        this.classList.toggle('reverse-arrow'); // переварачиваем треугольник svg\n    });\n\n};\n\nselect(); \n\nfunction auto_grow(element) {     //увеличиваем размер поля ввода комментов\n    element.style.height = \"5px\";\n    element.style.height = (element.scrollHeight)+\"px\";\n};\n\n\n// счётчик символов коммента \n\nlet count = document.querySelector('.count-comment-body');\nlet message = document.querySelector('.text-long-message')\nlet textarea = document.querySelector('#comment-body');\nlet btn = document.querySelector('.button');\nlet limit = 1000;\n\nfunction validateTextarea() {\n     \n    textarea.addEventListener('input', () => {\n    let textlength = textarea.value.length;\n    count.innerText = `${textlength}/${limit}`;\n\n    if(textlength > limit) {\n        count.innerHTML = `${textlength}/${limit}`;\n        count.style.color = '#FF0000';\n\n        message.innerText = `Слишком длинное сообщение`\n        message.style.color = '#FF0000';\n\n        btn.style.backgroundColor = '#dbd7d7';\n        btn.style.color = '#918d8d';\n    }else if(textlength <= 0) {\n        count.innerHTML = `Макс. ${limit} символов`;  \n        count.style.color = '#918d8d';\n\n        btn.style.backgroundColor = '#dbd7d7';\n        btn.style.color = '#918d8d';\n    }else if(textlength <= limit) {\n        message.innerText ='';\n\n        count.style.color = '#918d8d';\n\n        btn.style.backgroundColor = '#ABD873';\n        btn.style.color = '#000000';\n    }else{\n        count.innerText = `Макс. ${limit} символов`;\n    }\n    });\n};\n\nvalidateTextarea();\n\n\n// создаём отправку, отображение и сохранение комментов\n\nlet comments = [];\nlet comAnswers = [];\nlet arrowAnswer = '';\nlet indexArrow = '';\nlet drawAnswer = '';\n\ndocument.getElementById('comment-send').onclick = function() {  \n    event.preventDefault();\n    let commentBody = document.getElementById('comment-body');\n\n    //answer должен быть массивом\n    let comment = {\n        answer: [],\n        body: commentBody.value,\n        time: Math.floor(Date.now() / 1000),\n        userSend: 'Максим Авдеенко',\n        photoSend: './images/Max.png',\n        like: false,\n        favoriteOff: 'В избранное',\n        ratingScore: 0\n    };\n\n        count.innerText = `Макс. ${limit} символов`;     // обнуляем при клике счётчик символов\n        btn.style.backgroundColor = '#dbd7d7';           // обнуляем стиль счётчика\n        commentBody.value = '';                          // очищаем поле\n        \n    if(comment.body.length != '' && comment.body.length <= limit) {\n        comments.push(comment);\n        showComments();\n        //тут тоже не нужно, ответов ещё не существует, так как комент новый\n        // answerContentDraw();\n        saveComments();\n        toggleHeart();\n        changeRating();\n        createAnswer();\n        submitAnswer();\n    } \n};\n\n\nfunction saveComments() {     \n    localStorage.setItem('comments', JSON.stringify(comments));                    // сохраняем в Local  \n};\n\nfunction localComments() {                                  // отображаем из Local\n    if(localStorage.getItem('comments')) {\n        comments = JSON.parse(localStorage.getItem('comments'));\n    }\n    //сначала рисуем\n    showComments();\n    //тут не нужна эта функция, вызывать будем в отрисовки ответа её\n    // answerContentDraw();\n    //после вызываем навешивание кликов на лайки(иначе ошибка будет)\n    toggleHeart();\n    changeRating();\n    createAnswer();\n    submitAnswer();\n    \n};\n\nlocalComments();    \n\nfunction showComments() {                                    // рисуем отправленный коммент\n    let resultComment = document.getElementById('result-comment');\n\n    //очистим, иначе комеенты будут складываться при перезаписи\n    resultComment.innerHTML = ''\n    //out теперь не общая, всегда будет перезаписываться\n    // let out = '';\n    //ниже вызываем paintHeart и рисуем оттуда нужное состояние лайка\n    comments.forEach(function(item, index) {\n        //её тут объявим\n        let out = '';\n        out += `<div class=\"image-alex-sent\"></div>`;\n        out += `<div class=\"user-sent\">${item.userSend}</div>`;\n        out += `<div class=\"text-date\">${timeConverter(item.time)}</div>`;\n        out += `<p class=\"text-sent\">${item.body}</p>`;\n        out += `<div class=\"toolbar-sent\">\n        \n                   <button class=\"button-bordernone btn-answer\" data-index-arrow=\"${index}\">\n                       <svg class=\"toolbar-sent_svg-answer\" width=\"24\" height=\"24\" viewBox=\"0 0 16 16\" xmlns=\"http://www.w3.org/2000/svg\">\n                           <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M8.004 2.98l-6.99 4.995 6.99 4.977V9.97c1.541-.097 2.921-.413 7.01 3.011-1.34-4.062-3.158-6.526-7.01-7.001v-3z\" fill=\"#918d8d\"></path>\n                       </svg>\n                   </button>\n                   \n                   <h3 class=\"toolbar-sent_text\">Ответить</h3>\n\n                   <div class=\"inFavorite ${item.like ? 'toggleHeart' : ''}\" data-index=\"${index}\">\n                        ${paintHeart(item.like)}\n                   </div>\n                   \n\n                   <div class=\"rating-plus\">\n                       <button class=\"button-bordernone rating btn__rating-plus\" data-index-change=\"${index}\">\n                           <svg width=\"20\" height=\"23\" viewBox=\"0 0 20 23\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                           <circle opacity=\"0.1\" cx=\"10\" cy=\"13\" r=\"10\" fill=\"black\"/>\n                           <path d=\"M9.13281 17.169V8.52699H10.8523V17.169H9.13281ZM5.67472 13.7045V11.9851H14.3168V13.7045H5.67472Z\" fill=\"#8AC540\"/>\n                           </svg>\n                       </button>\n                   </div>\n\n                   \n                   <h3 class=\"toolbar-sent_text-rating rating-text-${index}\">${item.ratingScore}</h3>\n                   \n\n                   <div class=\"rating-minus\">\n                       <button class=\"button-bordernone rating btn__rating-minus\" data-index-change=\"${index}\">\n                           <svg width=\"20\" height=\"23\" viewBox=\"0 0 20 23\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                           <circle opacity=\"0.1\" cx=\"10\" cy=\"13\" r=\"10\" fill=\"black\"/>\n                           <path d=\"M13.0696 11.6399V13.2955H7.26562V11.6399H13.0696Z\" fill=\"#FF0000\"/>\n                       </svg>\n                       </button>\n                   </div>\n\n\n                </div>\n\n                <div class=\"block-result-answer answer-field-${index}\"></div>\n               </div>`; \n       //и тут запишем\n        resultComment.innerHTML += out;\n        //как отрисовали ответ , то теперь имеем блок для отрисовки ответов\n        //вызываем функцию отрисовки и обязательно передаем индекс комента\n        answerContentDraw(index)\n    });\n    // resultComment.innerHTML = out;\n};\n\nfunction timeConverter(UNIX_timestamp) {\n    let a = new Date(UNIX_timestamp * 1000);\n    let months = ['01','02','03','04','05','06','07','08','09','10','11','12'];\n    let year = a.getFullYear();\n    let month = months[a.getMonth()];\n    let date = a.getDate();\n    let hour = a.getHours();\n    let min = a.getMinutes();\n    let sec = a.getSeconds();\n    let time = date + '.' + month + ' ' + hour + ':' + min;\n    return time;\n};\n\n    \n\n\n// вешаем клик на ЛАЙК \"В избранное\"\n\n\nfunction toggleHeart() {    \n    document.querySelectorAll('.inFavorite').forEach(function(item) {\n        item.addEventListener(\"click\", function(event) {\n            let favoriteBtn = event.target.closest('.inFavorite');\n            favoriteBtn.classList.toggle(\"toggleHeart\");\n            const index = favoriteBtn.getAttribute('data-index');\n\n            if(favoriteBtn.classList.contains(\"toggleHeart\")) {\n                //перерисрвываем верстку лайка передавая значение тру\n                favoriteBtn.innerHTML = paintHeart(true);\n                //тут перезаписываем значение лайка в нашем массиве\n                comments[index].like = true;\n            }else if(!favoriteBtn.classList.contains(\"toggleHeart\")){\n                //перерисрвываем верстку лайка передавая значение фолс\n                favoriteBtn.innerHTML = paintHeart(false);\n                //тут перезаписываем значение лайка в нашем массиве\n                comments[index].like = false;\n            };\n            //перезаписываем в локальном хранилище данные чтобы были актуальны\n            saveComments();\n        });\n    });\n};\n            \n//отрисовку в зависимости от Like в отдельную функцию, ею всегда и будем пользоваться\n\n\nfunction paintHeart(like){\n    let htmlHeart = ''; \n    if(like){   \n        htmlHeart = `<button class=\"button-bordernone\">\n            <svg class=\"toolbar-sent_svg-heartempty\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\">\n            <g opacity=\"0.4\">\n            <mask id=\"mask0_12_601\" style=\"mask-type:alpha\" maskUnits=\"userSpaceOnUse\" x=\"0\" y=\"0\" width=\"24\" height=\"24\">\n            <rect width=\"24\" height=\"24\" fill=\"url(#pattern0)\"/>\n            </mask>\n            <g mask=\"url(#mask0_12_601)\">\n            <rect x=\"-1.25\" width=\"29.5\" height=\"27.5\" fill=\"black\"/>\n            </g>\n            </g>\n            <defs>\n            <pattern id=\"pattern0\" patternContentUnits=\"objectBoundingBox\" width=\"1\" height=\"1\">\n            <use xlink:href=\"#image0_12_601\" transform=\"scale(0.0104167)\"/>\n            </pattern>\n            <image id=\"image0_12_601\" width=\"96\" height=\"96\" xlink:href=\"data:image/png;base64,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\"/>\n            </defs>\n            </svg>\n        </button>\n        <h3 class=\"toolbar-sent_text\">В избранном</h3>`;\n    }else{\n        htmlHeart = `<button class=\"button-bordernone\">\n            <svg  class=\"toolbar-sent_svg-heartempty\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\">\n            <mask id=\"mask0_3_291\" style=\"mask-type:alpha\" maskUnits=\"userSpaceOnUse\" x=\"0\" y=\"0\" width=\"24\" height=\"24\">\n            <rect width=\"24\" height=\"24\" fill=\"url(#pattern0)\"/>\n            </mask>\n            <g mask=\"url(#mask0_3_291)\">\n            <rect opacity=\"0.4\" x=\"2\" y=\"4\" width=\"21\" height=\"19\" fill=\"black\"/>\n            <path d=\"M3.5 9.00004C2.5 12.9999 8.83333 17.3333 12 20C20 14.4 21.1667 10.5001 20.5 9.00004C18.5 4.20004 13.8333 6.16667 12 8.00001C7 3.5 4.5 6.50002 3.5 9.00004Z\" fill=\"white\"/>\n            </g>\n            <defs>\n            <pattern id=\"pattern0\" patternContentUnits=\"objectBoundingBox\" width=\"1\" height=\"1\">\n            <use xlink:href=\"#image0_3_291\" transform=\"scale(0.0104167)\"/>\n            </pattern>\n            <image id=\"image0_3_291\" width=\"96\" height=\"96\" xlink:href=\"data:image/png;base64,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\"/>\n            </defs>\n            </svg>\n        </button>\n        <h3 class=\"toolbar-sent_text\">В избранное</h3>`;\n    };\n    return htmlHeart;\n};\n    \n\n// вешаем клики на РЕЙТИНГ \n\nfunction changeRating() {   \n    document.querySelectorAll('.rating').forEach(function(item) {\n        item.addEventListener(\"click\", function(event) {    \n            const btn = event.target.closest('.rating');\n            const indRat = btn.getAttribute('data-index-change');\n\n            if(btn.classList.contains('btn__rating-plus')){\n                comments[indRat].ratingScore++;\n            };\n            if(btn.classList.contains('btn__rating-minus')){\n                comments[indRat].ratingScore--;\n            };\n            document.querySelector(`.rating-text-${indRat}`).innerText = comments[indRat].ratingScore;\n            saveComments();\n        });\n    });\n};\n     \n\n// вешаем клик на ОТВЕТ\n\n        \nfunction createAnswer() {\n    document.querySelectorAll('.btn-answer').forEach(function(item){\n        item.addEventListener('click', function(event){\n            arrowAnswer = event.target.closest('.btn-answer');\n            indexArrow = arrowAnswer.getAttribute('data-index-arrow');\n            drawAnswer = document.querySelector(`.answer-field-${indexArrow}`); \n            drawAnswer.innerHTML =\n                `<form class=\"area-answer\">\n                    <input class=\"field-answer\" type=\"text\" size=\"40\" id=\"idAnswer\" placeholder=\"Введите ответ...\">\n                    <button class=\"submit-answer\" type=\"submit\" id=\"btnAnswer\">Ответить</button>\n                </form>`;\n\n                submitAnswer(indexArrow);\n                saveComments();\n        });\n    });\n    \n};\n    \n\n// снимаем submit с кнопки \"Ответить\" - preventDefault();\n\n\n\nfunction submitAnswer() {\n    document.querySelectorAll('.submit-answer').forEach(function(item){  \n        item.addEventListener('click', function(subm){\n            subm.preventDefault();\n            let answertBody = document.getElementById('idAnswer');\n\n            let comAnswer = {\n                bodyAnswer: answertBody.value,\n                timeAnswer: Math.floor(Date.now() / 1000),\n                userSendAnswer: 'Максим Авдеенко',\n                userAnswer: 'Джунбокс3000',\n                photoAnswer: './images/Jun.png',\n                likeAnswer: false,\n                favoriteOffAnswer: 'В избранное',\n                ratingScoreAnswer: 0,\n            };\n            //тут мы кладем ответ в нужный коммент по ключу indexArrow\n            //который мы передали в createAnswer сюда\n            comments[indexArrow].answer.push(comAnswer);\n            \n            //тут вы каждому ответу добавляете ответ на определенный коммент, так нельзя\n            // for(let i = 0; i < comments.length; i++){\n            //     comments[i].answer = comAnswers;\n            // };\n            //передаем обязательно индекс родителя\n            answerContentDraw(indexArrow);\n            saveComments();\n        });\n    });\n};\n\n//рисуем ответ\n\nfunction answerContentDraw(index) {\n    let outAnswer = '';\n    // drawAnswer тут получаем, мы знаем индекс родителя всегда\n    drawAnswer = document.querySelector(`.answer-field-${index}`); \n    //в answerComment клажем ответы нужного комментария\n    const answerComment = comments[index].answer\n    answerComment.forEach(function(item, index){\n      outAnswer += `<div class=\"image-jun-answer\"></div>\n                    <div class=\"user-answer\">${item.userAnswer}</div>\n                    <div class=\"arrow-answer\">\n                        <svg class=\"toolbar-sent_svg-answer\" width=\"24\" height=\"24\" viewBox=\"0 0 16 16\" xmlns=\"http://www.w3.org/2000/svg\">\n                               <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M8.004 2.98l-6.99 4.995 6.99 4.977V9.97c1.541-.097 2.921-.413 7.01 3.011-1.34-4.062-3.158-6.526-7.01-7.001v-3z\" fill=\"#918d8d\"></path>\n                        </svg>\n                    </div>\n                    <div class=\"post-sender-name\">${item.userSendAnswer}</div>\n                    <div class=\"text-date-answer\">${timeConverter(item.timeAnswer)}</div>\n                    <p class=\"text-send-answer\">${item.bodyAnswer}</p>\n                    <div class=\"inFavorite position-like-answer ${item.like ? 'toggleHeart' : ''}\" data-index=\"${index}\">\n                            ${paintHeart(item.like)}\n                    </div>\n                    <div class=\"rating-answer\">\n                        <div class=\"rating-plus\">\n                            <button class=\"button-bordernone rating btn__rating-plus\" data-index-change=\"${index}\">\n                                <svg width=\"20\" height=\"23\" viewBox=\"0 0 20 23\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                                <circle opacity=\"0.1\" cx=\"10\" cy=\"13\" r=\"10\" fill=\"black\"/>\n                                <path d=\"M9.13281 17.169V8.52699H10.8523V17.169H9.13281ZM5.67472 13.7045V11.9851H14.3168V13.7045H5.67472Z\" fill=\"#8AC540\"/>\n                                </svg>\n                            </button>\n                        </div>\n\n                       \n                        <h3 class=\"toolbar-sent_text-rating rating-text-${index}\">${item.ratingScoreAnswer}</h3>\n                       \n\n                        <div class=\"rating-minus\">\n                            <button class=\"button-bordernone rating btn__rating-minus\" data-index-change=\"${index}\">\n                                <svg width=\"20\" height=\"23\" viewBox=\"0 0 20 23\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                                <circle opacity=\"0.1\" cx=\"10\" cy=\"13\" r=\"10\" fill=\"black\"/>\n                                <path d=\"M13.0696 11.6399V13.2955H7.26562V11.6399H13.0696Z\" fill=\"#FF0000\"/>\n                            </svg>\n                            </button>\n                        </div>\n                    </div>    `;\n      \n    });\n    \n    drawAnswer.innerHTML = outAnswer;\n};\n\n\n//# sourceURL=webpack://system_of_comment_tp_oop/./src/scriptEditNew.js?");

    /***/ })
    
    /******/ 	});
    /************************************************************************/
    /******/ 	
    /******/ 	// startup
    /******/ 	// Load entry module and return exports
    /******/ 	// This entry module can't be inlined because the eval devtool is used.
    /******/ 	var __webpack_exports__ = {};
    /******/ 	__webpack_modules__["./src/scriptEditNew.js"]();
    /******/ 	
    /******/ })()
    ;