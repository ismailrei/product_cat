var senecaCategory = require("seneca")().client({host: "127.0.0.1",port: 8080})
.use('entity');
var senecaProduct = require("seneca")().client({host: "127.0.0.1",port: 8081})
.use('entity');
var seneca=require("seneca")()
    seneca.use('entity')
    seneca.use(require('seneca-mongo-store'), {
       name:"seneca",
        host:"127.0.0.1",
        port:"27017"
       })
        
        .ready(function(){
             
          var product=this.make$('product');
          var cate1={
              name:"cat1",
              description:"first cat",
          }
          var prod1={
              name:"xx",
              description:"xx",
              category_id:1,
              price:14
          }
          var prod2={
              name:"yy",
              description:"yy",
              
              price:13
          }
          senecaCategory.act({role:"category",action:"fetch"},function(err,prod)
          {
              console.log(prod);
          });
          /*senecaProduct.act({role:"product",action:"fetch",critere:"byCategory",id:"578e4d39916657189a9e59b9"},function(err,prod)
          {
              console.log(prod);
          });
          seneca.act({role:"category",action:"add",category:cate1},function(err,cat)
          {
              prod2.category_id=cat.id;
            seneca.act({role:"product",action:"add",product:prod2},function(err,resp)
          {
              console.log(resp);
          }) 
          })
           seneca.act({role:"product",action:"add",product:prod1},function(err,resp)
          {
              console.log(resp);
          }) 
         product.save$(function (err,prod1) {
                product.load$({id: prod1.id}, function(err, foo) {
                    console.log(foo);
                });
                 console.log( "prod.id = "+prod1.id  )
                 })
                 .save$(function (err,prod2) {
                    
                 console.log( "prod.id = "+prod2.id  )
                 })        
                 product.load$({id:"hawwbb"}, function (err, entity) {console.log(entity)});            
            */  
      })
var app=require("express")()
    .use(require("body-parser").json())
    .use(seneca.export('web'))
    .listen(3000);