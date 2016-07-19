var category=function (options){
    var seneca=this;
    seneca.add({role:"category",action:"add"},function(args,done){
        var category=seneca.make("categories");
        category.name=args.category.name;
        category.description=args.category.description;
        category.save$(function(err,cat)
        {
            done(err,category.data$(false));
        });
    })
        .add({role:"category",action:"fetch"},function(args,done){
            var categories=seneca.make("categories");
            categories.list$({},done);
        })
        .add({role:"category",action:"fetch",critere:"byId"},function(args,done){
            var categories=seneca.make("categories");
            categories.load$(args.id,done);
        })
        .add({role:"category",action:"delete"},function(args,done){
            var category=seneca.make("categories");
            categories.remove(args.id,function(err)
            {
                donne(err,null);
            });
        })
        .add({role:"category",action:"edit"},function(args,done){
            seneca.act({role:"category",action:"fetch",critere:"byId",id:args.id},function(err,category)
            {
                category.data$(
                    {
                        name:args.category.name,
                        description:args.category.description
                    });
                    category.save$(function(err,cat)
                    {
                        done(cat.data$(false));
                    });
            });
        });
}
module.exports=category;

var seneca=require("seneca")()
    .use('entity')
    .use(require('seneca-mongo-store'), {
       name:"seneca",
        host:"127.0.0.1",
        port:"27017"
       })
    .use("category")
    .listen({port:8080,
            host:'127.0.0.1'});
