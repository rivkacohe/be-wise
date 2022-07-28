# be-wise

Mini CRM project aimed at managing Lecturers & Courses.

Tech Stack
Node.js
Express.js
MySQL
nodemon
Angular
Prepare The Environment
Create a new MySQL database including 4 tabels: Lecturers, Courses, Categories and Studemts.
See tables strocture on tabels_strocture.docx file..
Clone project in vscode: https://github.com/rivkacohe/be-wise.git
Install dependencies in vscode terminal: npm install
Install nodemon globally: npm i -g nodemon and update package.json accordingly.
In project, add configuration file: config/dev.js containing the database connection details.
In project, add folder exports.
Install dependencies for Angular client:
cd client-angular
npm install
Run The App
Run the server:
Windows: set DEBUG=royal-crm:*; & npm start
MacOS/Linux: DEBUG=royal-crm:* npm start
Run the client:
cd client-angular
ng serve