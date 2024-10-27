---
outline: deep
---

# Installation

::: tip Ce tuto fait suite au [déploiement de Laravel sur LAMP](/fr/laravel/deployment/deploy-laravel-on-lamp).
:::
::: details Sommaire
[[toc]]
:::

### Installation

```sh
sudo apt update && sudo apt install supervisor
```

### File d'attente Laravel

Configurez Supervisor pour démarrer un worker de file d'attente

```sh
sudo nano /etc/supervisor/conf.d/example.com_laravel_queue_worker.conf
```

::: code-group

```txt[/etc/supervisor/conf.d/example_com_laravel_queue_worker.conf]
[program:example_com_laravel_queue_worker]
process_name=%(program_name)s
command=php /var/www/html/example_com/artisan queue:work --sleep=3 --tries=3
autostart=true
autorestart=true
user=www-data
redirect_stderr=true
stdout_logfile=/var/log/example_com_laravel_queue_worker.log
```

:::
Démarrer le supervisor

```sh
sudo supervisorctl reread
sudo supervisorctl update
sudo supervisorctl start example_com_laravel_queue_worker
```
