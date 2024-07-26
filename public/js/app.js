class User{
    constructor(name,email,age,password){
        this.name=name
        this.email=email
        this.age=age
        this.password
    }

}
let name =prompt("entrer votre nom s'il vous plait")
const verificationname=(name)=>{
    name=name.trim()
    if (name.length) {
        name.chartAt(0).toUpper()+name.slice(1)  
    }

}
