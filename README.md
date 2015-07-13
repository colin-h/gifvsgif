# Gif vs Gif
A simple one-page web application to run a constant poll on the two pronunciations of "Gif."

## The Stack

- Node/Express
- SQL
- Angular
- Foundation

Node-Express for quick server initialization. To get started, run

``` node app.js ```

SQL for relational data when keeping track of user API keys. We want to know who has voted and who hasn't

## Database Schema

### Users
id | apiKey
------------
0  | dk234iadk87dfDIdapdid87

###Counters
id | count
------------
0  |  23
1  |  46


Angular for quick rendering of our two counters. The natural speed decrease of Angular is negligible here because
we have few properties.

Foundation for prestyled classes.


The app will make use of Passport for OAuth services. A user will be able to login with github, facebook, or twitter,
to send their votes. Each user who casts a vote will only be able to do so once. Security on this issue pending. Once
they submit their vote the counter will increment with Angular's dirty checking.

As more votes are cast, we will discover which pronunciation will reign.