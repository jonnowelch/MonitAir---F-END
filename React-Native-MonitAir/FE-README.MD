# Welcome to the ReadMe for the back-end of monitAir

http://brejconies.pythonanywhere.com/reading/${sensor_id}?measurement=${query}&lower_limit=${date}&upper_limit=${date}

This is a server allowing us to access air quality index, mean temperature and humidity readings for a selected sensor at a selected time range

## Cloning:

In order to clone this project go to https://github.com/GustavHolst/MonitAir-back-end Fork the project then go to the appropriate directory in your terminal then use:

git clone https://github.com/GustavHolst/MonitAir-back-end

## Things to download:

To get started you will need to installl node from https://nodejs.org/en/download/

The following commands are to be run in your terminal:

1. You will need to download axios with dev dependencies using 'npm install axios -D'

2. React Native and Expo can be installed with: 'npm install -g expo-cli' and when prompted, choose to initialise with Typescript

3. For Firebase:
   Install firebase command line using npm install -g firebase-tools.
   Run firebase init and enter your-web-site name.
   Run npm start , and it will populate the dist folder with your site.
   Choose dist as your main directory for Firebase.
   Install a local server using npm install -g serve .

4. For Victory Charts run: 'npm install --save victory-native'

## On your phone

Install the 'Expo Client' app

## In your Source Code Editor

Next you should run 'npm install' to install the correct dependencies you can find in the package.JSON. This will also give you access to the scripts.

To run the app, type 'npm start' and scan the QR code and the app will load on your device automatically. Then you can follow the onscreen instructions to create an account.

Thank you for taking the time to read this and look through our code from the monitAir team.
