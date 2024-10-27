---
outline: deep
---

# Supervisor pour Laravel

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

### Reverb (Websocket)

::: warning Avertissement
Cette étape nécéssite d'avoir [installé Reverb dans votre projet, et de l'avoir configuré](/fr/laravel/websocket/reverb-websocket-on-lamp).
:::
Configurez Supervisor pour démarrer Reverb

```sh
sudo nano /etc/supervisor/conf.d/example_com_laravel_reverb.conf
```

::: code-group

```txt[/etc/supervisor/conf.d/example_com_laravel_reverb.conf]
[program:example_com_laravel_reverb]
process_name=%(program_name)s
command=fuser -k 8080/tcp # Cette ligne tue les processus qui utilisent le port 8080
command=php /var/www/html/example.com/artisan reverb:start --sleep=3 --tries=3
autostart=true
autorestart=true
user=www-data
redirect_stderr=true
stdout_logfile=/var/log/example_com_laravel_reverb.log
```

:::
Démarrer le supervisor

```sh
sudo supervisorctl reread
sudo supervisorctl update
sudo supervisorctl start example_com_laravel_reverb
```

Vérifier l'état de Supervisor et démarrer le si nécessaire

```sh
sudo systemctl status supervisor
sudo systemctl start supervisor
```
