"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const readline = __importStar(require("readline"));
const crypto = __importStar(require("crypto"));
class Student {
    constructor(name) {
        this.name = name;
        this.student_id = this.generateStudentId();
        this.courses = [];
        this.balance = 0;
    }
    generateStudentId() {
        const randomBytes = crypto.randomBytes(2); // Generate 2 random bytes
        const studentId = randomBytes.readUInt16BE(0); // Convert bytes to a random integer
        return studentId.toString();
    }
    enroll(course) {
        this.courses.push(course);
        console.log(`${this.name} has enrolled in ${course}`);
    }
    viewBalance() {
        console.log(`Balance for ${this.name}: $${this.balance}`);
    }
    payTuition(amount) {
        this.balance -= amount;
        console.log(`Paid $${amount} towards tuition for ${this.name}`);
        this.viewBalance();
    }
    showStatus() {
        console.log(`\x1b[1;32mStudent Status:\x1b[0m`);
        console.log(`Student ID: ${this.student_id}`);
        console.log(`Name: ${this.name}`);
        console.log("Courses Enrolled:");
        for (const course of this.courses) {
            console.log(`- ${course}`);
        }
        this.viewBalance();
    }
}
const students = [];
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
function printHeading(heading) {
    console.log(`\x1b[1;32m${heading}\x1b[0m`);
}
function main() {
    printHeading("Welcome to the Student Management System! 🎓📚");
    rl.question("\nStudent Management System Menu:\n1. Add Student\n2. Enroll Student in a Course\n3. View Student Balance\n4. Pay Tuition Fees\n5. Show Student Status\n6. Exit\nEnter your choice: ", (choice) => {
        switch (choice) {
            case '1':
                rl.question("Enter student name: ", (name) => {
                    const student = new Student(name);
                    students.push(student);
                    console.log(`Student ${name} added with ID ${student.student_id}`);
                    main();
                });
                break;
            case '2':
                rl.question("Enter student ID: ", (studentId) => {
                    rl.question("Enter course name: ", (course) => {
                        const student = students.find(s => s.student_id === studentId);
                        if (student) {
                            student.enroll(course);
                        }
                        else {
                            console.log("Student not found!");
                        }
                        main();
                    });
                });
                break;
            case '3':
                rl.question("Enter student ID: ", (studentId) => {
                    const student = students.find(s => s.student_id === studentId);
                    if (student) {
                        student.viewBalance();
                    }
                    else {
                        console.log("Student not found!");
                    }
                    main();
                });
                break;
            case '4':
                rl.question("Enter student ID: ", (studentId) => {
                    rl.question("Enter the amount to pay: ", (amountStr) => {
                        const amount = parseFloat(amountStr);
                        const student = students.find(s => s.student_id === studentId);
                        if (student) {
                            student.payTuition(amount);
                        }
                        else {
                            console.log("Student not found!");
                        }
                        main();
                    });
                });
                break;
            case '5':
                rl.question("Enter student ID: ", (studentId) => {
                    const student = students.find(s => s.student_id === studentId);
                    if (student) {
                        student.showStatus();
                    }
                    else {
                        console.log("Student not found!");
                    }
                    main();
                });
                break;
            case '6':
                console.log("Exiting the program. Goodbye! 👋");
                rl.close();
                break;
            default:
                console.log("Invalid choice. Please try again.");
                main();
                break;
        }
    });
}
if (require.main === module) {
    main();
}
