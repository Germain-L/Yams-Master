
# Atelier Yams Master Projet - Architecture Applicative

## Introduction

Le Yam Master est un jeu pour deux joueurs avec 5 dés au tour par tour.

À son tour, un joueur peut lancer les dés à trois reprises, afin de réaliser une des combinaisons présentes sur le plateau.

Après chaque lancer, il peut écarter autant de dés qu’il le souhaite et relancer les autres. Tout dé écarté peut être relancé dans les jets suivants.

Les combinaisons réalisables sont les suivantes :
-  Brelan : trois dés identiques (ex. : case “2“ : réalisation de trois “2“ )
-  Full : un brelan et une paire
-  Carré : quatre dés identiques
-  Yam : cinq dés identiques
-  Suite : combinaisons 1, 2, 3, 4, 5 ou 2, 3, 4, 5, 6
-  ≤8 : la somme des dés ne doit pas excéder 8
-  Sec : une des combinaisons ci-dessus, sauf le brelan, dès le premier lancer
-  Défi : avant le deuxième lancer, le joueur relève un défi.

Au cours des deux lancers suivants, il doit impérativement réaliser une des combinaisons ci-dessus (sauf le brelan). Il n’a pas besoin de s’engager sur une combinaison précise.

A noter que les dés peuvent former plusieurs combinaisons simultanément (ex : un Yam est aussi un brelan, un carré, un full) parmi lesquelles le joueur choisit une combinaison.

Dès qu’un joueur réussit une combinaison, il peut (s’il le souhaite) poser un pion sur une des cases libres du plateau correspondant à sa combinaison.

À tout moment, il est possible d’utiliser le Yam Predator : faire un Yam pour retirer n’importe quel pion adverse au lieu d’en poser un des siens.


## Développement (standard)

### **Conditions préalables**

-   Node.js v20.11.1
-   Socket.io v4.3.1 => serveur de websocket 
-   Express v4.19.2 => serveur d'authentification
-   MongoDB v7.2

### Build
#### Prérequis

Démarrer et bien suivre les README des micros-services : 
- websocket-server
- auth-server

#### Créez votre application Manuellement

Installation des dépendances

```bash
npm install
```

#### Development

Créez un fichier .env à la racine du projet et complétez la variable d'environnement suivante en remplaçant les valeurs entre les chevrons par les informations de connexion à votre base de données MongoDB:

```dotenv
EXPO_PUBLIC_AUTH_API_URL=http://localhost:3002
```

### Enfin

Démarrer le serveur

```bash
npx expo start
```

L'application fonctionnera sur le port 8081.

## Auteurs & Template Front
- [@ClemLcs](https://github.com/ClemLcs)
- [@Germain-L](https://github.com/Germain-L)
- [Sign In Page](https://github.com/mui/material-ui/blob/v5.15.16/docs/data/material/getting-started/templates/sign-in-side/SignInSide.js)
- [Sign up Page](https://github.com/mui/material-ui/tree/v5.15.16/docs/data/material/getting-started/templates/sign-up)