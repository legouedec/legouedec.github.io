---
outline: deep
---

# Install phpMyAdmin

::: tip  
This tutorial follows the [Laravel deployment on LAMP](/laravel/deployment/deploy-laravel-on-lamp).  
:::

::: details Table of Contents  
[[toc]]  
:::

## Install phpMyAdmin and Required PHP Packages

```sh
sudo apt install php-mbstring php-zip php-gd php-json php-curl phpmyadmin
sudo phpenmod mbstring
sudo rm -rf /usr/share/phpmyadmin/setup
```

::: warning Important  
During the installation, "apache2" is highlighted but not selected. Press SPACE to select Apache, or the installer won’t move necessary files.
:::

## Configure MySQL

If not already done, set a password for the root user and create a new user.

```sh
sudo mysql -p
ALTER USER 'root'@'localhost' IDENTIFIED BY 'password';
CREATE USER 'example_user'@'localhost' IDENTIFIED BY 'password';
```

To grant this new user full access to all databases:

```sh
GRANT ALL PRIVILEGES ON *.* TO 'example_user'@'localhost' WITH GRANT OPTION;
exit
```

You can now access phpMyAdmin via `http://your_server_ip/phpmyadmin` or `http://example.com/phpmyadmin` (if you have a configured domain name). Log in as `root` or `example_user`.

## Secure Access to phpMyAdmin

To add .htaccess authentication for phpMyAdmin, first edit the configuration file:

```sh
sudo nano /etc/apache2/conf-available/phpmyadmin.conf
```

::: code-group

```txt[/etc/apache2/conf-available/phpmyadmin.conf]
<Directory /usr/share/phpmyadmin>
    Options SymLinksIfOwnerMatch
    DirectoryIndex index.php
    AllowOverride All
    . . .
```

:::

Reload Apache to apply the changes:

```sh
sudo systemctl reload apache2
```

Then, set up .htaccess authentication:

```sh
sudo nano /usr/share/phpmyadmin/.htaccess
```

::: code-group

```txt[/usr/share/phpmyadmin/.htaccess]
AuthType Basic
AuthName "Restricted Files"
AuthUserFile /etc/phpmyadmin/.htpasswd
Require valid-user
```

:::

Create the authentication user and set a password:

```sh
sudo htpasswd -c /etc/phpmyadmin/.htpasswd example_phpmyadminuser
```

Enter the desired password. Now, when accessing phpMyAdmin, you’ll first need to authenticate with these credentials.

## Access phpMyAdmin only via a Subdomain

In the Apache configuration file, comment out the alias line for phpMyAdmin:

```sh
sudo nano /etc/apache2/conf-available/phpmyadmin.conf
```

::: code-group

```txt[/etc/apache2/conf-available/phpmyadmin.conf]
#Alias /phpmyadmin /usr/share/phpmyadmin  //comment out this line
    . . .
```

:::

Create a virtual host for the phpMyAdmin subdomain:

```sh
sudo nano /etc/apache2/sites-available/phpmyadmin_example_com.conf
```

::: code-group

```txt[/etc/apache2/sites-available/phpmyadmin_example_com.conf]
<VirtualHost *:80>
    ServerName phpmyadmin.example.com
    DocumentRoot /usr/share/phpmyadmin
</VirtualHost>
```

:::

Enable the site and obtain an SSL certificate:

```sh
sudo a2ensite phpmyadmin_example_com
sudo systemctl reload apache2
sudo certbot --apache
systemctl reload apache2
```

You can now access phpMyAdmin only via `https://phpmyadmin.example.com` with a secure connection.
