import * as readline from 'readline';
import * as crypto from 'crypto';

class Student {
    name: string;
    student_id: string;
    courses: string[];
    balance: number;

    constructor(name: string) {
        this.name = name;
        this.student_id = this.generateStudentId();
        this.courses = [];
        this.balance = 0;
    }

    private generateStudentId(): string {
        const randomBytes = crypto.randomBytes(2); // Generate 2 random bytes
        const studentId = randomBytes.readUInt16BE(0); // Convert bytes to a random integer
        return studentId.toString();
    }

    enroll(course: string): void {
        this.courses.push(course);
        console.log(`${this.name} has enrolled in ${course}`);
    }

    viewBalance(): void {
        console.log(`Balance for ${this.name}: $${this.balance}`);
    }

    payTuition(amount: number): void {
        this.balance -= amount;
        console.log(`Paid $${amount} towards tuition for ${this.name}`);
        this.viewBalance();
    }

    showStatus(): void {
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

const students: Student[] = [];
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function printHeading(heading: string): void {
    console.log(`\x1b[1;32m${heading}\x1b[0m`);
}

function main() {
    printHeading("Welcome to the Student Management System! 🎓📚");

    rl.question("\nStudent Management System Menu:\n1. Add Student\n2. Enroll Student in a Course\n3. View Student Balance\n4. Pay Tuition Fees\n5. Show Student Status\n6. Exit\nEnter your choice: ", (choice: string) => {
        switch (choice) {
            case '1':
                rl.question("Enter student name: ", (name: string) => {
                    const student = new Student(name);
                    students.push(student);
                    console.log(`Student ${name} added with ID ${student.student_id}`);
                    main();
                });
                break;

            case '2':
                rl.question("Enter student ID: ", (studentId: string) => {
                    rl.question("Enter course name: ", (course: string) => {
                        const student = students.find(s => s.student_id === studentId);
                        if (student) {
                            student.enroll(course);
                        } else {
                            console.log("Student not found!");
                        }
                        main();
                    });
                });
                break;

            case '3':
                rl.question("Enter student ID: ", (studentId: string) => {
                    const student = students.find(s => s.student_id === studentId);
                    if (student) {
                        student.viewBalance();
                    } else {
                        console.log("Student not found!");
                    }
                    main();
                });
                break;

            case '4':
                rl.question("Enter student ID: ", (studentId: string) => {
                    rl.question("Enter the amount to pay: ", (amountStr: string) => {
                        const amount = parseFloat(amountStr);
                        const student = students.find(s => s.student_id === studentId);
                        if (student) {
                            student.payTuition(amount);
                        } else {
                            console.log("Student not found!");
                        }
                        main();
                    });
                });
                break;

            case '5':
                rl.question("Enter student ID: ", (studentId: string) => {
                    const student = students.find(s => s.student_id === studentId);
                    if (student) {
                        student.showStatus();
                    } else {
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
