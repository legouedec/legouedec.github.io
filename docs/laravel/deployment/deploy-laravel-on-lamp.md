---
outline: deep
---

# Deploy Laravel on LAMP

::: tip This tutorial was created on an Ubuntu droplet on Digital Ocean.
:::
::: details Table of Contents
[[toc]]
:::

Before starting, make sure your domain (example.com) points to the server (A Record in the DNS zone).

Log in via SSH to the server using either the password chosen during droplet setup or an SSH key pair if you provided a public key during setup.

```sh
ssh root@droplet_ip
```

### Create a User and Grant Sudo Privileges

```sh
adduser newuser
usermod -aG sudo newuser
```

### Add Swap Memory

::: tip Skip this step if your server has at least 1 GB of RAM.
:::

If you chose a droplet with low RAM (512 MB), the MySQL server installation might fail. In that case, add swap memory by following this [tutorial](https://www.digitalocean.com/community/tutorials/how-to-add-swap-space-on-ubuntu-22-04){target="blank"}, summarized here:

```sh
su newuser
sudo fallocate -l 1G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
sudo cp /etc/fstab /etc/fstab.bak
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
sudo sysctl vm.swappiness=10
sudo nano /etc/sysctl.conf
```

::: code-group

```txt[/etc/sysctl.conf]
[...]
vm.swappiness=10 //at the very bottom
```

:::

### Install Apache

```sh
sudo apt update
sudo apt upgrade
sudo apt-get install apache2
```

Add the user to the `www-data` group

```sh
sudo usermod -aG www-data newuser
```

Set permissions on the `/var/www/html` folder where the files will be installed

```sh
sudo chown -R $USER:www-data /var/www/html
sudo chmod -R 2770 /var/www/html
```

::: warning Attention
Here, both the user and the group have full permissions for simplicity, but ideally, permissions should be as restricted as possible.
:::

Allow Apache in the firewall

```sh
sudo ufw allow in "Apache"
```

At this point, you should be able to access Apache’s default page at `http://your_server_ip`

### Install MySQL

Install and start MySQL

```sh
sudo apt install mysql-server
sudo mysql
```

Set a password for the root user

```sql
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
exit
```

Secure the installation

```sh
sudo mysql_secure_installation
sudo mysql -p
```

Create a database and a new MySQL user

```sql
CREATE DATABASE example_database;
CREATE USER 'example_user'@'%' IDENTIFIED BY 'password';
GRANT ALL ON example_database.* TO 'example_user'@'%';
exit
```

### Install PHP and Necessary Dependencies, Composer, and Git

```sh
sudo apt install php libapache2-mod-php php-mysql php-mbstring php-cli php-xml
sudo apt install composer
sudo apt install git
```

### Install Your Application

Clone your site (or upload files via FTP)

```sh
git clone https://github.com/laravel/example /var/www/html/
```

Set up environment variables

```sh
cd /var/www/html/example
cp .env.example .env
nano .env
```

::: code-group

```txt[/var/www/html/example/.env]
APP_NAME=example
APP_ENV=prod
APP_DEBUG=false
APP_URL=https://example.com

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=example_database
DB_USERNAME=example_user
DB_PASSWORD=password
```

:::
Install dependencies

```sh
composer install
```

### Run PHP Artisan

To configure your Laravel application, run the following commands to generate a secret key, perform the initial database migration, and optimize caches:

```sh
sudo php artisan key:generate
sudo php artisan migrate
sudo php artisan optimize
```

### Enable Your Site in Apache

Create the VirtualHost

```sh
sudo nano /etc/apache2/sites-available/example.conf
```

::: code-group

```apache [/etc/apache2/sites-availables/example.conf]
<VirtualHost *:80>
    ServerName example.com
    ServerAlias www.example.com
    DocumentRoot /var/www/html/example
    <Directory /var/www/html/example>
        AllowOverride all
    </Directory>
    ErrorLog ${APACHE_LOG_DIR}/error.log
    CustomLog ${APACHE_LOG_DIR}/access.log combined
</VirtualHost>
```

:::
Enable the rewrite mode and activate the site

```sh
sudo a2enmod rewrite
sudo a2dissite 000-default.conf
sudo a2ensite example.conf
systemctl reload apache2
```

### Enable SSL

Enable the SSL module and obtain an SSL certificate via Certbot

```sh
sudo a2enmod ssl
sudo apt install python3-certbot-apache
sudo certbot --apache
systemctl reload apache2
```

Congratulations, your site is now accessible at example.com
