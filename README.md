Ознайомтесь з інструкцією по користуванню:

    В першу чергу необхідно виконати міграцію БД MySql за допомогою скріпта "sudo npm run initDB / sudo yarn run initDB";
    Якщо у вас стоїть пароль на БД:
        Його необхідно вказати у файлі .env(знаходиться в корені проекту) поле DB_ROOT_PASS = "ваш пароль";
        Пункт 3. пропустити!
    Якщо пароль на БД відсутній:
        Потрібно перейти в папку config/default.js та закоментувати поле - //"password": `${process.env.DB_ROOT_PASS}`;
        Пункт 2. пропустити!
    Щоб записати шлях до БД:
        Потрібно перейти за посиланням save path to database;
        У форму ввести шлях;
    Вивести дерево папок та файлів:
        Потрібно перейти за посиланням show path tree;
    Стерти всі дані з таблиць БД:
        Потрібно перейти за посиланням erase data in DB;
