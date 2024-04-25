const express= require("express")
require("../connect")
const app = express();
const body1=require('body-parser');
const Student1 = require("../connect");
app.use(express.static("public"));
app.use(express.static("views"));
app.set('view engine', 'ejs');
const encoded=body1.urlencoded({extended:false})
app.get("/", (req,res)=>{
    res.render('index.ejs');
})
app.post('/signup',encoded,async (req,res)=>{
    let student = await Student1(req.body);
    student.save()
        .then(() => {
            res.redirect('/login');
        })
        .catch(err => console.log(err))
})

app.get('/index',(req,res) => {
    res.render('index.ejs');
})
app.get('/blog',(req,res) => {
    res.render('blog.ejs');
})
app.get('/contact',(req,res) => {
    res.render('contact.ejs');
})
app.get('/course',(req,res) => {
    res.render('course.ejs');
})
app.get('/home',(req,res) => {
    res.render('home.ejs');
})
app.get('/signup',(req,res) => {
    res.render('signup.ejs');
})

app.get('/login',(req,res)=>{
    res.render('login.ejs')
})
app.post('/loggedin', encoded, async (req,res)=>{
    const username1=req.body.username;
    const password1 = req.body.password;
    Student1.findOne({ fname:username1, password:password1 })
        .then(student => {
            if (student) {
                
                res.redirect('/dashboard');
            } else {
                res.status(401).send('Invalid username or password');
            }
        })
        .catch(error => {
            console.error(error);
            res.status(500).send('Internal Server Error');
        });
})
app.get('/dashboard', (req,res)=>{
    res.send("Welcome User")
})

//Blog code

// Handle blog page rendering
app.get('/blog', (req, res) => {
    // Fetch blog posts and categories from the database or any other source
    // Example:
    const blogPosts = []; // Fetch blog posts
    const categories = []; // Fetch categories

    res.render('blog.ejs', { blogPosts, categories });
});

// Handle comment submission
app.post('/comment', (req, res) => {
    // Process and save the comment to the database
    const { name, email, comment } = req.body;
    // Save comment logic here
    res.redirect('/blog'); // Redirect back to the blog page after comment submission
});

// Additional routes...

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});


app.listen(8082, ()=>{
    console.log("Server is rumming on port 8082")
})