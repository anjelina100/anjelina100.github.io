import express from 'express';
import Chance from 'chance';

const app = express();
const chance = new Chance();

app.set("view engine", "ejs");
app.use(express.static("public"));

//home.ejs route

app.get('/', (req, res) => {
    let sampleName = chance.name();
    let sampleCity = chance.city();
    let sampleSentence = chance.sentence();

    res.render('home.ejs', { sampleName, sampleCity, sampleSentence });
});


//search.ejs route
app.get('/search', async (req, res) => {
    let name = req.query.name;
    let characters = [];

    if (name) {
        try {
            let url = `https://rickandmortyapi.com/api/character/?name=${name}`;
            let response = await fetch(url);
            let data = await response.json();

            characters = data.results || [];
        } catch (error) {
            characters = [];
        }
    }

    res.render('search.ejs', { characters, name });
});


// random.ejs route

app.get('/random', async (req, res) => {
    let id = Math.floor(Math.random() * 500) + 1;

    let url = `https://rickandmortyapi.com/api/character/${id}`;
    let response = await fetch(url);
    let data = await response.json();

    res.render('random.ejs', { character: data });
});

// locations.ejs route 

app.get('/locations', async (req, res) => {
    let url = `https://rickandmortyapi.com/api/location`;
    let response = await fetch(url);
    let data = await response.json();

    res.render('locations.ejs', { locations: data.results });
});

app.listen(process.env.PORT || 3000, () => {
    console.log('server started');
});