#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";
import chalkAnimation from "chalk-animation";

const sleep=()=>{
    return new Promise((res)=>{
        setTimeout(res,2000);
    })
}
let animate=chalkAnimation.rainbow('                        WELCOME TO THE SYSTEM');    
await sleep();
animate.stop();

let username="Riza";
let Pincode=1235;
let balance=Math.floor(Math.random()*1000000);
let account=12345;

let choose=await inquirer.prompt([
    {
        message:chalk.bold("                  Do you want to register or login?\n",chalk.greenBright("                 NOTE: if you are new register first")),
        choices:["                           Register","                           Login"],
        type:"list",
        name:"Enter"
    }
])

if(choose.Enter=="                           Login"){await login();}
else if(choose.Enter=="                           Register"){
    await register();
    console.log(chalk.greenBright.bold("               Please Login in the system for further process"));
    await login();
}
else{
    console.log(chalk.red.bold("                 Please choose from given options"));
}

async function register(){
    let register=await inquirer.prompt([
        {
            message:chalk.bold("                       Enter Username: "),
            name:"User",
            type:"input"
        },
        {
            message:chalk.bold("                   Enter Your assigned PinCode: "),
            name:"Pin",
            type:"number"
        },
        {
            message:chalk.bold("                   Enter Your Account number: "),
            name:"acc_number",
            type:"number"
        }
    ])
    username=register.User;
    Pincode=register.Pin;
    account=register.acc_number;
}

async function login(){

    let loginDetails=await inquirer.prompt([
        {
            message:chalk.bold("                       Enter Your Username: "),
            name:"User",
            type:"input"
        },
        {
            message:chalk.bold("                       Enter Your PinCode: "),
            name:"Pin",
            type:"number"
        }
    
    ])

    if(loginDetails.User===username&&loginDetails.Pin===Pincode){
       await Choices();
    }
    else{
        console.log(chalk.red.bold("                    Invalid Username or Pincode"));
        await login();
    }
}

async function F_transfer(balance:number) {
    let user_input= await inquirer.prompt([
        {
            message:chalk.grey("       Enter the Account under which amount has to be transfered: "),
            name:"Transfer_acc",
            type:"input"
        },
        {
            message:chalk.grey("       Enter the amount which has to be Transfered: "),
            name:"T_amount",
            type:"number"
        }
    ])

    if(user_input.T_amount<balance){
        balance-=user_input.T_amount;
        console.log(chalk.greenBright(`         Your amount of ${user_input.T_amount}/-PKR under ${user_input.Transfer_acc} has been transfered successfully!`));
    }
    return balance;
}

async function B_Pay(balance:number,account_num:number) {
    let user_input= await inquirer.prompt([
        {
            message:chalk.grey("       Enter the Company name under which amount has to be paid: "),
            name:"Company_name",
            type:"input"
        },
        {
            message:chalk.grey("       Enter your account number: "),
            name:"acc_num",
            type:"number"
        },
        {
            message:chalk.grey("       Enter the amount which has to be paid: "),
            name:"amount",
            type:"number"
        }
    ])
    
    if(user_input.acc_num===account_num){
        if(user_input.amount<balance){
            balance-=user_input.amount;
            console.log(chalk.greenBright(`       Your payment of ${user_input.amount}/-PKR under ${user_input.Company_name} has been done successfully!`));
        }
        else{
            console.log(chalk.red.bold("                        Insufficient balance!"));
        }
        return balance;
    }
    else{
        console.log(chalk.red.bold("                    Account number isn't yours! Please try again"));
        return balance;
    }
}

async function C_Withdraw(balance:number) {
    let user_input= await inquirer.prompt([
        {
            message:chalk.grey("       Enter the amount which has to be withdraw: "),
            name:"W_amount",
            type:"number"
        }
    ])
    if(user_input.W_amount<balance){
        balance-=user_input.W_amount;
        console.log(chalk.greenBright(`         Your amount of ${user_input.W_amount}/-PKR for withdrawal has been done successfully!`));
        return balance;
    }
    else{
        console.log(chalk.red.bold("                        Insufficient balance!"));
        return balance;
    }
}

async function D_Funds(balance:number) {
    let user_input= await inquirer.prompt([
        {
            message:chalk.grey("       Enter the amount which has to be deposit: "),
            name:"D_amount",
            type:"number"
        }
    ])
    if(true){
        balance+=user_input.D_amount;
        console.log(chalk.greenBright(`         Your amount of ${user_input.D_amount}/-PKR for Deposit has been done successfully!`));
        return balance;
    }
}

async function Choices(){
    let choice=await inquirer.prompt([
        {
            message:chalk.bold("Choose what to do or exit: "),
            name:"choice_type",
            choices:[
            chalk.cyanBright.bold("Fund Transfer"),
            chalk.cyanBright.bold("Deposit Funds"),
            chalk.cyanBright.bold("Cash Withdraw"),
            chalk.cyanBright.bold("View Balance"),
            chalk.cyanBright.bold("Bill Payees"),
            chalk.red("Exit")],
            type:"list"
        }
    ])

        if(choice.choice_type===chalk.cyanBright.bold("Fund Transfer")){
            balance=await F_transfer(balance);
            console.log(chalk.yellow.italic(`                         Your remaining balance: ${balance}/- PKR`));
            Choices();
        }
        else if(choice.choice_type===chalk.cyanBright.bold("Deposit Funds")){
            balance=await D_Funds(balance);
            console.log(chalk.yellow.italic(`                         Your remaining balance: ${balance}/- PKR`));
            Choices();
        }
        else if(choice.choice_type===chalk.cyanBright.bold("Cash Withdraw")){
            balance=await C_Withdraw(balance);
            console.log(chalk.yellow.italic(`                         Your remaining balance: ${balance}/- PKR`));
            Choices();
        }
        else if(choice.choice_type===chalk.cyanBright.bold("View Balance")){
            console.log(chalk.yellow.italic(`                         Your remaining balance: ${(balance)}/- PKR`));
            Choices();
        }
        else if(choice.choice_type===chalk.cyanBright.bold("Bill Payees")){
            balance=await B_Pay(balance,account);
            console.log(chalk.yellow.italic(`                         Your remaining balance: ${balance}/- PKR`));
            Choices();    
        }
        else if(choice.choice_type===chalk.red("Exit")){
            let exit=chalkAnimation.rainbow("                               Logging Out...");
            await sleep();
            exit.stop();
        }
}