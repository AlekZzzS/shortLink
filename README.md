## shortLink
- Запустить программу npm start
- Сделан ui, переход осуществляется по роуту /ui(http://localhost:PORT/ui)
- Создание ссылки осуществляется post запросом на /shorten (http://localhost:3000/shorten), на вход дается два параметра customAlias -необязательный, fullUrl -обязательныйБ полная ссылка
- Методом get осуществляется переход на нужный url, http://localhost:3000/ <- здесь указываем либо alias, либо сокращенную ссылку полученный после post запроса
