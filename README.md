# МАСШТАБИРУЕМЫЙ МНОГОПОЛЬЗОВАТЕЛЬСКИЙ ЧАТ НА SOCKET.IO И REDIS

## Используемые NPM пакеты 

- [cors](https://www.npmjs.com/package/cors) (^2.8.5)
- [debug](https://www.npmjs.com/package/debug) (~2.6.9)
- [express](https://www.npmjs.com/package/express) (~4.16.1)
- [http-errors](https://www.npmjs.com/package/http-errors) (~1.6.3)
- [morgan](https://www.npmjs.com/package/morgan) (~1.9.1)
- [redis](https://www.npmjs.com/package/redis) (^4.6.13)
- [socket.io](https://www.npmjs.com/package/socket.io) (^4.7.4)

## Docker

Приложение контейниризовано с помощью Docker. Включает в себя контейнер Redis и контейнер Socket.IO.

## Установка Docker

### Для Windows:

1. Скачайте установочный файл Docker Desktop для Windows с официального сайта: [Docker Desktop for Windows](https://hub.docker.com/editions/community/docker-ce-desktop-windows).

2. Запустите установочный файл и следуйте инструкциям мастера установки.

3. После завершения установки, запустите Docker Desktop.

### Для macOS:

1. Скачайте установочный файл Docker Desktop для macOS с официального сайта: [Docker Desktop for Mac](https://hub.docker.com/editions/community/docker-ce-desktop-mac).

2. Установите Docker Desktop, перетащив значок в папку "Приложения".

3. Запустите Docker Desktop из папки "Приложения".

### Для Linux:

1. Установите Docker Engine с помощью команды:
sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io

2. После установки, запустите службу Docker:
sudo systemctl start docker

3. Добавьте своего пользователя в группу docker, чтобы избежать использования sudo при работе с Docker:
sudo usermod -aG docker $USER

4. Выполните выход и повторно войдите в систему.

После выполнения этих шагов Docker должен быть успешно установлен на вашем компьютере.

### Redis

Приложение использует Redis в качестве хранилища данных для кэширования и других функций.

### Socket.IO

Socket.IO используется для обмена данными в реальном времени между сервером и клиентами.
