---
outline: deep
---

# Déployez Laravel sur LAMP

::: tip Ce tuto a été réalisé sur un droplet Ubuntu sur Digital Ocean.
:::
::: details Sommaire
[[toc]]
:::

Avant de commencer, assurez vous que votre domaine example.com pointe vers le serveur (Balise A dans la zone DNS).

Connectez-vous en SSH au serveur soit grace au mot de passe choisi pendant la configuration du droplet, soit grâce à une paire de clé SSH dont vous aurez fourni la clé publique pendant la configuration.

```sh
ssh root@ip_du_droplet
```

### Creez un utilisateur et donnez lui les droits sudo

```sh
adduser newuser
usermod -aG sudo newuser
```

### Ajoutez de la swap

::: tip Passez cette étape si votre serveur a au moins 1Go de ram
:::

Si vous avez pris un droplet avec peu de Ram (512Mo), l'installation de mysql-server risque de planter, dans ce cas, je vous invite à ajouter de la mémoire SWAP en suivant ce [tutoriel](https://www.digitalocean.com/community/tutorials/how-to-add-swap-space-on-ubuntu-22-04){target="blank"} dont voici un résumé :

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
vm.swappiness=10 //tout en bas
```

:::

### Installez Apache

```sh
sudo apt update
sudo apt upgrade
sudo apt-get install apache2
```

Mettez l'utilisateur dans le groupe `www-data`

```sh
sudo usermod -aG www-data newuser
```

Gérez les permissions sur le dossier `/var/www/html` où seront installés les

```sh
sudo chown -R $USER:www-data /var/www/html
sudo chmod -R 2770 /var/www/html
```

::: warning Attention
Ici l'utilisateur et le groupe ont tous les droits pour simplifier mais dans l'idéal il faudrait restreindre autant que possible
:::

### Autoriser Apache dans le part-feu

```sh
sudo ufw allow in "Apache"
```

A ce stade, vous pouvez accéder à la page par défault de Apache à l'adresse `http://ip_de_votre_serveur`

### Installer MySQL

Installez puis executer MySQL

```sh
sudo apt install mysql-server
sudo mysql
```

Mettez un mot de passe à l'utilisateur root

```sql
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
exit
```

Sécurisez l'installation

```sh
sudo mysql_secure_installation
sudo mysql -p
```

Créez une base de données et un nouvel utilisateur MySQL

```sql
CREATE DATABASE example_database;
CREATE USER 'example_user'@'%' IDENTIFIED BY 'password';
GRANT ALL ON example_database.\* TO 'example_user'@'%';
exit
```

### Installez PHP et les dépendances nécessaires, Composer et Git

```sh
sudo apt install php libapache2-mod-php php-mysql php-mbstring php-cli
sudo apt install composer
sudo apt install git
```

### Installez votre application

Clonez votre site (ou copiez les fichiers via FTP)

```sh
git clone https://github.com/laravel/example /var/www/html/
```

Configurez les variables d'environnement et installez les dépendances

```sh
cd var/www/html/example
composer install
cp .env.example .env
nano .env
```

::: code-group

```txt[/var/www/html/example/.env]
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=database_example
DB_USERNAME=user_example
DB_PASSWORD=password
```

:::

### Activer votre site dans Apache

```sh
sudo nano /etc/apache2/sites-available/example.conf
```

::: code-group

```apache [/etc/apache2/sites-availables/example.conf]
<VirtualHost \*:80>
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
Activez le site et relancez Apache

```sh
sudo a2ensite example.conf
systemctl reload apache2
```
