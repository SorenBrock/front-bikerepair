import {
    Template
}
from 'meteor/templating';

Template.articles.events({
    'submit form': function (e) {
        e.preventDefault();
        Router.go('/articles/?search=' + e.target.searchfield.value);
    }
});

Template.articles.helpers({
    alltags: function () {
        return Tag.find();
    },
    allcategories: function () {
        return Category.find();
    }
});

Template.ApplicationLayout.events({
    'click #login-button-logout': function () {
        Meteor.logout();
        Router.go('/');
    }
});

Template.login.events({
    'submit #login-form': function (e, t) {
        e.preventDefault();
        var email = e.target.loginemail.value,
            password = e.target.loginpassword.value;
        Meteor.loginWithPassword(email, password, function (err) {
            if (!err) {
                Router.go('/articles');
            }
        });
        return false;
    }
});