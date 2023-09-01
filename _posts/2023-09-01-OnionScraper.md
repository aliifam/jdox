---
layout: post
title: OnionScraper, 'Scraper & enregistrer du contenu des Sites Web .onion avec Python & Tor'.
description: Onion Site Scraper
author: Komi Segnibo
tags: quotidien Tor Onion Site Scraper Python
image: 
thumb: /img/thumb/Screen%20Shot%202023-09-01%20at%205.00.25%20PM.png
---

Dans ce tutoriel, nous allons vous guider à travers le processus de création d'un script Python qui vous permet d'accéder et de sauvegarder le contenu des sites Tor Onion en utilisant le réseau Tor. Nous expliquerons chaque étape du code et fournirons les exigences essentielles pour le projet. À la fin de ce tutoriel, vous disposerez d'un outil puissant qui peut récupérer et stocker le contenu des pages Web à partir de sites Onion tout en préservant votre vie privée.

<h3> Nom du projet: OnionScraper </h3>

'OnionScraper' est un script Python qui vous permet de gratter le contenu des sites Web .onion en utilisant le réseau Tor, garantissant ainsi votre anonymat et votre confidentialité. Le script récupère non seulement le contenu, mais également, l'enregistre localement avec les cookies reçus pendant le processus de grattage ou de récupération. Ce guide vous guidera à travers la configuration et l'utilisation d'OnionScraper pour explorer les profondeurs cachées du réseau Tor.

Exigences essentielles: Avant de commencer, assurez-vous d'avoir les conditions préalables suivantes:

**_Python_**, assurez-vous que <a href="https://www.python.org/downloads/" target="_blank" rel="noopener noreferrer"> Python </a> est installé sur votre système. 

_**Navigateur Tor**_, le script utilisera le réseau Tor pour accéder aux sites Onion. Vous devez avoir le navigateur Tor installé et en cours d'exécution sur votre système. Téléchargez-le ici : Téléchargements du navigateur Tor.

_Le script Python utilise la bibliothèque `request` pour faire des requêtes 'HTTP'_. Installez-le:

```bash
pip install requests
```

Le projet 'TorScraper' consiste en un script Python qui utilise le réseau Tor pour accéder à un site Onion de votre choix, récupérer son contenu et le sauvegarder localement. Le script enregistre également les cookies envoyés par le site pour une analyse plus approfondie. Les principales caractéristiques du script sont les suivantes :

  - Saisie personnalisable de l'URL du site '.onion'.

  - Utilisation du réseau Tor via des proxys configurés.

  - Récupération du contenu de la page web et des informations sur les cookies.

  - Enregistrement du contenu et des cookies dans des fichiers locaux.

<h3> Installation & Usage </h3>

Pour configurer 'OnionScraper', procédez comme suit:

Cloner le référentiel ou dépôt: cloner le dépôt OnionScraper à partir de GitHub:

```bash
git clone https://github.com/Ferrerkomi/onion_scraper.git
```

Accédez au répertoire:

```bash
cd OnionScraper
```

Procédez comme suit pour utiliser `OnionScraper`:

Exécutez le script dans votre terminal:

```bash
python3 onionscraper.py <onion_url>
```

Remplacez `<onion_url>` par l'URL du site web '.onion' que vous voulez scraper. (Ex. python3 onion_scraper.py https://www.reddittorjg6rue252oqsxryoxengawnmo46qy4kyii5wtqnwfj4ooad.onion/)

![terminal](https://i.imgur.com/humj5iAl.png)

**Sortie (Output):** OnionScraper accédera au site Web .onion à l'aide de Tor, récupérera son contenu et l'enregistrera dans le dossier de sortie (output). Les 'cookies' reçus au cours du processus seront également affichés dans le terminal.

![Output](https://i.imgur.com/dicwNyfl.png)

<h3> Explication du script: </h3>

Importer les modules requis: Nous importons les modules nécessaires: `os`, `sys` &  `requests`.

`OnionScraper Class`: Nous définissons une classe appelée `OnionScraper` pour encapsuler la fonctionnalité. Il s'initialise avec l'URL Onion fournie et un nom de dossier de sortie (la valeur par défaut est 'output'). Il configure également les proxys Tor et crée un objet de session à l'aide de la bibliothèque de `request`.

`access_onion_site Method`: Cette méthode accède au site Onion en utilisant les proxy Tor configurés. Il récupère le contenu du site et l'enregistre en utilisant la méthode `save_content`. Par la suite, il affiche le contenu et les cookies reçus du site.

Méthode `save_content`: Cette méthode crée le dossier de sortie s'il n'existe pas et enregistre le contenu de la page Web dans un fichier nommé 'website_content.txt' dans le dossier de sortie.

`__Init__`: initialise l'instance de classe et configure le proxy Tor et la session.

Bloc principal: Dans ce bloc, nous vérifions si le nombre correct d'arguments en ligne de commande (Onion URL) est fourni. Dans le cas contraire, un message d'erreur s'affiche. Ensuite, nous instancions la classe `OnionScraper` avec l'URL Onion fournie et appelons la méthode `access_onion_site` pour commencer à gratter.

<h3> Conclusion: </h3>

'OnionScraper' ouvre la porte à l'exploration du monde des sites web '.onion' sur le réseau Tor. Il vous permet de scraper le contenu tout en préservant l'anonymat et la confidentialité. Que vous fassiez des recherches ou que vous soyez simplement curieux, 'OnionScraper' vous permet d'accéder à du contenu caché sur le dark web en toute sécurité.

N'hésitez pas à personnaliser et à étendre 'OnionScraper' en fonction de vos besoins.

--------------------------------------------------------------

_**Si vous trouvez cet article utile, vous pouvez envoyer des satoshis anonymes pour soutenir mes recherches & évaluations.**_

₿: bc1q475hnpj2akw08sen5kencn4d834ha4unmqc5gx

_⚡ segnibo2@getalby.com_
