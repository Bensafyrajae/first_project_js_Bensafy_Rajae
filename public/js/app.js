let dataBase = [
    { name: 'Basma Jamal', email: 'basma@email.com', age: 23, password: '1234567@', balance: 1000, history: [], credit: 0 }
];

class User {
    constructor(name, email, age, password, balance = 0, history = [], credit = 0) {
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
            } else {
                alert("Mot de passe invalide. Il doit contenir au moins 7 caractères et un caractère spécial.");
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

    alert(`Bienvenue, ${user.name}. Votre solde actuel est de ${user.balance.toFixed(2)} dirhams.`);
    console.log(`Utilisateur connecté: ${user.name}`);
    console.log(`Solde actuel: ${user.balance.toFixed(2)} dirhams`);
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
    if (isNaN(montant) || montant <= 0) {
        alert("Veuillez entrer un montant valide supérieur à 0.");
        return;
    }

    if (montant <= user.balance) {
        user.balance -= montant;
        user.history.push(`Retrait de ${montant.toFixed(2)} dirhams.`);
        alert(`Vous avez retiré ${montant.toFixed(2)} dirhams. Nouveau solde: ${user.balance.toFixed(2)} dirhams.`);
        console.log(`Retrait de ${montant.toFixed(2)} dirhams. Nouveau solde: ${user.balance.toFixed(2)} dirhams.`);
    } else {
        alert("Fonds insuffisants.");
    }
};

const depot = (user) => {
    let montant = parseFloat(prompt("Entrez le montant à déposer (max 1000 dirhams):"));

    if (isNaN(montant) || montant <= 0) {
        alert("Veuillez entrer un montant valide supérieur à 0.");
        return;
    }

    if (montant <= 1000) {
        user.balance += montant;
        user.history.push(`Dépôt de ${montant.toFixed(2)} dirhams.`);
        alert(`Vous avez déposé ${montant.toFixed(2)} dirhams. Nouveau solde: ${user.balance.toFixed(2)} dirhams.`);
        console.log(`Dépôt de ${montant.toFixed(2)} dirhams. Nouveau solde: ${user.balance.toFixed(2)} dirhams.`);
    } else {
        alert("Montant dépassant la limite autorisée de 1000 dirhams.");
    }
};

const credit = (user) => {
    let creditAmount = user.balance * 0.2;
    user.balance += creditAmount;
    user.credit = creditAmount;
    user.history.push(`Crédit de ${creditAmount.toFixed(2)} dirhams.`);
    alert(`Vous avez pris un crédit de ${creditAmount.toFixed(2)} dirhams. Nouveau solde: ${user.balance.toFixed(2)} dirhams.`);
    console.log(`Crédit de ${creditAmount.toFixed(2)} dirhams. Nouveau solde: ${user.balance.toFixed(2)} dirhams.`);
};

const investir = (user) => {
    let montant = parseFloat(prompt("Entrez le montant à investir:"));

    if (isNaN(montant) || montant <= 0) {
        alert("Veuillez entrer un montant valide supérieur à 0.");
        return;
    }

    user.balance += montant * 0.2;
    user.history.push(`Investissement de ${montant.toFixed(2)} dirhams.`);
    alert(`Vous avez investi ${montant.toFixed(2)} dirhams. Nouveau solde: ${user.balance.toFixed(2)} dirhams.`);
    console.log(`Investissement de ${montant.toFixed(2)} dirhams. Nouveau solde: ${user.balance.toFixed(2)} dirhams.`);
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
            alert("Mot de passe invalide. Il doit contenir au moins 7 caractères et un caractère spécial.");
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