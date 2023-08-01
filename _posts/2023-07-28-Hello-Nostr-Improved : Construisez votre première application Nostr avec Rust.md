---
layout: post
title: "Hello-Nostr-Improved : Construisez votre première application Nostr avec Rust."
date: 2023-07-28
description: "Une introduction progressive au protocole Nostr, une communication résistante à la censure. De l'installation de Rust et la génération de clés cryptographiques à la publication de messages et la récupération d'événements."
author: komi Segnibo
tags: quotidien Nostr Rust Coding
image: 
thumb: /img/thumb/Nostr_Rust.png
---

<h1><a href="https://github.com/Ferrerkomi/Hello-Nostr-Improved">Hello-Nostr-Improved.</a></h1>

<h2> Analogie: </h2>

Dans cet article, nous vous emmènerons dans l'univers fascinant de Nostr, un protocole de communication décentralisé. À l'aide de Rust, nous vous guiderons étape par étape pour construire votre toute première application Nostr. De l'installation de Rust et la génération de clés cryptographiques à la publication de messages et la récupération d'événements, ce tutoriel convivial pour les débutants couvre tout. Rejoignez-nous pour explorer les bases de Nostr, comprendre ses mécanismes sous-jacents et découvrir la magie d'une communication résistante à la 'censure'. Préparez-vous à embarquer pour une aventure passionnante de mise en réseau décentralisé avec Rust et Nostr !

'Hello-Nostr-Improved' est une version améliorée du tutoriel original "[Hello-Nostr](https://ndkit.com/tutorials/hello-nostr/)" de [NostrDevKit](https://github.com/NostrDevKit/hello-nostr) qui aborde quelques erreurs rencontrées lors de l'exécution et ajoute une meilleure gestion de ces erreurs. Cet article servira de guide complet pour démontrer les interactions de base avec le réseau 'Nostr' en utilisant le langage de programmation Rust & la bibliothèque `nostr_sdk`. Le code présente les fonctionnalités clés, les améliorations de gestion des erreurs et les fonctionnalités supplémentaires pour fournir une application plus robuste & fiable pour communiquer avec le réseau 'Nostr'.

<h2> Fonctionnalités </h2>

- Génère une paire de clés publique & secrète à partir d'une clé privée fournie. "[Nostr POW KeyGen](https://www.nostr.rest/)".
- Crée un client Nostr, se connecte au réseau Nostr & ajoute plusieurs relais pour la redondance.
- Publie une note de texte sur le réseau Nostr, incluant la clé publique de l'utilisateur dans le message.
- Récupère les événements du réseau Nostr en fonction d'un filtre utilisant la clé publique de l'utilisateur.
- Gestion améliorée des erreurs pour gérer de manière élégante les erreurs réseau, les entrées invalides & les scénarios inattendus.


<h2> Prérequis </h2>

- Langage de programmation Rust (version stable la plus récente recommandée).
- Gestionnaire de paquets 'Cargo'.
- Protocole Nostr & NostrDevKit.


<h2> Démarrage & processus parallèles: </h2>

<h3> Exécution:</h3>

**_Le code commence par importer les modules et les types requis. Il définit une constante 'PRIVATE_KEY', représentant une chaîne hexadécimale qui sert de clé privée pour générer des clés cryptographiques. La fonction main, marquée avec l'attribut '#[tokio::main]', est le point d'entrée du programme et gère les tâches asynchrones en utilisant le 'runtime de Tokio'. Dans la fonction 'main', le code génère une paire de clés publique et privée (my_keys) à partir de PRIVATE_KEY en utilisant des opérations cryptographiques. Il crée un client Nostr, ajoute deux relais au client et établit une connexion avec le réseau Nostr. Le code prépare un message textuel contenant la clé publique de l'utilisateur et le publie en tant que note sur le réseau Nostr. Après une pause de 1 seconde (pour permettre à l'événement de se propager sur le réseau), le code récupère les événements en utilisant un filtre basé sur la clé publique de l'utilisateur. Les événements récupérés sont affichés à la console, montrant les Event IDs, les clés publiques, les horodatages de création et le contenu des événements._**


<h3> Installation de Rust </h3>

Si vous avez déjà une installation fonctionnelle du compilateur Rust le plus récent, vous pouvez passer à la section suivante.

Pour installer la dernière version de Rust, nous vous recommandons d'utiliser rustup. Installez rustup en suivant les instructions sur son site web. Une fois rustup installé, assurez-vous que la dernière chaîne d'outils est installée en exécutant la commande suivante :

```bash
rustup default stable
```

<h3> Créer un nouveau projet Rust </h3>

```bash
cargo new hello-nostr
cd hello-nostr
```

**Compilez et exécutez le binaire pour vous assurer que la chaîne d'outils fonctionne correctement.**

```bash
cargo run
```
ou
```bash
cargo build --release
./target/release/hello-nostr
```

**Le résultat devrait être :**

```bash
Compiling hello-nostr v0.1.0 (/Users/apple/hello-nostr)
    Finished dev [unoptimized + debuginfo] target(s) in 1.76s
     Running `target/debug/hello-nostr`
Hello, world! ou hello nostr!
```

**Référez-vous à cette section chaque fois que vous souhaitez exécuter le programme.**

<h2> Générer une paire de clés </h2>

Créons une paire de clés de manière non sécurisée à l'aide d'un outil en ligne:

 - Allez sur [https://www.nostr.rest/](https://www.nostr.rest/)
 - Cliquez sur "Generate Vanity Key Pair"
 - Copiez la clé privée générée.
 - Dans notre fichier 'main.rs', stockons la clé privée dans une constante.

```rust
const PRIVATE_KEY: &str = "26254926c762778ee329352770bc59304aeb54228f242f2f52af09acc44f543e";

fn main() {
    println!("Hello, nostr!");
}
```


<h2> Ajouter la dépendance rust-nostr </h2>

Ouvrez 'Cargo.toml' et ajoutez la dépendance 'rust-nostr'. Vous pouvez vérifier la dernière version de la bibliothèque ou utiliser la méthode ci-dessous.

Nostr fonctionne mieux dans un environnement multi-thread, et 'tokio' est la bibliothèque rust qui prend en charge cela. Ajoutez également tokio comme dépendance.

```rust
[dependencies]
nostr-sdk = "*"
tokio = { version = "1", features = ["full"] }
```


<h2> Ajoutez l'import en haut du fichier 'main.rs'. </h2>

```rust
use nostr_sdk::prelude::*;
```


<h2> Rendre le programme asynchrone </h2>

Mettez à jour la signature de la fonction 'main' pour ajouter le tag 'tokio', le marquer comme asynchrone et renvoyer le type 'nostr_sdk::prelude::Result'. Vous devrez ajouter l'instruction 'Ok(())' à la fin de la fonction 'main'.

```rust
#[tokio::main]
async fn main() -> Result<()> {
    // <snip>
    Ok(())
}
```


<h2> Charger la clé </h2>

Nous devons créer une instance du type Keys à partir de notre clé privée. Mettez à jour la fonction main avec le code ci-dessous et exécutez-le.

```rust
let secret_key: SecretKey = SecretKey::from_str(PRIVATE_KEY).unwrap();
let my_keys = Keys::new(secret_key);

println!("Hello, nostr! My public key is: {}", my_keys.public_key().to_string());
```

**Le resultat devrait être ceci:**

```bash
 Running `target/debug/hello-nostr`
Hello, nostr! My public key is: becd05edf0c858d6d371304bceab3188a8deb8556f4a59052d6aa532a80207a4
```


<h2> Créer un client et ajouter des relais </h2>

'Nostr' utilise des 'relais' pour recevoir, stocker et interroger les 'événements' (events), et nous utilisons le type 'Client' pour accéder à un relais. Créez un 'client' ou compte et ajoutez deux relais pour recevoir notre message. L'utilisation de plusieurs relais garantit que notre contenu est répliqué et protège les créateurs de la censure. Après avoir ajouté les relais, appelez ou interpeler 'connect()'.

```rust
let client: Client = Client::new(&my_keys);
client.add_relay("wss://relay.house", None).await?;
client.add_relay("wss://relay.damus.io", None).await?;
client.connect().await;
```


<h2> Publier une note texte </h2>

Plaçons notre message dans une variable 'String' pour pouvoir l'afficher et l'envoyer aux relais. Ensuite, appelons la fonction 'publish_text_note' et affichons l'ID de l'événement résultant.

```rust
let message: String = format!("Hello, nostr! My public key is: {}", my_keys.public_key().to_string());
println!("{}", message);

let event: Event = client.publish_text_note(message, &[]).await?;
println!("{:#?}", event);

```
_**Félicitations, vous avez publié votre premier événement !**_

_**Le resultat devrait être ceci:**_

```bash
 Running `target/release/hello-nostr`
Hello, nostr! My public key is: becd05edf0c858d6d371304bceab3188a8deb8556f4a59052d6aa532a80207a4
EventId(
    0x47a618747ff0d9fa7148bb6825cd2cc2c98c0cdef233c831bf6c95ee58f454bf,
)
```

_**Réexécutez !**_

Exécutez à nouveau le programme et notez que l'ID de l'événement 'change'. Cela est dû au fait que l'ID de l'événement est un 'hachage' de données qui inclut l'horodatage, et comme l'heure a changé depuis la publication d'origine, l'ID a également changé.

```bash
Running `target/release/hello-nostr`
Hello, nostr! My public key is: becd05edf0c858d6d371304bceab3188a8deb8556f4a59052d6aa532a80207a4
EventId(
    0xa85917ea97989b8a7a70ba8d7af534df2ba0f0c572d21c7fc1a88b4f695634f5,
)
```


<h2> Récupérer l'événement </h2>

Ajoutons du code pour récupérer l'événement en créant une instance d'un Filter avec l'ID de l'événement que nous venons de créer.

```rust
let filter: Filter = Filter::new().id(event.id);
```

Puisque nous envoyons le filtre d'abonnement au relais immédiatement après avoir publié notre message, il est probable que le relais n'est pas encore prêt à le traiter. Pour fournir une certaine marge, ajoutons une pause de 1 seconde.

```rust
time::sleep(Duration::from_secs(1)).await;
```

Ensuite, envoyez le filtre au relais via le client pour récupérer une liste d'événements correspondant à ce critère.

```rust
let events: Vec<Event> = client.get_events_of(vec![filter], None).await?;
println!("{:#?}", events);
```

_**Vous devriez voir deux événements dans les résultats car nous avons publié l'événement et ensuite envoyé le filtre à deux relais distincts. _C'est la résistance à la censure par la réplication en action.**_

```bash
Running `target/release/hello-nostr`
Hello, nostr! My public key is: becd05edf0c858d6d371304bceab3188a8deb8556f4a59052d6aa532a80207a4
EventId(
    0x4ea15d329307ecde504359c001dc9430a92bb798092890d7ae3051072630c6b4,
)
[
    Event {
        id: EventId(
            0x4ea15d329307ecde504359c001dc9430a92bb798092890d7ae3051072630c6b4,
        ),
        pubkey: XOnlyPublicKey(
            a40702a832a56a2d05594a6f55b8dea88831abce4b3071d3d658c8f0ed05cdbe621d9d42604362237d57845f033fd10f09b908979dffbb28499d2bd7ee994d47,
        ),
        created_at: Timestamp(
            1690284276,
        ),
        kind: TextNote,
        tags: [],
        content: "Hello, nostr! My public key is: becd05edf0c858d6d371304bceab3188a8deb8556f4a59052d6aa532a80207a4",
        sig: Signature(c98431e97ba38967b7c804063e62570aa1fa0dfa76afa5bfb4568a19a6f58ebe5a01297eec03902793be9512aaf265984885d09e0bd10882104d09b7f1dd09c3),
    },
    Event {
        id: EventId(
            0x4ea15d329307ecde504359c001dc9430a92bb798092890d7ae3051072630c6b4,
        ),
        pubkey: XOnlyPublicKey(
            a40702a832a56a2d05594a6f55b8dea88831abce4b3071d3d658c8f0ed05cdbe621d9d42604362237d57845f033fd10f09b908979dffbb28499d2bd7ee994d47,
        ),
        created_at: Timestamp(
            1690284276,
        ),
        kind: TextNote,
        tags: [],
        content: "Hello, nostr! My public key is: becd05edf0c858d6d371304bceab3188a8deb8556f4a59052d6aa532a80207a4",
        sig: Signature(c98431e97ba38967b7c804063e62570aa1fa0dfa76afa5bfb4568a19a6f58ebe5a01297eec03902793be9512aaf265984885d09e0bd10882104d09b7f1dd09c3),
    },
]
```


<h2> Filtrage amélioré </h2>

En pratique, il est probablement rare de récupérer un événement par son ID. Nous utiliserions généralement des critères avec d'autres paramètres de filtre. Mettons à jour notre programme pour récupérer tous les événements que nous avons publiés à partir de notre clé.

```rust
let filter: Filter = Filter {
        ids: None,
        authors: Some(vec![my_keys.public_key().to_string()]),
        kinds: None,
        events: None,
        pubkeys: None,
        hashtags: None,
        references: None,
        search: None,
        since: None,
        until: None,
        limit: None,
        custom: empty_custom, // Provide the empty custom map here without the Option wrapper
        identifiers: None,
    };
```

_**Réexécutez le programme et vous devriez voir tous les événements que vous avez publiés dans ce tutoriel:**_

```bash
Running `target/release/hello-nostr`
Hello, nostr! My public key is: becd05edf0c858d6d371304bceab3188a8deb8556f4a59052d6aa532a80207a4
EventId(
    0x6c993af473a8d5828e635f8a6c4a3dd6a62aad786d94d28f4972df0c5a323886,
)
[
    Event {
        id: EventId(
            0x6c993af473a8d5828e635f8a6c4a3dd6a62aad786d94d28f4972df0c5a323886,
        ),
        pubkey: XOnlyPublicKey(
            a40702a832a56a2d05594a6f55b8dea88831abce4b3071d3d658c8f0ed05cdbe621d9d42604362237d57845f033fd10f09b908979dffbb28499d2bd7ee994d47,
        ),
        created_at: Timestamp(
            1690287626,
        ),
        kind: TextNote,
        tags: [],
        content: "Hello, nostr! My public key is: becd05edf0c858d6d371304bceab3188a8deb8556f4a59052d6aa532a80207a4",
        sig: Signature(01874c54dcd4d134d154c4c5382be4830fab7d3348f9d092e416e0a83f75238154f413ce77a60e90606eccbc722f626d008ef3dd7bd4f3223416dc479d12cd70),
    },
    Event {
        id: EventId(
            0x6c993af473a8d5828e635f8a6c4a3dd6a62aad786d94d28f4972df0c5a323886,
        ),
        pubkey: XOnlyPublicKey(
            a40702a832a56a2d05594a6f55b8dea88831abce4b3071d3d658c8f0ed05cdbe621d9d42604362237d57845f033fd10f09b908979dffbb28499d2bd7ee994d47,
        ),
        created_at: Timestamp(
            1690287626,
        ),
        kind: TextNote,
        tags: [],
        content: "Hello, nostr! My public key is: becd05edf0c858d6d371304bceab3188a8deb8556f4a59052d6aa532a80207a4",
        sig: Signature(01874c54dcd4d134d154c4c5382be4830fab7d3348f9d092e416e0a83f75238154f413ce77a60e90606eccbc722f626d008ef3dd7bd4f3223416dc479d12cd70),
    },
    Event {
        id: EventId(
            0x4ea15d329307ecde504359c001dc9430a92bb798092890d7ae3051072630c6b4,
        ),
        pubkey: XOnlyPublicKey(
            a40702a832a56a2d05594a6f55b8dea88831abce4b3071d3d658c8f0ed05cdbe621d9d42604362237d57845f033fd10f09b908979dffbb28499d2bd7ee994d47,
        ),
        created_at: Timestamp(
            1690284276,
        ),
        kind: TextNote,
        tags: [],
        content: "Hello, nostr! My public key is: becd05edf0c858d6d371304bceab3188a8deb8556f4a59052d6aa532a80207a4",
        sig: Signature(c98431e97ba38967b7c804063e62570aa1fa0dfa76afa5bfb4568a19a6f58ebe5a01297eec03902793be9512aaf265984885d09e0bd10882104d09b7f1dd09c3),
    },
    Event {
        id: EventId(
            0x4ea15d329307ecde504359c001dc9430a92bb798092890d7ae3051072630c6b4,
        ),
        pubkey: XOnlyPublicKey(
            a40702a832a56a2d05594a6f55b8dea88831abce4b3071d3d658c8f0ed05cdbe621d9d42604362237d57845f033fd10f09b908979dffbb28499d2bd7ee994d47,
        ),
        created_at: Timestamp(
            1690284276,
        ),
        kind: TextNote,
        tags: [],
        content: "Hello, nostr! My public key is: becd05edf0c858d6d371304bceab3188a8deb8556f4a59052d6aa532a80207a4",
        sig: Signature(c98431e97ba38967b7c804063e62570aa1fa0dfa76afa5bfb4568a19a6f58ebe5a01297eec03902793be9512aaf265984885d09e0bd10882104d09b7f1dd09c3),
    },
    Event {
        id: EventId(
            0xa85917ea97989b8a7a70ba8d7af534df2ba0f0c572d21c7fc1a88b4f695634f5,
        ),
        pubkey: XOnlyPublicKey(
            a40702a832a56a2d05594a6f55b8dea88831abce4b3071d3d658c8f0ed05cdbe621d9d42604362237d57845f033fd10f09b908979dffbb28499d2bd7ee994d47,
        ),
        created_at: Timestamp(
            1690283191,
        ),
        kind: TextNote,
        tags: [],
        content: "Hello, nostr! My public key is: becd05edf0c858d6d371304bceab3188a8deb8556f4a59052d6aa532a80207a4",
        sig: Signature(b9c089215852b4d68a96d0a1f3460e26766c623b8942f9f65cc3fea491d047dc09700c10767b81d9d9c4d91d733c866126a235b6ee5df47658bdf9f54dfc5255),
    },
    Event {
        id: EventId(
            0xa85917ea97989b8a7a70ba8d7af534df2ba0f0c572d21c7fc1a88b4f695634f5,
        ),
        pubkey: XOnlyPublicKey(
            a40702a832a56a2d05594a6f55b8dea88831abce4b3071d3d658c8f0ed05cdbe621d9d42604362237d57845f033fd10f09b908979dffbb28499d2bd7ee994d47,
        ),
        created_at: Timestamp(
            1690283191,
        ),
        kind: TextNote,
        tags: [],
        content: "Hello, nostr! My public key is: becd05edf0c858d6d371304bceab3188a8deb8556f4a59052d6aa532a80207a4",
        sig: Signature(b9c089215852b4d68a96d0a1f3460e26766c623b8942f9f65cc3fea491d047dc09700c10767b81d9d9c4d91d733c866126a235b6ee5df47658bdf9f54dfc5255),
    },
    Event {
        id: EventId(
            0x47a618747ff0d9fa7148bb6825cd2cc2c98c0cdef233c831bf6c95ee58f454bf,
        ),
        pubkey: XOnlyPublicKey(
            a40702a832a56a2d05594a6f55b8dea88831abce4b3071d3d658c8f0ed05cdbe621d9d42604362237d57845f033fd10f09b908979dffbb28499d2bd7ee994d47,
        ),
        created_at: Timestamp(
            1690281073,
        ),
        kind: TextNote,
        tags: [],
        content: "Hello, nostr! My public key is: becd05edf0c858d6d371304bceab3188a8deb8556f4a59052d6aa532a80207a4",
        sig: Signature(bedb590d586e49bb4c5148beb284b62c39b2d702466095dab40bb552805873d3525d68c63fc85d576ff0e312a65fb78bcc0b4b594229f22f5cf6e9d9bfc929ea),
    },
    Event {
        id: EventId(
            0x47a618747ff0d9fa7148bb6825cd2cc2c98c0cdef233c831bf6c95ee58f454bf,
        ),
        pubkey: XOnlyPublicKey(
            a40702a832a56a2d05594a6f55b8dea88831abce4b3071d3d658c8f0ed05cdbe621d9d42604362237d57845f033fd10f09b908979dffbb28499d2bd7ee994d47,
        ),
        created_at: Timestamp(
            1690281073,
        ),
        kind: TextNote,
        tags: [],
        content: "Hello, nostr! My public key is: becd05edf0c858d6d371304bceab3188a8deb8556f4a59052d6aa532a80207a4",
        sig: Signature(bedb590d586e49bb4c5148beb284b62c39b2d702466095dab40bb552805873d3525d68c63fc85d576ff0e312a65fb78bcc0b4b594229f22f5cf6e9d9bfc929ea),
    },
]
```

_**Ces sections contiennent des informations sur les événements récupérés depuis le réseau Nostr. Chaque événement inclut les détails suivants :**_

 - _'d':_ L'identifiant unique (Event ID) de l'événement.
 - _'pubkey':_ La clé publique XOnlyPublicKey de l'utilisateur qui a publié l'événement.
 - _'created_at':_ L'horodatage de la création de l'événement.
 - _'kind':_ Le type d'événement (dans ce cas, TextNote).
 - _'tags':_ Des tags supplémentaires associés à l'événement (actuellement vide).
 - _'content':_ Le contenu de l'événement (message texte avec la clé publique de l'utilisateur).
 - _'sig':_ La signature de l'événement, qui vérifie son authenticité.

Dans ce tutoriel simple, nous avons assuré que la chaîne d'outils 'Rust' était installée, créé un nouveau 'binaire Rust', publié un 'message' (événement) sur plusieurs 'relais' et récupéré le message.


<h2> Explication du Code </h2>

<h3> Génération des Clés </h3>

Le code inclut une fonction pour générer une paire de clés publique & secrète à partir d'une clé privée fournie, "[Nostr POW KeyGen](https://www.nostr.rest/)". Cela est réalisé à l'aide d'opérations cryptographiques et des structures `SecretKey` & `Keys` de la bibliothèque `nostr_sdk`. La gestion améliorée des erreurs garantit que les clés privées invalides sont gérées de manière élégante, évitant ainsi les plantages de l'application.

_Configuration du Client Nostr_

L'application configure un client Nostr pour interagir avec le réseau Nostr. Le client se connecte au réseau Nostr et ajoute plusieurs relais pour assurer une communication fiable. Toutes les erreurs survenant pendant le processus de connexion sont correctement gérées pour éviter les perturbations potentielles.

_Publication d'une Note de Texte_

Une note de texte contenant la clé publique de l'utilisateur est publiée sur le réseau Nostr à l'aide de la méthode `publish_text_note`. Le message est propagé et se voit attribuer un identifiant d'événement unique pour référence. L'application affiche l'identifiant de l'événement dans la console pour confirmer la publication.

_Récupération des Événements_

Le code met en œuvre un filtre pour récupérer les événements du réseau Nostr en fonction de la clé publique de l'utilisateur. L'application récupère les événements à l'aide de la méthode `get_events_of` et affiche des informations pertinentes telles que les identifiants d'événement, les clés publiques, les horodatages de création et le contenu.

_Résultat:_

_Le programme se connecte avec succès au réseau Nostr et publie la note textuelle contenant la clé publique de l'utilisateur. Il récupère des événements du réseau Nostr qui correspondent aux critères du filtre. La sortie affiche les Event IDs, les clés publiques, les horodatages de création et le contenu des événements récupérés._

**_Le code peut récupérer des événements en double en raison de plusieurs relais dans le réseau Nostr, ce qui entraîne la propagation des événements par différents chemins._**


<h2> Gestion des Erreurs et Corrections </h2>

Au cours du développement de ce projet, plusieurs erreurs ont été rencontrées et gérées de manière élégante pour améliorer la stabilité de l'application et l'expérience utilisateur. Voici les erreurs rencontrées et les corrections correspondantes: (Ceci n'est que mon cas en particulier et peut donc varier selon notre outil de travail...)

_Erreur 1 : Indication que le champ `custom` de la structure `Filter` attend un `Map<String, Value>`_

**Problème** : L'erreur indique que le champ `custom` de la structure `Filter` attend un `Map<String, Value>`, mais une option `Option` a été utilisée par erreur pour `empty_custom`.

_**Correction**_ : Pour résoudre l'erreur, l'option `Option` a été supprimée de `empty_custom` tout en le fournissant comme valeur par défaut pour le champ `custom`.

_Erreur 2 : Types incompatibles pour le champ `custom` de la structure `Filter`_

**Problème** : L'erreur indique un type incompatible à la ligne 29 pour le champ `authors` dans la structure `Filter`.

_**Correction**_ : La correction consiste à convertir la `XOnlyPublicKey` en `String` en utilisant la méthode `to_string()` pour correspondre au type attendu.

_Erreur 3 : Attendu `(` or `<`, found `<eof>`_

**Problème** : Cette erreur indique une fin de fichier inattendue (EOF) à la ligne 46. Le problème est probablement une erreur de

 'syntaxe'.

_**Correction**_ : Après vérification, il a été constaté que la fonction `main` n'était pas correctement fermée avec une accolade fermante (`}`).

_Erreur 4 : Types incompatibles_

**Problème** : L'erreur met en évidence un type incompatible à la ligne 43 pour le champ `custom` dans la structure `Filter`.

_**Correction**_ : La correction consiste à fournir une `Map<String, Value>` à la place d'une `Option<Map<String, Value>>` pour la variable `empty_custom`, ce qui correspond au type attendu.


<h2> Améliorations Supplémentaires </h2>

Bien que la version actuelle offre des fonctionnalités de base et une gestion améliorée des erreurs, il existe plusieurs façons d'étendre et d'améliorer davantage l'application :

- **Interface Utilisateur** : Implémentez une interface conviviale pour permettre aux utilisateurs d'interagir facilement avec le réseau Nostr.
- **Cryptage et Authentification** : Améliorez la sécurité en ajoutant des mécanismes de cryptage & d'authentification pour une communication sécurisée.
- **Contrats Intelligents** : Explorez l'intégration avec des contrats intelligents pour permettre des actions prédéfinies en fonction d'événements spécifiques.
- **Concurrence** : Utilisez des tâches asynchrones pour effectuer plusieurs opérations simultanément et améliorer les performances de l'application.

<h2> Conclusion </h2>

ce tutoriel nous a fourni une introduction douce et conviviale à la construction d'applications avec le protocole Nostr. Nous avons appris les bases de l'interaction avec le réseau Nostr en utilisant Rust et nous avons exploré comment publier et récupérer des événements du réseau. Nous avons commencé par installer les dépendances nécessaires et créer un projet Rust binaire. Ensuite, nous avons généré une paire de clés publique et privée à partir d'une clé privée fournie. En utilisant ces clés, nous avons créé un client Nostr et nous sommes connectés au réseau en ajoutant deux relais. Le client nous a permis de publier la note textuelle sur le réseau Nostr et de récupérer les événements correspondants.

Cependant, nous avons également rencontré des erreurs lors de l'exécution du code initial. Pour résoudre ces problèmes, nous avons corrigé les problèmes liés aux types de données attendus par certaines fonctions, tels que le type 'Map<String, Value>' attendu par le champ 'custom' dans la structure 'Filter'. Nous avons également supprimé l'enveloppe 'Option' du champ 'custom' en fournissant une valeur par défaut sous forme de 'Map vide'. Enfin, nous avons effectué des améliorations potentielles pour rendre le code plus robuste et convivial. Nous avons suggéré d'ajouter une gestion appropriée des erreurs, de mettre en œuvre une interface utilisateur conviviale et de considérer l'ajout de fonctionnalités de chiffrement, d'authentification et d'intégration avec des contrats intelligents.

Avec les améliorations suggérées, nous pouvons étendre ce tutoriel pour construire des applications plus sophistiquées et sécurisées sur le réseau Nostr.

P.s

Le code de ce dépôt est basé sur le tutoriel original "Hello-Nostr" de NostrDevKit. Un grand merci à l'équipe de [NostrDevKit](https://github.com/NostrDevKit) et aux contributeurs: "[Yuki Kishimoto](https://github.com/yukibtc) & [Max Gravitt](https://github.com/mgravitt)" pour leur travail précieux.

Bon développement ! 🚀
------------------------------------------

_**Si vous trouvez cet article utile, vous pouvez envoyer des satoshis anonymes pour soutenir mes recherches & évaluations.**_

₿: bc1q475hnpj2akw08sen5kencn4d834ha4unmqc5gx

_⚡ segnibo2@getalby.com_
