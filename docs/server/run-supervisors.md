---
outline: deep
---

# Laravel Supervisors

::: tip This tutorial follows the [Laravel Deployment on LAMP](/laravel/deployment/deploy-laravel-on-lamp).  
:::  
::: details Table of Contents  
[[toc]]  
:::

### Installation

```sh
sudo apt update && sudo apt install supervisor
```

### Laravel Queue

Configure Supervisor to start a Laravel queue worker.

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

Start Supervisor with the following commands:

```sh
sudo supervisorctl reread
sudo supervisorctl update
sudo supervisorctl start example_com_laravel_queue_worker
```

### Reverb (WebSocket)

::: warning Warning
This step requires that [Reverb is installed and configured in your Laravel project](/laravel/websocket/reverb-websocket-on-lamp).
:::

Configure Supervisor to start the Reverb WebSocket server.

```sh
sudo nano /etc/supervisor/conf.d/example_com_laravel_reverb.conf
```

::: code-group

```txt[/etc/supervisor/conf.d/example_com_laravel_reverb.conf]
[program:example_com_laravel_reverb]
process_name=%(program_name)s
command=fuser -k 8080/tcp  # This line kills any process using port 8080
command=php /var/www/html/example_com/artisan reverb:start --sleep=3 --tries=3
autostart=true
autorestart=true
user=www-data
redirect_stderr=true
stdout_logfile=/var/log/example_com_laravel_reverb.log
```

:::

Start Supervisor with the following commands:

```sh
sudo supervisorctl reread
sudo supervisorctl update
sudo supervisorctl start example_com_laravel_reverb
```

### Verify Supervisor Status

Check Supervisor’s status and start it if necessary.

```sh
sudo systemctl status supervisor
sudo systemctl start supervisor
```
