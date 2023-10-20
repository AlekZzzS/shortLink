## shortLink
# Реализован сокращатель ссылок, использован Node.js, express, mongoose
# Скоращенная ссылка записывается в базу данных, mongoDB
- Запустить программу npm start
- Сделан ui, переход осуществляется по роуту / (http://localhost:3000/)
- Создание ссылки осуществляется post запросом на /shorten (http://localhost:3000/shorten), на вход дается два параметра customAlias - можно придумать свое название ссылки, fullUrl - полная ссылка
- Методом get осуществляется переход на нужный url, http://localhost:3000/ <- здесь указываем либо alias, либо сокращенную ссылку полученную после post запроса

