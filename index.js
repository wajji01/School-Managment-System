#! /usr/bin/env node
import inquirer from "inquirer";
class student {
    static counter = 1000;
    id;
    name;
    courses;
    balance;
    constructor(name) {
        this.id = student.counter++;
        this.name = name;
        this.courses = [];
        this.balance = 1000;
    }
    enroll_course(course) {
        this.courses.push(course);
    }
    view_balance() {
        console.log(`Balance for ${this.name} : $${this.balance}`);
    }
    pay_fees(amount) {
        this.balance -= amount;
        console.log(`$${amount} fees paid successfully for ${this.name}`);
        console.log(`Your Remaning Balance is $${this.balance}`);
    }
    show_status() {
        console.log(`ID : ${this.id}`);
        console.log(`Name : ${this.name}`);
        console.log(`Courses : ${this.courses}`);
        console.log(`Balance : ${this.balance}`);
    }
}
class student_managment {
    student;
    constructor() {
        this.student = [];
    }
    add_student(name) {
        let students = new student(name);
        this.student.push(students);
        console.log(`Student : ${name} was added successfully. \n Student Id : ${students.id}`);
    }
    enroll_std(std_id, course) {
        let std = this.find_std(std_id);
        if (std) {
            std.enroll_course(course);
            console.log(`${std.name} enrolled in ${course} successfully `);
        }
        else {
            console.log("Please Enter a Valid Student Id");
        }
    }
    std_view_balance(std_id) {
        let std = this.find_std(std_id);
        if (std) {
            std.view_balance();
        }
        else {
            console.log("Please Enter a Valid Student Id");
        }
    }
    std_pay_fees(std_id, amount) {
        let std = this.find_std(std_id);
        if (std) {
            std.pay_fees(amount);
        }
        else {
            console.log("Please Enter a Valid Student Id");
        }
    }
    std_show_status(std_id) {
        let std = this.find_std(std_id);
        if (std) {
            std.show_status();
        }
        else {
            console.log("Please Enter a Valid Student Id");
        }
    }
    find_std(std_id) {
        return this.student.find((std) => std.id === std_id);
    }
}
async function main() {
    console.log(`\n \t\t Pakistan foundation School`);
    console.log(`-`.repeat(60));
    let std_manag = new student_managment();
    while (true) {
        let choice = await inquirer.prompt([
            {
                name: "choice",
                type: "list",
                message: "Select an option",
                choices: [
                    "Add Student",
                    "Enroll Student",
                    "View Student Balance",
                    "Pay Fees",
                    "Show Status",
                    "Exit",
                ],
            },
        ]);
        switch (choice.choice) {
            case "Add Student":
                let std_inp = await inquirer.prompt([
                    {
                        name: "name_std",
                        type: "input",
                        message: "Enter a Student Name : ",
                    },
                ]);
                std_manag.add_student(std_inp.name_std);
                break;
            case "Enroll Student":
                let course_inp = await inquirer.prompt([
                    {
                        name: "std_id",
                        type: "number",
                        message: "Enter a Student ID : ",
                    },
                    {
                        name: "course",
                        type: "input",
                        message: "Enter a Course name : ",
                    },
                ]);
                std_manag.enroll_std(course_inp.std_id, course_inp.course);
                break;
            case "View Student Balance":
                let bal_inp = await inquirer.prompt([
                    {
                        name: "std_id",
                        type: "number",
                        message: "Enter a Student ID : ",
                    },
                ]);
                std_manag.std_view_balance(bal_inp.std_id);
                break;
            case "Pay Fees":
                let fees = await inquirer.prompt([
                    {
                        name: "std_id",
                        type: "number",
                        message: "Enter a Student ID : ",
                    },
                    {
                        name: "amount",
                        type: "number",
                        message: "Enter the amount you pay : ",
                    },
                ]);
                std_manag.std_pay_fees(fees.std_id, fees.amount);
                break;
            case "Show Status":
                let show_status = await inquirer.prompt([
                    {
                        name: "std_id",
                        type: "number",
                        message: "Enter a Student ID : ",
                    },
                ]);
                std_manag.std_show_status(show_status.std_id);
                break;
            case "Exit":
                console.log("Exiting...");
                process.exit();
        }
    }
}
main();
