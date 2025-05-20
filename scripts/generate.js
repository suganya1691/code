//const faker = require("faker/locale/en_AU");
const path = require("path");
const fs = require("fs");
const { faker } = require('@faker-js/faker');
faker.locale = 'en_AU';

const employeeCount = 11;
const employeeAgeRange = { min: 17, max: 67 };

try {
    // Generate json data
    let employees = [];
    for (let i = 0; i <= employeeCount; i++) {
        const employee = {
            id: faker.number.int({ min: 1000, max: 9999 }),//faker.string.uuid(),
            avatar: faker.image.avatar(),
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            jobTitle: faker.person.jobTitle(),
            contactNo: faker.phone.number('04## ### ###'),
            address: `${faker.
                location.street()} ${faker.location.city()}, ${faker.location.state()}`,
            age: faker.number.int(employeeAgeRange),
            bio: faker.lorem.paragraphs(3),
            dateJoined: faker.date.past(Math.round(Math.random() * 10 + 1)), // 1-10 years ago
        };
        employees.push(employee);
    }

    let companyInfo = {
        companyName: faker.company.name(),
        companyMotto: faker.company.buzzPhrase(),
        companyEst: faker.date.past(Math.round(Math.random() * 20 + 1)), // 1-20 years ago
    };

    // Write object to sample-data.json file
    const sampleData = Object.assign({}, { companyInfo }, { employees });
    const sampleDataPath = path.join(__dirname, "..", "..", "code");
    const sampleDataFilePath = path.join(sampleDataPath, "sample-data.json");

    fs.writeFile(sampleDataFilePath, JSON.stringify(sampleData), err => {
        if (err) throw err;
        console.log("Sample data has been created in ", sampleDataFilePath);
        // exit
        process.exit(0);
    });
} catch (error) {
    throw error;
    process.exit(1);
}
