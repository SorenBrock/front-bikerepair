 import {
     Template
 }
 from 'meteor/templating';

 Template.articlelist.helpers({
     Article: function () {
         return Article.find();
     }
 });

 Template.articlelist.events({
     'click #delete': function () {
         var id = this._id.valueOf();
         Meteor.call('removeArticle', id);
     },
     'click #edit': function () {
         Router.go('/admin/articleedit/' + this._id.valueOf());
     },
     'click #create': function () {
         Router.go('/admin/articlecreate');
     }
 });

 Template.articleedit.helpers({
     categories: function () {
         return Category.find();
     },
     tags: function () {
         return Tag.find();
     },
     selected: function () {
         return this._id == Session.get('selectedArticle').category._id ? 'selected' : '';
     },
     checked: function () {
         // not proud :( - forsøgte med find -> lambdaexpressions og $.grep og map 
         // -  knas i maskineriet!?! - derfor denne ikke-så-elegante-løsning
         var lookup = {},
             array = Session.get('selectedArticle').tags;
         for (var i = 0, len = array.length; i < len; i++) {
             lookup[array[i]._id] = array[i];
         }
         return lookup[this._id] ? 'checked' : 'false';
     }
 });

 Template.articleedit.events({
     'submit form': function (e) {
         e.preventDefault();
         var id = this._id.valueOf(),
             name = e.target.name.value,
             info = e.target.info.value,
             active = e.target.active.checked,
             category = Category.findOne({
                 _id: e.target.category.value
             }),
             tagarray = [];
         $("input[name=tags]:checked").map(function () {
             tagarray.push(Tag.findOne({
                 _id: this.value
             }));
         });
         Meteor.call('updateArticle', id, name, info, category, tagarray, active);
         Router.go('/admin/articlelist');
     },
     'click #cancel': function () {
         Router.go('/admin/articlelist');
     }
 });

 Template.articlecreate.helpers({
     categories: function () {
         return Category.find();
     },
     tags: function () {
         return Tag.find();
     }
 });

 Template.articlecreate.events({
     'submit form': function (e) {
         e.preventDefault();
         var name = e.target.name.value,
             info = e.target.info.value,
             active = e.target.active.checked,
             category = Category.findOne({
                 _id: e.target.category.value
             }),
             tagarray = [];
         $("input[name=tags]:checked").map(function () {
             tagarray.push(Tag.findOne({
                 _id: this.value
             }));
         });
         Meteor.call('insertArticle', name, info, category, tagarray, active);
         Router.go('/admin/articlelist');
     },
     'click #cancel': function (e) {
         Router.go('/admin/articlelist');
     }
 });

 Template.categorylist.helpers({
     Category: function () {
         return Category.find();
     }
 });

 Template.categorylist.events({
     'click #delete': function () {
         var id = this._id.valueOf();
         Meteor.call('removeCategory', id);
     },
     'click #edit': function () {
         Router.go('/admin/categoryedit/' + this._id.valueOf());
     },
     'click #create': function () {
         Router.go('/admin/categorycreate');
     }
 });

 Template.categoryedit.events({
     'submit form': function (e) {
         e.preventDefault();
         var id = this._id.valueOf(),
             name = e.target.name.value,
             info = e.target.info.value,
             active = e.target.active.checked;
         Meteor.call('updateCategory', id, name, info, active);
         Router.go('/admin/categorylist');
     },
     'click #cancel': function () {
         Router.go('/admin/categorylist');
     }
 });

 Template.categorycreate.events({
     'submit form': function (e) {
         e.preventDefault();
         var name = e.target.name.value,
             info = e.target.info.value,
             active = e.target.active.checked;
         Meteor.call('insertCategory', name, info, active);
         Router.go('/admin/categorylist');
     },
     'click #cancel': function (e) {
         Router.go('/admin/categorylist');
     }
 });

 Template.taglist.helpers({
     Tag: function () {
         return Tag.find();
     }
 });

 Template.taglist.events({
     'click #deleteTag': function () {
         var id = this._id.valueOf();
         Meteor.call('removeTag', id);
     },
     'click #editTag': function () {
         Router.go('/admin/tagedit/' + this._id.valueOf());
     },
     'click #createTag': function () {
         Router.go('/admin/tagcreate');
     }
 });

 Template.tagedit.events({
     'submit form': function (e) {
         e.preventDefault();
         var id = this._id.valueOf(),
             name = e.target.name.value,
             active = e.target.active.checked;
         Meteor.call('updateTag', id, name, active);
         Router.go('/admin/taglist');
     },
     'click #cancel': function () {
         Router.go('/admin/taglist');
     }
 });

 Template.tagcreate.events({
     'submit form': function (e) {
         e.preventDefault();
         var name = e.target.name.value,
             active = e.target.active.checked;
         Meteor.call('insertTag', name, active);
         Router.go('/admin/taglist');
     },
     'click #cancel': function (e) {
         Router.go('/admin/taglist');
     }
 });

 Template.main.events({
     'click #login-button-logout': function () {
         Meteor.logout();
     }
 });

 Template.loginPage.events({
     'submit #login-form': function (e, t) {
         e.preventDefault();
         var email = e.target.loginemail.value,
             password = e.target.loginpassword.value;
         Meteor.loginWithPassword(email, password, function (err) {
             if (err)
                 console.log('errorlogin');
             else
                 console.log('successlogin');
         });
         return false;
     }
 });


 Template.articles.helpers({
     tag: function () {
         return Tag.find();
     },
     category: function () {
         return Category.find();
     }
 });