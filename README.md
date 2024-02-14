# Authentification JWT


Il s'agit ici de présenter l'authentification à l'aide de JWT.

Installer les modules&nbsp;:
```bash
$ npm install
```

Lancer le serveur *MongoDb*&nbsp;:
```bash
$ mongodb --dbpath dbdata
```

Lancer le serveur HTTP&nbsp;:
```bash
$ nodemon
```
ou
```bash
$ npm run start
```

On peut ensuite explorer :
 * `http://localhost:3000/about` pour une ressource accessible librement
 * `http://localhost:3000/` qui, comme les autres ressources, est soumise au contrôle d'accès et redirige donc vers `http://localhost:3000/access/login`.
 * Il faudra commencer par créer un utilisateur : `http://localhost:3000/access/register`
 * Une fois authentifié, l'utilisateur a accès à ses informations (limitées à son nom) et peut les mettre à jour (bouton *update*). Les authentifications sont valides 60 secondes, après ce délai il faudra s'authentifier à nouveau. 
 * La création d'un utilisateur par le bouton *Register as admin* donnera, une fois authentifié, accès à `http://localhost:3000/adminonly` qui reste inaccessible aux autres utilisateurs authentifiés
