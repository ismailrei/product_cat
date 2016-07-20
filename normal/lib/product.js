var product=function(options)
{
    var seneca=this;
    function searchCat(Id)
    {
        seneca.act({role:"category",action:"fetch",critere:"byId",id:Id},function(err,category)
            {
                return category;
            });
    }
    seneca.add({role:"product",action:"add"},function(args,done){
        var produit=seneca.make("products");
        produit.name=args.product.name;
        produit.description=args.product.description;
        produit.category_id=args.product.category_id;
        product.price=args.product.price;
        produit.save$(function(err,prod){
            done(null,produit.data$(false));
        });
    })
        .add({role:"product",action:"fetch"},function(args,done)
        {
            var products=seneca.make("products");
            /*products.list$({},function(err,list)
            {
                list.forEach(function(element) {
                    var Category=searchCat(element.category_id);    
                });
            })*/
            products.list$({},done);
        })
        .add({role:product,action:"fetch",critere:"byCategory"},function(args,done)
        {
            var products=seneca.make("products");
           
            products.list$({category_id:args.id},done);
        })
        .add({role:"product",action:"fetch",critere:"byId"},function(args,done){
            var produit=seneca.make("products");
            produit.load$(args.id,done);
        })
        .add({role:"product",action:"edit"},function(args,done)
        {
            seneca.act({role:"product",action:"fetch",critere:"byId",id:args.id},function(err,product){
                product.data$({
                    description:args.description,
                    category_id:args.category_id,
                    price:args.price
                });
                product.save$(function(err,prod)
                 {
                    done(prod.data$(false));
                 });
            });
        });

}
module.exports=product;

var seneca=require("seneca")()
    .use('entity')
    .use("product")
    .use(require('seneca-mongo-store'), {
       name:"seneca",
        host:"127.0.0.1",
        port:"27017"
       })
    .listen({port:8081,
            host:'127.0.0.1',type:'tcp'});
