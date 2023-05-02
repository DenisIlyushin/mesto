# Проект: Место

## О проекте

Учебный проект, курс WEB-разработчик, спринт 8. 
[Яндекс.Практикум](https://practicum.yandex.ru/).

Проект посвящен вымышленному сервису **Mesto** - интерактивной странице, куда 
можно добавлять фотографии, удалять их и ставить лайки.

В рамках работы реализованы требования задания:
- добавлены классы `PopupWithForms`, `PopupWithForms`, `PopupWithImage`,
`Section` и `UserInfo` в код. Каждый из них выполняет свою задачу, согласно ТЗ. 
Всё, что относится к решению этой задачи, находится внутри класса. Классы слабо
связаны друг с другом, взаимодействие происходит через Callback-функции, 
передаваемые в экземпляр класса при инстанцировании.
- код разбит на модули, в проекте есть следующие файлы:
  1. `components\Card.js` с кодом класса Card,
  2. `components\FormValidator.js` с кодом класса FormValidator,
  3. `components\PopupWithForms.js` с кодом класса PopupWithForms,
  4. `components\PopupWithImage.js` с кодом класса PopupWithImage,
  5. `components\Popup.js` с кодом класса c родительским классом п. 4 и 5,
  6. `components\Section.js` с кодом класса Section,
  7. `components\Userinfo.js` с кодом класса UserInfo,
  8. `pages\index.js` с кодом обработки страницы `index.html`,
  9. `utils\constants.js` с переменными страницы `index.html`.
- Реализована сборка WebPack

## Технологии

- CSS, flex + grid
- JS
- HTML5
- Webpack

Изображения были оптимизированы с помощью:
- [TinyPNG](https://tinypng.com/) для растровых изображений в формате `.png`;
- [SVGOMG](https://jakearchibald.github.io/svgomg/) для векторых изображений 
в формате `.svg`.

## Нужные ссылки

**Figma**
[Ссылка на макет в Figma](https://www.figma.com/file/kRVLKwYG3d1HGLvh7JFWRT/JavaScript.-Sprint-6?node-id=0%3A1)

**Посмотреть онлайн**
[можно по ссылке](https://denisilyushin.github.io/mesto/)

---
### Автор проекта

Ден Илюшин ([DenisIlyushin](https://github.com/DenisIlyushin/))