if(process.env.NODE_ENV === 'production'){
    module.exports = {
        database: 'mongodb+srv://nithinkatla00:katlanithin333@@cluster0-rl7sa.mongodb.net/test?retryWrites=true&w=majority',
        secret: 'yoursecret'
    };
}else{
    module.exports = {
        database: 'mongodb://localhost:27017/posts',
        secret: 'yoursecret'
    };
}
