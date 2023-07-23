---
layout: post
title: ## Attaque 'Wormhole' dans le réseau Bitcoin Lightning
description: Analyses & considérations futures.
author: Komi Segnibo
tags: quotidien Bitcoin Cryptographie Blockchain
image: /img/seo/attack-bitcoin.jpeg
thumb: /img/thumb/bitcoin_lightning.jpeg
---

### Analogie:

Le [Réseau Bitcoin Lightning](https://lightning.network/lightning-network-paper.pdf) a suscité un intérêt considérable en tant que solution off-chain prometteuse pour améliorer la scalabilité et la rapidité des transactions. Cependant, comme tout protocole complexe, il n'est pas à l'abri de potentielles vulnérabilités en matière de sécurité. Dans cet article, nous nous pencherons sur le concept des attaques Wormhole au sein du Réseau [Lightning](https://sourceforge.net/projects/mastering-lightning-net.mirror/files/latest/download) de Bitcoin, en discutant de leurs implications, des stratégies potentielles d'atténuation et des axes de recherche futurs. Veuillez noter que cet article est purement à des fins éducatives et de considérations éthiques.

![Lightning Network](https://i.imgur.com/UMFlJRY.png)

### Comprendre l'attaque '[Wormhole](https://fr.wikipedia.org/wiki/Syst%C3%A8mes_de_d%C3%A9tection_et_pr%C3%A9vention_d%27intrusion_pour_les_r%C3%A9seaux_de_capteurs_sans_fil)':

Une attaque [Wormhole](https://arxiv.org/pdf/2203.10533.pdf) est un type de menace de sécurité dans lequel des acteurs malveillants exploitent l'infrastructure réseau sous-jacente pour créer un raccourci contournant le mécanisme de routage prévu. Elle se compose de deux nœuds. Les nœuds attaquants qui sont connectés par un lien principalement connu sous le nom de 'tunnel'. _Le nœud attaquant d'un côté capture le paquet à partir du nœud légitime, l'encapsule et le transmet par tunnel à l'autre nœud attaquant ou nœud malveillant qui représente au sein du réseau._ Il se compose d'un ou deux nœuds malveillants et un tunnel entre eux. Dans le contexte du Réseau Lightning de Bitcoin[(L2)](https://pdf.sciencedirectassets.com/272436/1-s2.0-S1084804522X00118/1-s2.0-S1084804522001801/main.pdf?X-Amz-Security-Token=IQoJb3JpZ2luX2VjECMaCXVzLWVhc3QtMSJHMEUCIAF1l7tdsL4QS6oITFG493aMywf9ajYEfbOi3xjfzrVIAiEAgiOcFTu8A26V7lb90ynX3lo%2BBpwj8kgfN7QSF9ouoWsquwUIq%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAFGgwwNTkwMDM1NDY4NjUiDLWouN1YHyzlnHKyZCqPBYi3bA930874ulCj3NZBLQRJW6G1kga2NvLKCdO0HvmnelXkor4lB%2F3Foy0i%2FrNDNnYbxJqTiVloK1UWlYr9HQE4sTUH6l5YnrlIIXBnRJ6kYHwko9bmVJs2D5n3oQ68yemnMI2IKEcs6%2FGSA%2FpH7%2Bkc3M67OBh%2B%2FRydf4caJq9mVhBP3oy0ePZ3ktrer7TiRxT9LCt0%2Bteiq2M%2BS1ZJi6StJJ8EHuV2T4cWQ63803cbSxRY2IqQcEy7SNhC%2BykT8K7GiYe%2F%2BVrygTkv8inUyoumDEIaH%2BxSK5QclSMsWMUGnDUlixRIMr4q4PtbMGbeLw7N2sDiR97fbkWi8sxbYTWNU96vZLQTjHhCMMrwPT5ItATnQffmUO%2FxK4u%2F9lFa%2BXUBvZJNqJBJ69S6BA7RtqG5%2FBCLzCQXbPEp0qm8lRbAQCF1%2B2QvnrwqGxdyQmcVYx7U0HoiGbX8rYOtZeXGk6MMSmw%2F0pc2%2B3svrUFd%2Fv6vD%2Bi0rEJubY%2BPln9poOyj%2FDvD8VId0E9RiYSS92WYkeUNRiiHw82KxKwNOc3GHWXC5tC3Ka5ki%2FMDTtdCxuAi%2Fv5egJNaaFKjdxULT55Jdt%2FKze00RW5fEEp%2BlCXBtgO07PzFWZBR%2F1iaxPowbhifC09fY8k1WS5gi9fWL1xZgAMBeF9jXygZ6LVyVysCngbU9ZuESIjXaqgWJjhPT67W3Wffs6svg0etMHjdkZnQWd%2BJgPMS8LRw9NEP0trswJTEWySvunD9A36pcJqXm87Fk%2FYgyHCC5%2FwDc4bdCM1RwUV516KRyTTK%2FPqOW6KrWQRZtVNjJwycGzg3UqEqwNM%2FKJpoeb%2FIP0E5KbhLLlhyJ6BpeKWbjNxCmahYhoARKDAw%2BvDlpQY6sQGs24wsglL%2Fmiwimgqd%2FBHoxIM6xw%2ByR23XxuUZVX4chJW7teACXZtRl%2F2ddaXh7ZGocK%2FwgA6i2kNVJ%2BTUqxdjCjoGjMtoqMY8dLmzR0PGZBad6Mj9JZERqtmn8evz3G0SyRgwTSAMc%2FCJFFnxDxNHibb2QG2WmtVqdMkqeHs8vEnSmpVNurLdeJwLjz%2FoGyThsKDlu6PNvYIv7qLXwUA7j0nXlqBopnz5DwwZbZRpYfw%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230720T191145Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIAQ3PHCVTYRO63666I%2F20230720%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=9918cae8038ad72b2eb38661f5655c10028c6a9116648f68db34003b473c0c8f&hash=59030d338363c5ef71d54a4f7faa28b0ea8dc416b25805b81b91d02aaec36e71&host=68042c943591013ac2b2430a89b270f6af2c76d8dfd086a07176afe7c76c2c61&pii=S1084804522001801&tid=spdf-083bc163-8451-4b93-9cd3-1f956fc12a78&sid=e9aeb3685ca8d847fa58d0e9592d315cc730gxrqb&type=client&tsoh=d3d3LnNjaWVuY2VkaXJlY3QuY29t&ua=0e08560a560a5e555155&rr=7e9d83034bde24db&cc=tg), cette attaque vise à compromettre la sécurité du réseau en établissant des canaux directs entre les nœuds sans suivre les protocoles de routage appropriés des canaux de paiement (fonctionnement sécurisé des transactions utilisant le modèle de script [HTLC](https://eprint.iacr.org/2020/456.pdf)'Hash Time-Locked Contracts' [PTLC](https://lists.linuxfoundation.org/pipermail/lightning-dev/2021-October/003278.html) 'Point Time-Locked Contracts'). L'attaque Wormhole vole les récompenses des intermédiaires PCN. Un paiement est généralement relayé par l'intermédiaire de plusieurs intermédiaires dans PCN, car il se peut qu'il n'y ait pas de canal direct entre le payeur et le bénéficiaire. Dans un tel scénario, les intermédiaires sont au courant de leurs voisins immédiats et peuvent ne pas être au courant des autres nœuds sur le chemin, parfois même du payeur et du bénéficiaire. Ce faisant, l'attaquant obtient un avantage pour manipuler les transactions, pouvant entraîner des pertes financières ou des atteintes à la vie privée: Les fonds des intermédiaires sont temporairement congelé, subit une perte de temps utile, la récompense de traitement des transactions est volée). Un attaquant avec seulement deux nœuds malveillants sur le chemin du payeur au bénéficiaire peut lancer une attaque Wormhole. Wormhole indique comment les fonds sont réacheminés à travers un canal entre les nœuds malveillants de l'attaquant. Les principales raisons de l'attaque Wormhole sont que le même secret HTLC est utilisé pour débloquer les fonds de chaque canal sur le chemin de paiement, et chaque canal peut être déverrouillé indépendamment.

![Wormhole tunnel](https://i.imgur.com/Dfh8xBs.jpg)

**_Difference entre HTLC & PTLC:_** 

La seule différence entre PTLC & HTLC est que le premier est une version améliorée avec des frais réduits et des caractéristiques de sécurité. Cependant, il ne prend en charge que les transitions Bitcoin.

- **HTLC** (Hash Time-Locked Contracts): HTLC est une technique cryptographique utilisée dans les réseaux de canaux de paiement comme le Lightning Network (générellement associé à Bitcoin) pour faciliter les transactions hors chaîne sans confiance et sécurisées. Les HTLC sont conçus pour fournir des paiements conditionnels entre deux parties en utilisant des pré-images de hachage et des verrous de temps. L'idée clé derrière les HTLC est que les fonds peuvent être acheminés par une série de canaux de paiement sans avoir besoin de confiance entre les parties participantes. Les HTLC jouent un rôle crucial dans l'atténuation des attaques Wormhole en raison de leur mécanisme de paiement conditionnel. En exigeant la révélation d'une pré-image dans un délai spécifique, les HTLC empêchent les attaquants de falsifier les transactions ou d'essayer d'exploiter les canaux directs pour rediriger malicieusement les fonds. L'utilisation de pré-images hachées garantit que seul le destinataire prévu qui possède la pré-image correcte peut réclamer le paiement dans le délai spécifié.

Il est essentiel de noter que la mise en œuvre spécifique des HTLC peut varier entre les différentes plates-formes blockchain et les réseaux de canaux de paiement. Bien que les HTLC soient un mécanisme de défense précieux contre les attaques Wormhole, l'efficacité de toute mesure de sécurité dépend de la solidité de la blockchain sous-jacente et de la mise en œuvre appropriée des protocoles.

![Un exemple représentatif d'utilisation de HTLC.](https://i.imgur.com/QfV6d7u.jpg)

- **PTLC** (Point Time-Locked Contracts): PTLC sont des paiements conditionnels qui peuvent remplacer l'utilisation de HTLC dans les canaux de paiement LN, les échangeurs de pièces de monnaie de même chaîne, certains swaps atomiques inter-chaînes et d'autres protocoles contractuels. Par rapport aux HTLC, ils peuvent être plus privés et utiliser moins d'espace de bloc. La mise en œuvre des PTLC dans Bitcoin nécessite la création d'adaptateurs de signature qui seront plus faciles à combiner avec les signatures numériques lorsque les signatures schnorr auront été implémentées sur Bitcoin. Pour cette raison, le développement de PTLC dans Bitcoin a été principalement un sujet de discussion plutôt qu'un sujet de travail actif. L'indisponibilité des signatures schnorr dans les cryptomonnaies alternatives peut également empêcher l'utilisation de PTLC dans certains contrats inter-chaînes, bien qu'il soit encore techniquement possible d'utiliser des PTLC avec seulement des clés de pub et des signatures ECDSA. Les PTLC et leur application à lightning ont été introduits par [A. Poelstra](https://www.wpsoftware.net/andrew/) dans [Lightning in Scriptless Scripts](https://lists.launchpad.net/mimblewimble/msg00086.html) sur la liste de diffusion mimbewimble.

![PTLC](https://i.imgur.com/UKseGDc.png)

Les PTLCs diffèrent des HTLCs par leur méthode principale de verrouillage et de déverrouillage: les verrous de hachage HTLC sont verrouillés à l'aide d'un résumé de hachage et déverrouillés en fournissant la préimage correspondante. La fonction de hachage la plus couramment utilisée est SHA256, qui produit un résumé de 256 bits (32 octets) généralement généré à partir d'une préimage de 32 octets. Lorsqu'ils sont utilisés pour sécuriser plusieurs paiements (par exemple, un paiement LN acheminé ou un swap atomique), tous les paiements utilisent la même préimage et le même verrouillage de hachage. Cela crée un lien entre ces paiements s'ils sont publiés sur la chaîne ou s'ils sont acheminés hors chaîne via des nœuds de surveillance. Tandis que les verrous de points PTLC sont verrouillés à l'aide d'une clé publique (un point sur la courbe elliptique de Bitcoin) et déverrouillés en fournissant une signature correspondante à partir d'un adaptateur de signature satisfait. Pour une proposition de construction de signature schnorr, la clé serait de 32 octets et la signature de 64 octets. Le principal avantage des PTLCs est la corrélation de paiement: au lieu d'utiliser le même secret pour chaque saut de l'itinéraire (payment_hash pour les HTLCs), nous pouvons utiliser des secrets différents pour chaque saut, ce qui offre une bien meilleure confidentialité.

![HTLC Vs PTLC](https://i.imgur.com/j9b0wF1.png)

Cependant, en utilisant l'agrégation et la signature de clés ECDSA ou schnorr multipartites, les clés et la signature peuvent être combinées avec d'autres clés et signatures nécessaires pour autoriser toute dépense, ce qui permet aux verrous de points d'utiliser zéro octet d'espace de bloc distinct. Chaque verrou de point peut utiliser des clés et des signatures différentes, il n'y a donc rien dans le verrou de point qui met en corrélation les différents paiements sur la chaîne ou lorsqu'il est acheminé hors chaîne à travers les nœuds de surveillance. Les PTLCs pourraient permettre aux nœuds le long de l'itinéraire d'utiliser des HTLCs ou des PTLCs, en fonction de leurs capacités. Cela fournirait de la flexibilité et permettrait aux anciens nœuds qui ne prennent en charge que les HTLC de coexister avec les nouveaux nœuds qui prennent en charge les HTLCs et les PTLCs. Les PTLCs sont une pierre angulaire de la construction de nouveaux produits et services financiers basés sur Lightning Network.

**_[Modèles de signature](https://en.wikipedia.org/wiki/Public-key_cryptography): 'ECDSA' & '[Schnorr](https://en.wikipedia.org/wiki/Schnorr_signature)-[Taproot](https://diyhpl.us/wiki/transcripts/bitcoin-core-dev-tech/2019-06-06-taproot/)'_**

Pour comprendre les implications en matière de sécurité des attaques Wormhole, il est crucial de se familiariser avec les deux principaux modèles de signature utilisés dans Bitcoin. Les modèles de signature les plus couramment utilisés dans Bitcoin sont [ECDSA](https://www.rfc-editor.org/rfc/pdfrfc/rfc6979.txt.pdf) (Elliptic Curve Digital Signature Algorithm) et [Schnorr](http://www.neven.org/papers/schnorr.pdf)-[Taproot](https://lists.linuxfoundation.org/pipermail/bitcoin-dev/2019-September/017301.html). ECDSA est utilisé dans les versions antérieures de Bitcoin, tandis que Schnorr-Taproot est une amélioration récente qui offre des avantages en termes d'efficacité et de confidentialité.

- _**[ECDSA]**(https://en.wikipedia.org/wiki/Elliptic_Curve_Digital_Signature_Algorithm) (Elliptic Curve Digital Signature Algorithm): ECDSA est un algorithme cryptographique largement utilisé qui s'appuie sur le problème du logarithme discret dans les [courbes elliptiques](https://en.wikipedia.org/wiki/Elliptic_curve) pour assurer la sécurité des signatures numériques._ Dans [ECDSA](https://lists.linuxfoundation.org/pipermail/lightning-dev/attachments/20180426/fe978423/attachment-0001.pdf), la sécurité repose sur la difficulté de résoudre le problème de logarithme discret sur une courbe elliptique (ECDLP). Étant donné un point Q sur la courbe, il est possible sur le plan informatique de trouver un entier positif k tel que 'Q = k*G', où G est le point de base de la courbe. En termes plus simples, il est difficile de désosser la clé privée de quelqu'un à partir de sa clé publique. Même avec de puissantes ressources informatiques, il faudrait un temps astronomique pour calculer la clé privée à partir de la clé publique, ce qui rendrait pratiquement impossible la rupture du cryptage et la forge de signatures numériques: Bitcoin utilise des signatures ECDSA sur la courbe secp256k1. Il y a une probabilité qu'une signature ECDSA (au-dessus de la courbe Bitcoin, secp256k1) ait la taille correspondante. En d'autres termes, 25 % des signatures ECDSA secp256k1 ont 73 octets, 50 % d'entre elles ont 72 octets et 25 % d'entre elles ont 71 octets. Une fois la signature générée, sa taille est réglée et la probabilité ne s'applique plus. (La raison en est qu'une signature ECDSA est le codage ASN.1 d'une structure avec deux entiers. Chaque entier encodé nécessite un bit pour indiquer le signe, même si dans ECDSA, ils sont toujours positifs. Par conséquent, si le bit supérieur de l'entier est défini, l'entier encodé nécessitera un octet entier pour stocker le bit de signe puisque les entiers ont 256 bits, un multiple de 8. Il y a une chance qu'environ 50 % d'un entier dans la signature ECDSA secp256k1 ait le bit supérieur défini, ce qui nécessite un octet entier pour le bit de signe, ce qui crée la division de 25 %/50 % sur deux entiers.). Cette propriété de l'EDCDLP est le fondement de la sécurité de Bitcoin.

Pour assurer la compatibilité, LN utilise ECDSA sur la même courbe que son schéma de signature de base. Une clé publique ECDSA est hachée à l'aide de la cryptographie pour créer chaque adresse Bitcoin. Celui qui a accès à la clé privée ECDSA est le véritable propriétaire du compte. Cela implique que vous pouvez obtenir le même niveau de sécurité avec ECDSA que RSA tout en utilisant des clés plus petites. Pour un certain nombre de raisons, les clés plus petites sont préférables aux clés plus grandes. Parce que les mathématiques sont plus simples avec des clés plus petites, des algorithmes plus rapides peuvent générer des signatures. L'objectif de sécurité d'EDCDSA est d'être existentiellement infaillible face à une attaque par message choisi. Outre l'obtention d'une signature sur une sélection de messages (à l'exclusion de A), l'objectif d'un adversaire qui lance une telle agression contre une entreprise légitime est d'obtenir une signature valide sur un seul message A.

![ECDSA](https://i.imgur.com/muk26jy.png)

Comme indiqué dans le BIP, ECDSA est normalisé. Cette formulation étant normalisée, ne peut pas être validée plus efficacement dans la validation 'lots par lots'(batch validation) par rapport à individuellement. La validation par lots est importante car elle accélérerait considérablement la synchronisation des nouveaux nœuds Bitcoin qui doivent télécharger l'ensemble de la blockchain et valider chaque transaction (ce serait vrai à partir du bloc hypothétique dans lequel la validation par lots serait introduite ; évidemment, ce n'est pas une propriété rétroactive).

- _**[Schnorr]**(https://github.com/bitcoin/bips/blob/master/bip-0340.mediawiki)-[Taproot](https://github.com/bitcoin/bips/blob/master/bip-0341.mediawiki): 3 [BIPs](https://github.com/bitcoin/bips) individuelles: Signature Schnorr (BIP 340), Taproot (BIP 341), Tapscript (BIP 342)._ 

Cette innovation récente dans Bitcoin introduit la signature Schnorr, qui offre des avantages en termes d'efficacité et de confidentialité. La mise à niveau de Taproot améliore encore la flexibilité et la confidentialité des contrats intelligents de Bitcoin. La signature Schnorr est également basée sur le problème du logarithme discret. Il offre une [agrégation](https://schmiste.github.io/aft22.pdf) de signatures plus efficace et peut améliorer la confidentialité dans les scénarios multi-signatures: Tous les scripts/sigs semblent indiscernables. Même le multisig ou Lightning ressemble à une seule signature; Tous les scripts/sigs sont de la même taille 'même plus de 20 touches prennent l'espace de 1', Le calcul nécessaire pour valider est uniforme; Aussi une plus grande flexibilité sans renoncer à la confidentialité ou au coût des données. Entrave également les débuts de "l'agrégation de sig d'entrée croisée" (Fondamentalement, nous pouvons combiner les clés/signatures publiques de personnes différentes en une seule clé/signature publique). Idéal pour la confidentialité, l'efficacité et rend le 'coinjoining' plus économique qu'une transaction normale.

![Schnorr](https://i.imgur.com/bj2qDUE.png)

Les signatures Schnorr offrent de nombreux avantages par rapport à [ECDSA](https://eprint.iacr.org/2017/552.pdf), y compris des économies d'espace et de frais mais l'avantage le plus important offert par les signatures Schnorr est l'agrégation des clés (Avec l'agrégation des clés Schnorr Signature, les sorties multi-sig sont exactement les mêmes que les sorties sig simples en chaîne et cela rend impossible pour les entreprises d'analyse de chaîne de faire la distinction entre les dépenses multi-sig et les dépenses mono-sig). L'agrégation de Schnorr sig est également une énorme amélioration du Lightning Network. Le LN s'appuie sur 2 des transactions multisig pour l'ouverture du canal. Avec l'agrégation de Schnorr, l'ouverture du canal LN ressemblera exactement à toute autre sortie mono-sig sur la chaîne. L'un des défis de Schnorr est qu'il est si incroyablement puissant et élégant qu'il semble simple, cela conduit à des implémentations naïves avec de graves conséquences. En outre, les premières implémentations étaient axées sur des cas d'utilisation à une seule signature et celles d'aujourd'hui sont multisignatures. 'Taproot + schnorr musigs' peut être utilisé pour réduire les empreintes digitales, de sorte que multisig, monosig & lightning ont généralement la même apparence et indiscernable. Mais c'est l'étendue de la vie privée. Un problème est que ces choses sont compliquées et se confondent parfois dans le récit enthousiaste. Les avantages immédiats que Schnorr apporte à Bitcoin sont l'amélioration de l'efficacité (petites signatures, validation par lots, agrégation croisée des entrées) et Confidentialité (les signatures multiples et les signatures seuils seraient indiscernables d'une seule signature), ce qui conduit également à une amélioration de la fongibilité.

Les détails mathématiques complets de la théorie de la signature ECDSA et Schnorr-Taproot vont au-delà de la portée de cet article. Cependant, il est essentiel de comprendre que ces modèles de signature s'appuient sur des concepts mathématiques avancés tels que les courbes elliptiques et les fonctions de hachage cryptographiques. Les attaques Wormhole exploitent les vulnérabilités cryptographiques pour saper la sécurité du Bitcoin Lightning Network et donc se produisent généralement lorsque l'attaquant manipule les paramètres de transaction pour exploiter les vulnérabilités dans les schémas de verrouillage du temps. Cela peut être réalisé en modifiant les signatures, les clés publiques ou d'autres éléments critiques de la transaction.

![ECDSA Vs Schnorr](https://i.imgur.com/iz7NnWD.png)

**_Scénario d'attaque Wormhole:_**

Considérons un exemple simplifié pour illustrer l'attaque Wormhole. 

- _Scénario 1: Supposons qu'Alice & Bob, qui sont géographiquement éloignés l'un de l'autre, aient un canal de paiement entre eux. De plus, il y a un nœud malveillant, Eve, situé beaucoup plus près d'Alice. Eve établit deux canaux: l'un avec Alice et l'autre avec Bob. Cela crée un raccourci entre Alice et Bob à travers le nœud malveillant Eve.
Alice veut envoyer un paiement à Bob via le Lightning Network. En raison de la proximité d'Eve, le paiement d'Alice est acheminé par le canal d'Eve au lieu de son canal direct avec Bob. Eve peut maintenant choisir de traiter le paiement honnêtement ou de l'interrompre à des fins malveillantes, causant des pertes financières ou un refus de service._

- _Scénario 2: Bob & Alice établissent un canal de paiement entre eux en utilisant le modèle PTLC avec des signatures Schnorr-Taproot. Un attaquant, Mallory, observe le réseau et détecte le canal entre Bob & Alice. Mallory initie donc une attaque Wormhole en établissant un canal direct avec Alice, en contournant le protocole d'établissement de canal approprié. Alors, Mallory peut manipuler les transactions sur le canal direct avec Alice, ce qui entraîne disons, une 'double dépense' ou un vol potentiel de fonds. Comme Mallory maintient un canal direct avec Alice, elle peut valablement effectuer à plusieurs reprises l'attaque Wormhole, ce qui rend difficile la détection et l'atténuation._

- _Scénario 3: Une représentation mathématique de Wormhole basé sur ECDSA._

'Pb', la clé publique de Bob & celle d'Alice: 'Pa'; Message à signer: 'M' & 'Pr', la clé privée de l'attaquant.

**_Processus de génération de signatures ECDSA:_**

Calcul du hachage du message: H = Hash(M); Générer un nonce aléatoire: k; Calcul de la clé publique du nonce: P = k*G (G est le point de base de la courbe elliptique);
Calcul de la coordonnée r de la signature: r = x-coordonnée(P) mod n (n est l'ordre du groupe de courbes elliptiques); Calcul de la coordonnée s de la signature: s = (k^(-1) * (H + r * Pr)) mod n

Dans une attaque Wormhole, l'attaquant intercepte le processus de signature de Bob et manipule les paramètres de signature. Ici, l'attaquant peut donc modifier les valeurs r ou s pour produire une signature non valide ou malveillante. Cette altération permet à l'attaquant de contrôler la transaction et potentiellement de voler des fonds.

**_Démonstration pratique: Illustrons ces étapes sur la [courbe elliptique secp256k1](https://en.bitcoin.it/wiki/Secp256k1)_**

                          E: y^2 = x^3 + ax + b

Pour plus de simplicité, nous supposerons une courbe elliptique spécifique et des valeurs pour les paramètres:

Courbe: secp256k1 (Une courbe elliptique largement utilisée dans Bitcoin); Paramètres: a = 0, b = 7; Base point: G (x, y) = (55066263022277343669578718895168534326250603453777594175500187360389116729240, 32670510020758816978083085130507043184471273380659243275938904335757337482424); Ordre du groupe de courbes: n (Un grand nombre premier).

Maintenant, représentons visuellement la courbe elliptique en forme normale '[Weierstrass](https://www.dima.unige.it/~morafe/MaterialeCTC/Ellipt.pdf)' et les étapes impliquées dans la génération de la signature ECDSA en se focalisant sur le dessin de la courbe entière plutôt que sur les points sur la [courbe elliptique](http://math.uchicago.edu/~may/REU2016/REUPapers/Kline.pdf) pour les coordonnées 'x' valides. Soit, exclure les points de la courbe où la racine carrée n'est pas définie en filtrant les points où la valeur 'y' est négative. Pour visualiser avec précision la courbe elliptique, nous devons considérer une plus large gamme de valeurs 'x' pour couvrir toute la forme de la courbe.

```python

import matplotlib.pyplot as plt
import numpy as np

# Define the elliptic curve parameters
a = 0
b = 7

# Define the curve function
def elliptic_curve(x, a, b):
    return x**3 + a*x + b

# Define the curve function for y-coordinate
def elliptic_curve_y(x, a, b):
    y = elliptic_curve(x, a, b)
    return np.sqrt(y.clip(min=0))

# Define the range for x values
x_range = np.arange(-10, 10.1, 0.1)

# Compute y values for the curve
y_curve = elliptic_curve_y(x_range, a, b)

# Plot the elliptic curve
plt.plot(x_range, y_curve, 'b', label='Elliptic Curve')
plt.plot(x_range, -y_curve, 'b')

# Label the axes
plt.xlabel('x')
plt.ylabel('y')
plt.title('Elliptic Curve in Weierstrass Normal Form')

# Add legend
plt.legend()

# Show the plot
plt.grid(True)
plt.show()
```
A travers ce code, nous calculons les valeurs y pour les parties supérieure et inférieure de la courbe à l'aide de l'équation de la courbe elliptique. Le tracé affiche la courbe symétriquement autour de l'axe des x. Lorsque vous l'exécutez, vous devriez voir un tracé montrant la courbe elliptique sous la forme normale de [Weierstrass](https://arxiv.org/pdf/2301.11437.pdf), la courbe sera symétrique autour de l'axe des x, et elle peut ressembler à une boucle ou à une courbe avec une seule branche, en fonction des valeurs de "a" et "b".

![Imgur](https://i.imgur.com/w0hOtUq.png)

**_Implications:_**

L'attaque Wormhole présente plusieurs [menaces](https://secpriv.wien/fulltext/publik_289754.pdf) potentielles pour le Lightning Network, y compris la réduction de la confidentialité, la manipulation du routage et les pertes financières. Un nœud malveillant peut exploiter sa position centrale pour rediriger les paiements, compromettre les soldes des canaux ou lancer une attaque Sybil en créant plusieurs identités malveillantes. Les attaques de Wormhole affectent tous les réseaux de canaux de paiement basés sur 'HTLC'. Par exemple, un nœud activé pour le tunnel de l'attaque Wormhole peut conspirer pour falsifier la configuration de routage afin d'obtenir un contrôle total du trafic-réseau. Certains cryptographes pensent que les attaques Wormhole sont principalement d'intérêt théorique et ne valent pas la peine d'être combattues alors que quelques récents cas de ces attaques démontrent que chaque nouvelle couche ajoute des problèmes et crée de nouveaux vecteurs d'attaque. En conséquence, les nœuds peuvent perturber les processus qui reposent sur la proximité topologique. Ces attaques peuvent également augmenter la consommation d'énergie des nœuds en allouant diverses ressources et en transmettant des données excessives. Les attaques Wormhole ne peuvent pas être évités en utilisant diverses algorithmes et clés cryptographiques. Nous ne devrions pas ignorer de telles attaques et donc travailler à l'élimination d'éventuelles menaces futures. Si nous avons des PTLCs (soit en utilisant ECDSA, soit avec Schnorr-taproot), les attaques wormhole ne seront même pas théoriquement possibles dans Lightning. Car l'intégrale PTLC a de larges possibilités pour améliorer la confidentialité sur le réseau Lightning, un tel "ajustement aléatoire" est nécessaire pour ne pas révéler le chemin des paiements en assurant également une protection contre les attaques Wormhole pour une meilleure confidentialité. 

Les attaques Wormhole, qui ont un impact significatif sur la couche réseau, en sont une des plus grands dangers. Car, selon les recherches, elles peuvent perturber le routage du réseau, la sécurité sans fil basée sur la localisation et l'agrégation de données. Une attaque Wormhole peut être lancée par un seul nœud ou par une paire de nœuds coopérants. Parce que cela peut discrètement perturber le réseau et elle est extrêmement difficile à détecter. Même si l'on ne comprend pas les différents algorithmes cryptographiques utilisés, elle est généralement causé par un ou plusieurs nœuds (Les nœuds wormhole forment une illusion de déroute plus courte que la route originale pour le nœud légitime).

```python
class MaliciousNode:
    def __init__(self, name):
        self.name = name
        self.channels = []

    def add_channel(self, channel):
        self.channels.append(channel)

    def manipulate_routing(self, payment, target_channel):
        # Insert code to intercept and modify the payment's routing information
        pass

# Instantiate nodes and channels
alice = Node("Alice")
bob = Node("Bob")
eve = MaliciousNode("Eve")

channel1 = Channel(alice, bob)
channel2 = Channel(alice, eve)
channel3 = Channel(eve, bob)

alice.add_channel(channel1)
alice.add_channel(channel2)
eve.add_channel(channel2)
eve.add_channel(channel3)
bob.add_channel(channel1)
bob.add_channel(channel3)

# Alice sends payment to Bob
payment = Payment(amount=10, source=alice, destination=bob)
eve.manipulate_routing(payment, target_channel=channel3)
```
Extrait de code Python simplifié représentant une implémentation hypothétique d'une attaque Wormhole.

### [Stratégies d'Atténuation](https://eprint.iacr.org/2018/472.pdf):

Prévenir les attaques Wormhole nécessite une approche multidimensionnelle impliquant à la fois la conception du protocole et le comportement solennel des nœuds. Voici quelques stratégies à envisager:

 - _Protocoles de Routage Sécurisés:_ Améliorer les mécanismes de routage du Réseau Lightning pour détecter et prévenir les attaques par trou de ver. Cela inclut la vérification de l'authenticité des canaux et le respect des procédures appropriées d'établissement des canaux.

 - _Surveillance du Réseau:_ Mettre en place des systèmes de surveillance capables de détecter les comportements anormaux, tels que la création soudaine de canaux ou les modifications excessives de transactions. Les nœuds devraient analyser en continu les modèles de trafic réseau et identifier les activités malveillantes potentielles.

 - _Systèmes de Réputation:_ Développer des [systèmes](https://arxiv.org/pdf/2208.05125.pdf) basés sur la réputation pour évaluer la fiabilité des nœuds individuels. En tenant compte du comportement passé et des performances des nœuds, le réseau peut atténuer le risque d'attaques Wormhole en refusant d'établir des canaux avec des nœuds suspects ou non fiables.

 - _Solutions hybrides:_ Ils aident à améliorer encore l'évolutivité des protocoles hors chaîne. Ces solutions sont appelées hybrides parce qu'elles modifient quelques propriétés fondamentales des solutions hors chaîne: _Les protocoles 'Bisection' forment une branche de solutions de couche 2 qui visent principalement à améliorer le mécanisme de règlement des différends. Ces protocoles font partie des calculs hors chaîne, contribuant ainsi à réduire la charge sur la chaîne principale. En général, les protocoles de bisection impliquent deux étapes à savoir la présentation d'un minimum de preuves à un vérificateur pour témoigner de la validité d'une transaction faite par un utilisateur et l'inspection vérifiée des preuves d'utilisateurs qui se contredisent pour déterminer l'état correct. 'TEE-based solutions' (environnement d'exécution de confiance) est généralement une zone isolée et protégée à l'intérieur d'un processeur, où l'intégrité et la confidentialité des données chargées sont protégées. Les solutions basées sur TEE pour l'évolutivité de la blockchain utilisent la protection de l'intégrité offerte par les TEE pour éliminer la garantie sur la chaîne utilisée pour établir la confiance entre les participants. En fait, TEE est utilisé comme une entité de confiance mutuelle dans de telles solutions parce qu'elles offrent un niveau de sécurité plus élevé pour l'exécution des applications._
   
### Travaux futurs sur les améliorations du protocole:

Afin d'atténuer les risques potentiels associés à l'attaque Wormhole et d'améliorer la sécurité du Lightning Network, les chercheurs et les développeurs explorent diverses améliorations. Certains travaux futurs sur le protocole comprennent:

 - _Algorithmes de routage améliorés:_ Examiner et développer des algorithmes de routage plus robustes et efficaces capables de s'adapter dynamiquement aux conditions changeantes du réseau tout en considérant les aspects de sécurité. Ces algorithmes devraient être résilients contre les attaques par trou de ver et autres menaces potentielles. (Neo hashed time-Lock commitment([nHTLC](https://www.sciencedirect.com/science/article/abs/pii/S0167404821001152)) protocol: Un protocole de réseau de canaux de paiement efficace, sécurisé et respectueux de la vie privée. 'n-HTLC' n'exige pas que l'expéditeur envoie des informations à chaque utilisateur intermédiaire le long de l'itinéraire de paiement, préserve ainsi l'identité de l'expéditeur. [HTLC-GP](http://library.isical.ac.in:8080/jspui/bitstream/10263/7350/1/Thesis-Subhra%20Majumdar-14-10-22.pdf) (Hashed Timelock Contract with Griefing-Penalty): Algorithme de routage distribué efficace pour préserver la vie privée HushRelay couplé d'un '[protocole de paiement multivoies atomique' et préservant la vie privée](https://eprint.iacr.org/2022/123.pdf).

 - _Paiements à chemins multiples ou 'Atomic Multi Payment':_ la mise en œuvre de paiements à chemins multiples peut répartir les paiements sur plusieurs routes, ce qui réduit l'impact de n'importe quel nœud malveillant.

 - _Vérification formelle & géographique:_ Appliquer des techniques de vérification formelle et géographiqaue pour analyser rigoureusement les propriétés de sécurité du Réseau Lightning afin de détecter et empêcher les attaquants de créer des canaux d'attaque Wormhole. En prouvant mathématiquement la correction et l'absence de vulnérabilités, le réseau peut atteindre un niveau plus élevé d'assurance de sécurité.

 - _Solutions de préservation de la vie privée:_ Explorer des mécanismes renforçant la vie privée au sein du Réseau Lightning pour protéger la confidentialité des utilisateurs même en présence d'attaques Wormhole. Des techniques telles que l'acheminement en oignon (Onion Routing) et le Zero-Knowledge proof pourraient être exploitées pour protéger les informations et métadonnées des transactions.

_Taproot résout-il un problème pratique ?
En fin de compte, c'est à l'ingénieur du canal de paiement de le juger, mais mon impression est que c'est le cas._

### Conclusion:

Les attaques Wormhole représentent une menace significative pour la sécurité et la fiabilité du Réseau Lightning de Bitcoin. Il est essentiel que les chercheurs, les développeurs et les participants au réseau comprennent ces vulnérabilités, étudient les contre-mesures potentielles et contribuent aux efforts continus visant à améliorer la sécurité du réseau. De plus, la nature décentralisée du réseau Bitcoin, basée sur le réseau peer-to-peer, garantit qu'aucune entité ne contrôle la majorité de la puissance de calcul du réseau (taux de hachage). Cette décentralisation, ainsi que le concept de preuve de travail (PoW), renforce la sécurité de la blockchain de Bitcoin contre les attaques potentielles, comme la tristement célèbre "attaque de 51 %". L'amélioration des fonctionnalités de confidentialité au sein du réseau Bitcoin est devenue une priorité pour de nombreux développeurs, avec des projets tels que les signatures Taproot & Schnorr se concentrant sur l'amélioration de la confidentialité et de la sécurité des transactions. Ces innovations visent à rendre plus difficile pour les tiers de lier les transactions à des utilisateurs spécifiques, augmentant ainsi la confidentialité globale et la fongibilité de Bitcoin. La technologie Bitcoin Blockchain n'est toujours pas assez mature, elle n'est pas systématiquement étudiée et les risques qui l'entourent sont encore inconnus. Une plate-forme Blockchain commune, des normes d'application et une interface de programmation d'application sont nécessaires pour améliorer la perception et l'interaction des utilisateurs. En restant vigilants et en collaborant sur les avancées en matière de sécurité (examiner les vecteurs d'attaque potentiels & concevoir des défenses robustes contre toute menace qui se cache dans l'ombre), nous pouvons assurer le succès à long terme et l'adoption du Réseau Lightning de Bitcoin tout en protégeant les actifs et la vie privée des utilisateurs.

_L'avenir de l'argent est réinventé & le Bitcoin est à l'avant-garde de cette transformation passionnante..._

-----------------------------------

_**Si vous trouvez cet article utile, vous pouvez envoyer des satoshis anonymes pour soutenir mes recherches & évaluations.**_

₿: bc1q475hnpj2akw08sen5kencn4d834ha4unmqc5gx

_⚡ segnibo2@getalby.com_
