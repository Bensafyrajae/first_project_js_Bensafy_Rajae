let dataBase = [
    { name: 'basma jamal', email: 'basma@email.com', age: 23, password: '1234567@', balance: 1000, history: [], credit: 0 }
];

class User {
    constructor(name, email, age, password, balance, history , credit) {
        this.name = name;
        this.email = email;
        this.age = age;
        this.password = password;
        this.balance = balance;
        this.history = history;
        this.credit = credit;
    }
}

const signup = () => {
    let name = prompt("Entrez votre nom s'il vous plaît").trim();

    const verificationName = () => {
        while (name.replace(/\s/g, '').length < 5 || /[0-9@#\-+*/]/.test(name)) {
            name = prompt("Entrez un nom valide avec au moins 5 caractères, sans caractères spéciaux :").trim();
        }
        return name.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
    };

    let email = prompt("Entrez votre email s'il vous plaît").trim().toLowerCase();

    const verificationEmail = () => {
        while (email.length < 10 || !email.includes('@') || email.split('@').length !== 2 || dataBase.some(user => user.email === email)) {
            email = prompt("Entrez un email valide (au moins 10 caractères, avec un @, et unique) :").trim().toLowerCase();
        }
        return email;
    };

    let age = prompt("Entrez votre âge s'il vous plaît").trim();

    const verificationAge = () => {
        while (age.length === 0 || age.length > 2 || !/^\d+$/.test(age)) {
            age = prompt("Entrez un âge valide (2 chiffres maximum) :").trim();
        }
        return parseInt(age);
    };

    let password = prompt("Entrez votre mot de passe s'il vous plaît");
    let passwordConfirmed = prompt("Confirmez votre mot de passe:");

    const verificationPassword = () => {
        while (password.length < 7 || !/[#@\-+*/]/.test(password) || /\s/.test(password) || password !== passwordConfirmed) {
            if (password !== passwordConfirmed) {
                alert("Les mots de passe ne correspondent pas.");
            }
            password = prompt("Entrez un mot de passe valide (au moins 7 caractères, avec au moins un caractère spécial) :");
            passwordConfirmed = prompt("Confirmez votre mot de passe:");
        }
        return password;
    };

    name = verificationName();
    email = verificationEmail();
    age = verificationAge();
    password = verificationPassword();

    let user = new User(name, email, age, password);
    dataBase.push(user);

    console.table(dataBase);
};

const login = () => {
    let email = prompt("Entrez votre email:");
    let user = dataBase.find(user => user.email === email);
    if (!user) {
        alert("Email non trouvé.");
        return;
    }

    let password = prompt("Entrez votre mot de passe:");
    if (user.password !== password) {
        alert("Mot de passe incorrect.");
        return;
    }

    alert(`Bienvenue, ${user.name}. Votre solde actuel est de ${user.balance} dirhams.`);
    console.log(`Utilisateur connecté: ${user.name}`);
    console.log(`Solde actuel: ${user.balance} dirhams`);
    userMenu(user);
};

const userMenu = (user) => {
    while (true) {
        let menu = prompt("Choisissez une action: deconnexion, retrait, depot, credit, investir, historique").toLowerCase();
        if (menu === 'deconnexion') {
            alert("Vous êtes déconnecté.");
            console.log("Utilisateur déconnecté.");
            break;
        } else if (menu === 'retrait') {
            retrait(user);
        } else if (menu === 'depot') {
            depot(user);
        } else if (menu === 'credit') {
            credit(user);
        } else if (menu === 'investir') {
            investir(user);
        } else if (menu === 'historique') {
            historique(user);
        } else {
            alert("Action inconnue. Veuillez réessayer.");
        }
    }
};

const retrait = (user) => {
    let montant = parseFloat(prompt("Entrez le montant à retirer:"));
    if (montant <= user.balance) {
        user.balance -= montant;
        user.history.push(`Retrait de ${montant} dirhams.`);
        alert(`Vous avez retiré ${montant} dirhams. Nouveau solde: ${user.balance} dirhams.`);
        console.log(`Retrait de ${montant} dirhams. Nouveau solde: ${user.balance} dirhams.`);
    } else {
        alert("Fonds insuffisants.");
    }
};

const depot = (user) => {
    let montant = parseFloat(prompt("Entrez le montant à déposer (max 1000 dirhams):"));
    if (montant <= 1000) {
        user.balance += montant;
        user.history.push(`Dépôt de ${montant} dirhams.`);
        alert(`Vous avez déposé ${montant} dirhams. Nouveau solde: ${user.balance} dirhams.`);
        console.log(`Dépôt de ${montant} dirhams. Nouveau solde: ${user.balance} dirhams.`);
    } else {
        alert("Montant dépassant la limite autorisée.");
    }
};

const credit = (user) => {
    let creditAmount = user.balance * 0.2;
    user.balance += creditAmount;
    user.credit = creditAmount;
    user.history.push(`Crédit de ${creditAmount} dirhams.`);
    alert(`Vous avez pris un crédit de ${creditAmount} dirhams. Nouveau solde: ${user.balance} dirhams.`);
    console.log(`Crédit de ${creditAmount} dirhams. Nouveau solde: ${user.balance} dirhams.`);
};

const investir = (user) => {
    let montant = parseFloat(prompt("Entrez le montant à investir:"));
    user.balance += montant * 0.2;
    user.history.push(`Investissement de ${montant} dirhams.`);
    alert(`Vous avez investi ${montant} dirhams. Nouveau solde: ${user.balance} dirhams.`);
    console.log(`Investissement de ${montant} dirhams. Nouveau solde: ${user.balance} dirhams.`);
};

const historique = (user) => {
    if (user.history.length === 0) {
        alert("Aucune transaction pour le moment.");
    } else {
        alert("Historique des transactions:\n" + user.history.join("\n"));
        console.log("Historique des transactions:", user.history);
    }
};

const changePassword = () => {
    let email = prompt("Entrez votre email:");
    let user = dataBase.find(user => user.email === email);
    if (!user) {
        alert("Email non trouvé.");
        return;
    }

    let newPassword = prompt("Entrez votre nouveau mot de passe:");
    let passwordConfirmed = prompt("Confirmez votre nouveau mot de passe:");
    while (newPassword.length < 7 || !/[#@\-+*/]/.test(newPassword) || /\s/.test(newPassword) || newPassword !== passwordConfirmed) {
        if (newPassword !== passwordConfirmed) {
            alert("Les mots de passe ne correspondent pas.");
        } else {
            alert("Mot de passe invalide.");
        }
        newPassword = prompt("Entrez votre nouveau mot de passe:");
        passwordConfirmed = prompt("Confirmez votre nouveau mot de passe:");
    }

    user.password = newPassword;
    alert("Mot de passe changé avec succès.");
    console.log(`Mot de passe changé pour l'utilisateur: ${user.email}`);
};

let option = prompt("Choisissez une option: inscrire, connecter, changer mot de passe, exit").toLowerCase();
while (option !== 'exit') {
    if (option === 'inscrire') {
        signup();
    } else if (option === 'connecter') {
        login();
    } else if (option === 'changer mot de passe') {
        changePassword();
    } else {
        alert("Option inconnue. Veuillez réessayer.");
    }
    option = prompt("Choisissez une option: inscrire, connecter, changer mot de passe, exit").toLowerCase();
}
alert("Au revoir!");