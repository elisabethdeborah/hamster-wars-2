# hamster-wars-2
Hamster-wars, uppgift i kursen dynamisk webbutveckling inlämningsuppgift 2.

Det här är den sista inlämningsuppgiften i kursen, som knyter ihop frontend-delen av kursen med backend-delen i en fullstack-app. Tidigare i kursen hade vi en första inlämning där vi gjorde backend-delen av uppgiften. I backenden använder vi Express och i frontenden React. Cloud-databasen vi använder är Firestore. Appen är publicerad med Heroku.


# Funktioner 

# Tävla: 
Appen går ut på att jämföra två hamstrar i taget och välja den som är sötast. Varje hamster uppdateras sedan utifrån resultatet, och man kan se hur många matcher hamstern vunnit eller förlorat, samt det totala antalet matcher hamstern har deltagit i. 

# Lägg till eller ta bort:
Det går att lägga till en ny hamster via ett formulär, eller ta bort en hamster från databasen.

# Läs info om hamster:
Om man klickar på en hamster i galleriet kan man läsa info om hamstern, som hämtas från databasen.

# Se statistik:
Under "statistik" kan man se de fem hamstar som vunnit flest respektive minst antal matcher.

# Se historik:
Under "historik" kan man se alla tidigare matcher, och radera en match från databasen.

# Jämför två hamstrar:
Om man klickar på två hamstrar under "Jämför två hamstrar" kan man läsa hur många gånger den ena hamstern har vunnit över den andra och vice versa.

# Se fighters and slackers:
Under "Fighters and Slackers" kan man se vilka hamstrar som tävlat flest eller minst antal gånger.


# Level ups
Jag har gjort följande level ups:

3. Jag har använt React Router i projektet.
6. GET /score/:challenger/:defender - Sida Rivalitet: användaren kan välja två hamstrar för att se deras inbördes poängställning.
7. GET /fewMatches, GET /manyMatches - Sida Fighters and slackers: visar de hamstrar som haft flest, respektive minst, matcher.