import express from 'express';
const planets = (await import('npm-solarsystem')).default;

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));

//routes
//root route
app.get('/', async(req, res) => {
   const url = "https://pixabay.com/api/?key=5589438-47a0bca778bf23fc2e8c5bf3e&per_page=50&orientation=horizontal&q=solar%20system";
   const response = await fetch(url);
   let data = await response.json();
   let num = Math.floor(Math.random() * 50);
   let randImg = data.hits[num].webformatURL;
   res.render('home.ejs', {randImg})
});

app.get('/planetInfo', (req, res) => {
    let planet = req.query.planet;
    let planetInfo = planets[`get${planet}`]();
    res.render('planet.ejs', {planetInfo, planet})
});
app.get('/nasa', async (req, res) => {
   let image = req.query.image;
   let today = new Date();
   let yr = today.getFullYear();
   let month = today.getMonth() + 1;
   let day = today.getDate();

   if (month < 10) {
      month = "0" + month;
   }
   if (day < 10) {
      day = "0" + day;
   }

    const url = `https://api.nasa.gov/planetary/apod?api_key=9mUzIkhlZCZaOoMfspg7jMmwZCZ4LiRHtkgkambD&date=${yr}-${month}-${day}`;
    const response = await fetch(url); 
    let data = await response.json();
    console.log(data);
    let nasaInfo = data;
    res.render('nasa.ejs', {nasaInfo} )
});


//app.get('/mercury', (req, res) => {
//    let mercuryInfo = planets.getMercury();
//    console.log(mercuryInfo);
//    res.render('mercury.ejs', {mercuryInfo})
//});


app.listen(3000, () => {
   console.log('server started');
});
