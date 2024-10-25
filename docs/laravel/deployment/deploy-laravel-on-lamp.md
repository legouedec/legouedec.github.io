---
outline: deep
---

# Deploy Laravel on LAMP

::: tip This tutorial was created on an Ubuntu droplet on DigitalOcean.
:::

::: details Table of Contents
[[toc]]
:::

Before starting, make sure that your domain, `example.com`, points to your server (A record in the DNS zone).

Connect to your server via SSH, either using the password chosen during droplet setup or with an SSH key pair where you provided the public key during setup.

```sh
ssh root@your_droplet_ip
```

### Create a User and Grant Sudo Permissions

```sh
adduser newuser
usermod -aG sudo newuser
```

### Add Swap Memory

::: tip Skip this step if your server has at least 1GB of RAM.
:::

If you chose a droplet with limited RAM (e.g., 512MB), the MySQL installation might fail. In this case, add swap memory by following this [tutorial](https://www.digitalocean.com/community/tutorials/how-to-add-swap-space-on-ubuntu-22-04){target="blank"} or using the summarized steps below:

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
vm.swappiness=10 // add at the bottom
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

Set permissions for the `/var/www/html` folder where sites will be installed:

```sh
sudo chown -R $USER:www-data /var/www/html
sudo chmod -R 2770 /var/www/html
```

::: warning Note
Giving both the user and group full permissions here is convenient for simplicity, but ideally, permissions should be as restrictive as possible.
:::

### Allow Apache in the Firewall

```sh
sudo ufw allow in "Apache"
```

At this point, you can access Apache’s default page at `http://your_server_ip`

### Install MySQL

Install and launch MySQL

```sh
sudo apt install mysql-server
sudo mysql
```

Set a root password

```sql
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
exit
```

Secure the installation

```sh
sudo mysql_secure_installation
sudo mysql -p
```

Create a New MySQL User

```sql
CREATE DATABASE example_database;
CREATE USER 'example_user'@'%' IDENTIFIED BY 'password';
GRANT ALL ON example_database.* TO 'example_user'@'%';
exit
```

### Install PHP, Required Dependencies, Composer, and Git

```sh
sudo apt install php libapache2-mod-php php-mysql php-mbstring php-cli
sudo apt install composer
sudo apt install git
```

### Install Your Application

Clone your site (or upload files via FTP)

```sh
git clone https://github.com/laravel/example /var/www/html/
```

Configure environment variables and install dependencies

```sh
cd /var/www/html/example
composer install
cp .env.example .env
nano .env
```

::: code-group

```txt[/var/www/html/example/.env]
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=example_database
DB_USERNAME=example_user
DB_PASSWORD=password
```

:::

### Enable Your Site in Apache

```sh
sudo nano /etc/apache2/sites-available/example.conf
```

::: code-group

```apache [/etc/apache2/sites-available/example.conf]
<VirtualHost *:80>
    ServerName your-custom-domain
    ServerAlias www.your-custom-domain
    DocumentRoot /var/www/html/example
    <Directory /var/www/html/example>
        AllowOverride all
    </Directory>
    ErrorLog ${APACHE_LOG_DIR}/error.log
    CustomLog ${APACHE_LOG_DIR}/access.log combined
</VirtualHost>
```

:::
Enable the site and reload Apache

```sh
sudo a2ensite example.conf
systemctl reload apache2
```
