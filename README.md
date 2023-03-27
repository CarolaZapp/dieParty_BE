# BE_dieParty

This Fullstack final project is devided in two parts...

- BE_dieParty - Backend-Part - MVP-Version
- FE_dieParty - Frontend-Part - MVP-Version

This project offer you a digital party preparation with
an event homepage and an event page for the client and her/ his guests.

dieP@rty gives your event a digital frame in any format...
Use our stylish design templates for your full-screen invitation & thank you note.
Guest lists & response management complete the package

- Event homepage for the client:
  - Use of design templates and creation of personalised invitation & thank you note
  - Creation of guest list / display of guest list on event homepage
  - Display of guest feedback on event homepage:
    Overview status of participating guests, required accommodations, required menus
    Customer action: Registration for the event homepage
    Customer action: Login for the event homepage
    Customer action: Creation of guest list
    Customer action: Personalisation of invitation / thank you note
    Customer action: Send invitation e-mail with link of invitatation page
- Event page for the client and her/his guests
  - Display of personalised invitation
  - Display reply form
  - Display thank you note after the event
    Guest action: fill in the reply form

## Used technologies

- backend:
  - mongoDB
  - mongoose
  - express.js
  - node.js
  - dotenv
  - bcrypt
  - jsonwebtoken
  - cookieParser
  - @sendgrid/mail
  - morgan

- upload storage:
  - firebase

- frontend:
  - html5
  - css3
  - javaScript.js
  - react.js

- other:
  - miro
  - figma
  - CorelDraw
  - Github
  - Github-Projects
  - Pixabay-Pictures

## Some open points planned or under development:

- Digital guestbook template
- Creation of personalised guestbook
- Digital picture galerie
- Creation of personalised picture galerie
- Expansion of the range of design templates for various events
  - Anniversary
  - Wedding anniversary...
- Extension of the offer of different design templates for one event
  - Design 1
  - Design 3...
- Personalisation of the design
  - with own client photos (upload)
  - font selection
  - choice of colours ...
- Selection of the guestbook design
  - Design 1
  - Design 3...
- Selection of the picture gallery - design
  - Design 1
  - Design 3
  - and, and, and ...

## Folder structure backend:

- controller
- middleware
- models
- routes

## To start backend:

- create .env file with 6 Variables:
  PORT = Port for your localhost backend
  MONGODB = Insert Your MongoDB URI
  SECRET_JWT_KEY = Create a string by yourself
  SENDGRID_API_KEY= Insert your sendgrid API Key
  HOST= server IP

- Type in terminal
  - npm i
  - node server.js

### The Frontend README pls. see under FE_dieParty
