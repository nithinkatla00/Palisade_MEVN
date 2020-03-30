if(process.env.NODE_ENV === 'production'){
    module.exports = {
<<<<<<< HEAD
        mongoURI: "mongodb+srv://nithinkatla00:katlanithin333@cluster0-rl7sa.mongodb.net/test?retryWrites=true&w=majority",
=======
        database: 'mongodb+srv://nithinkatla00:katlanithin333@@cluster0-rl7sa.mongodb.net/test?retryWrites=true&w=majority',
>>>>>>> d11e7145cf7292b0ae721734b9764103b5818f69
        secret: 'yoursecret'
    };
}else{
    module.exports = {
        database: 'mongodb://localhost:27017/posts',
        secret: 'yoursecret'
    };
}
