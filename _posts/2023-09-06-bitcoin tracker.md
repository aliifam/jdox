---
layout: post
title: bitcoin tracker
description: Outil d'analyse du bitcoin avec Python
author: Komi Segnibo
tags: quotidien Bitcoin python analyse
image: 
thumb: /img/thumb/Screen%20Shot%202023-09-08%20at%202.15.25%20PM.png
---

<h2> Bitcoin tracker </h2>

Le Bitcoin, la cryptomonnaie la plus célèbre au monde, fait la une depuis des années en raison de sa volatilité incroyable. Si vous êtes un passionné ou un investisseur en cryptomonnaie, surveiller les mouvements de prix du Bitcoin est crucial. C'est là que notre script Python, `bitcoin_tracker.py`, entre en jeu. Dans cet article, nous allons explorer comment utiliser ce script pour récupérer et visualiser les données de prix du Bitcoin, et nous fournirons un guide étape par étape pour sa configuration.

<h3> Caractéristiques: </h3>

  - Récupération des données de prix: Le script utilise l'API CoinGecko pour récupérer les données historiques de prix du Bitcoin dans votre devise préférée.
  
  - Personnalisable: Vous pouvez personnaliser la cryptomonnaie (Bitcoin par défaut), la devise (USD par défaut) et le nombre de jours de données historiques.
  
  - Graphe: Il trace les données de prix historiques du Bitcoin avec une moyenne mobile de 30 jours, vous permettant de visualiser facilement les tendances.
  
  - Gestion des erreurs : Le script inclut une gestion des erreurs pour traiter les échecs de demande API et les réponses non valides.

<h3> Usage de 'Bitcoin Tracker': </h3>

**Prérequis:**

  - Python3 installé sur votre système.
  
  - Packages Python requis installés (requests, numpy, matplotlib, termcolor, pycoingecko).

<h3> Instructions: </h3>

Clonez le dépôt GitHub: 

```bash
git clone https://github.com/Ferrerkomi/bitcoin_tracker.git
```

Accédez au dossier du dépôt: 

```bash
cd bitcoin_tracker
```

Installez les packages Python requis:

```bash
pip install requests numpy matplotlib termcolor pycoingecko
```
Ouvrez le fichier bitcoin_tracker.py et personnalisez la cryptomonnaie, la devise et le nombre de jours selon vos besoins.

Exécutez le script:

```bash
python3 bitcoin_tracker.py
```
Le script récupérera les données de prix du Bitcoin, les tracera et affichera le graphique dans python launcher.

![graphe](https://i.imgur.com/9VjuRcEl.png)

<h3> Extension & Contribution: </h3>

N'hésitez pas à étendre ce script pour suivre d'autres cryptomonnaies ou implémenter des analyses plus avancées. Si vous rencontrez des problèmes ou avez des améliorations à suggérer, veuillez contribuer au dépôt GitHub.

<h3> Conclusion: </h3>

Bitcoin est essentiel pour toute personne intéressée par le monde des cryptomonnaies. Avec le script bitcoin_tracker.py, vous pouvez facilement récupérer et visualiser les données de prix du Bitcoin en Python, vous permettant de rester à jour avec les dernières tendances. Bon suivi !

--------------------------------------------------------------

_**Si vous trouvez cet article utile, vous pouvez envoyer des satoshis anonymes pour soutenir mes recherches & évaluations.**_

₿: bc1q475hnpj2akw08sen5kencn4d834ha4unmqc5gx

_⚡ segnibo2@getalby.com_
