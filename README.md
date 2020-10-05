# CVLT

project based on:
- koa.js
- knex.js

## How to start the project

```bash
docker-compose up -d  піднімає проект(базу даних) на докері
docker-compose down зупинення своїх(це ті які описані вданому docker-compose.yml) запущених контейнерів
docker ps перегляд запущених контейнерів
docker stop $(docker ps -a -q) зупиняє всі запущені контейнери на даній операційній системі
docker rm f03289b6e6be4-наприклад  видаляє контейнер, використовувать при конфлікті контейнерів
node server.js  запускає проект
npm run start  запускає проект через скрипт який в package.json
так як ми встановили nodemon в проект а не глобально то запускаємо його node_modules/.bin/nodemon server.js
а якби глобально встановили(встановлено на рівні операційної системи) то nodemon server.js
npm run listen запускає nodemon через скрипт що в package.json
ctrl + c зупиняє проект, або інший процес 
```

## How to work with git

```bash
git init ініціалізація проекта в гіті
git status  перевірка статуса файлів
git add .  додать всі змінені файли (виділить потрібні змінені файли)
git add server.js  додати конкретний файл
git commit -m "message" загортає зміни(саме ті які ми виділили за допомогою git add) які треба запушить
git push -u origin master залиття зміни в віддалений репозиторій в вітку master.  -u потрібно тільки перший раз
git clone https://github.com/volodymyr-ilchuk/online-shop.git по https доступу клонує поточний проект і скачує
          git@github.com:volodymyr-ilchuk/online-shop.git по ssh доступу
git pull origin master стягує нові зміни (оновлення) з віддаленого репозиторія
git remote -v перевірка до якого URL ми підключені
git remote remove origin видаляє поточну URL
git remote add origin git@github.com:volodymyr-ilchuk/online-shop.git добавляє введену URL git@github.com:volodymyr-ilchuk/cvlt.git
```

## Install packages in project

```bash
npm init ініціалізація проекту
npm init -y ініціалізація проекту без заповнення
npm install knex установка пакету
npm install ставить всі пакети
npm install --save-dev eslint установка пакетів для розробки або
npm install -D eslint установка пакетів для розробки
```

## Work with migrations

```bash
npx knex migrate:make MigrationName  створення нової міграції
npx knex migrate:latest  запуск міграції на виконання
npx knex migrate:rollback  відкат останньї порції міграції
npx knex migrate:rollback --all  відкатує всі міграції 
npx knex seed:run запускає сіди(дані для розробки)
```

## SSH

```bash
ssh-keygen -t rsa генерація ssh ключів (щоб встановить зєднання з віддаленим сервером по протоколу ssh)
```

## Eslint

```bash
npx eslint . --fix фіксить помилкі eslint які може
```

## Cron

```bash
sudo crontab -e відкриває файл конфігурації крону (в консолі)
*/1 * * * * cd /home/pasha/volodia/projects/online-shop && /home/pasha/.nvm/versions/node/v10.18.0/bin/node commands/update-products-in-algolia.js >/var/log/mycron.log 2>&1   в конфігурації спочатку вводим періодичність запуску переходим в папку проекту і запускаємо наш скрипт прописуючи повний шлях до ноди і вказуємо шлях до логу результату виконання скрипта
which node вміє шукати шлях до прогами (де програма знаходиться)
sudo service cron status перевірка статусу будь якої програми на убунті яка робить в фоні
sudo touch /var/log/mycron.log створення файлу в консолі
sudo nano /var/log/mycron.log відкриття файлу в консолі
```

