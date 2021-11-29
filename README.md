# test-dna

This project is about check mutation dna. 

# Install

Please, use **npm install** for create node_modules folder.


# MongoDB database

You can switch connection from MondoDB Atlas to MongoDB Local in **src/services/mongodb.js**

# Run dev

You can choise two option:
Dev:
- **npx nodemon**
- **npm run dev**

# Run in production

Use **npm start**

# Routes

1. **POST: /mutation/** : Need to pass a JSON with a NxN matrix like this:
{“dna”:["ATGCGA","CAGTGC","TTATGT","AGAAGG","CCCCTA","TCACTG"]}
2. **GET: /stats**: Return stadistic about mutation dna checked.  

# About a mutation DNA

A mutation DNA happens when:
1. All characters of each string of the array are: A,T,G o C.
2. Have 2 secuence of 4 characters equals.
3. The directions posibles are horizontal, vertical, diagonal and diagonal reverse

# Test

You can test the api REST in this routes:
1. http://45.132.240.5:3000/mutation
2. http://45.132.240.5:3000/stats