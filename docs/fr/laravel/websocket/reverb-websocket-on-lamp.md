---
outline: deep
---

# Configurer Reverb sur LAMP

::: tip Ce tuto requiert [une app laravel qui utilise Reverb](/fr/laravel/websocket/laravel-chat-app-with-reverb) et qui soit [déployée sur lamp](/fr/laravel/deployment/deploy-laravel-on-lamp).
:::
::: details Sommaire
[[toc]]
:::

### Modifier le fichier .env

```sh
sudo nano /var/www/html/example_com
```

::: code-group

```env[/var/www/html/example_com/.env]
REVERB_HOST=0.0.0.0
REVERB_PORT=8080
REVERB_SCHEME=http

VITE_REVERB_HOST=example.com
VITE_REVERB_PORT=443
VITE_REVERB_SCHEME=https
```

:::

### Autoriser le port 8080 dans le pare feu

```sh
sudo ufw enable 8080
```

### Modifier le VirtualHost

Si nécessaire supprimez, /etc/apache2/site-available-le-ssl.conf généré automatiquement par certbot

```sh
sudo rm /etc/apache2/site-available/example_com-le-ssl.conf
sudo nano /etc/apache2/site-available/example_com
```

::: code-group

```txt[/etc/apache2/site-available/example_com]
<VirtualHost *:80>
   ServerName example.com
   ServerAlias www.example.com
   DocumentRoot /var/www/html/example_com/public
   <Directory /var/www/html/example_com/>
      AllowOverride All
   </Directory>
   ErrorLog ${APACHE_LOG_DIR}/error.log
   CustomLog ${APACHE_LOG_DIR}/access.log combined
   ProxyPass /app http://0.0.0.0:8080/app upgrade=websocket
</VirtualHost>
```

:::

### Regénérer le certificat SSL

```sh
sudo certbot --apache
systemctl reload apache2
```

### Configurer Supervisor

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

Ca y est tout est prêt!
