---
outline: deep
---

# Installer phpMyAdmin

::: tip Ce tuto fait suite au [deploiement de Laravel sur LAMP](/fr/laravel/deployment/deploy-laravel-on-lamp).
:::
::: details Sommaire
[[toc]]
:::

Installez phpmyadmin et certains paquets PHP

```sh
sudo apt install php-mbstring php-zip php-gd php-json php-curl phpmyadmin
sudo phpenmod mbstring
sudo rm -rf /usr/share/phpmyadmin/setup
```

::: warning Avertissement
Lors de l'installation, « apache2 » est en surbrillance mais non sélectionné. Appuyez sur ESPACE pour le sélectionner, sinon les fichiers nécessaires ne seront pas déplacés.
:::

### Configurer MySQL

Si ce n'est pas déjà fait, configurez l’utilisateur root avec un mot de passe et créez un nouvel utilisateur

```sh
sudo mysql -p
ALTER USER 'root'@'localhost' IDENTIFIED BY 'password';
CREATE USER 'example_user'@'localhost' IDENTIFIED BY 'password';
```

Pour accorder à ce nouvel utilisateur tous les droits sur toutes les bases de données

```sh
GRANT ALL PRIVILEGES ON *.* TO 'example_user'@'localhost' WITH GRANT OPTION;
exit
```

Vous pouvez maintenant accéder à phpMyAdmin via `http://ip_de_votre_serveur/phpmyadmin` ou `http://example.com/phpmyadmin`(si vous avez un nom de domaine configuré). Connectez-vous en tant que `root` ou `example_user`.

### Sécuriser l'accès à phpMyAdmin

Modifiez le fichier de configuration de phpMyAdmin pour pouvoir ajouter une authentification .htaccess

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

```sh
sudo systemctl reload apache2
```

Configurez l'identification via .htaccess

```sh
sudo systemctl reload apache2
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

```sh
sudo htpasswd -c /etc/phpmyadmin/.htpasswd example_phpmyadminuser
```

Saisissez le mot de passe souhaité. Lors de l'accès à phpMyAdmin, vous devrez maintenant vous authentifier une première fois avec ces identifiants.

### Acceder phpMyAdmin via un sous-domaine

Dans le fichier de configuration d'Apache, commentez la ligne d'alias pour phpMyAdmin

```sh
sudo nano /etc/apache2/conf-available/phpmyadmin.conf

```

::: code-group

```txt[/etc/apache2/conf-available/phpmyadmin.conf]
#Alias /phpmyadmin /usr/share/phpmyadmin //commentez cette ligne
    . . .
```

:::
Créez un virtualhost pour le sous-domaine phpMyAdmin

```sh
sudo nano /etc/apache2/sites-available/phpmyadmin.example.com.conf

```

::: code-group

```txt[/etc/apache2/sites-available/phpmyadmin_example_com.conf]
<VirtualHost *:80>
    ServerName phpmyadmin.example.com
    DocumentRoot /usr/share/phpmyadmin
</VirtualHost>
```

:::
Activez le site et obtenez un certificat SSL

```sh
sudo a2ensite phpmyadmin_example_com
sudo systemctl reload apache2
sudo certbot --apache
systemctl reload apache2
```

Vous pouvez désormais accéder à phpMyAdmin uniquement via `https://phpmyadmin.example.com` avec une connexion sécurisée.
