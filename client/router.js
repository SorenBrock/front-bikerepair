Router.configure({
    layoutTemplate: 'ApplicationLayout'
});

Router.route('/', function () {
    document.title = "bike repair";
    this.render('index');
});

Router.route('/login', {
    template: 'login',
    onBeforeAction: function () {
        if (Meteor.userId())
            this.redirect('/articles');
        else
            this.next();
    }
});

Router.route('/articles', {
    template: 'articles',
    data: function () {
        var result;
        switch (Object.keys(this.params.query)[0]) {
        case "tag":
            result = Article.find({
                tags: {
                    $elemMatch: {
                        _id: this.params.query.tag
                    }
                }
            });
            $('#searchfield').val('');
            break;
        case "category":
            result = Article.find({
                "category._id": this.params.query.category
            });
            $('#searchfield').val('');
            break;
        case "search":
            var search = this.params.query.search;
            var regex = new RegExp(search, 'i');
            console.log(search);
            result = Article.find({
                "$or": [{
                    "category.name": regex
            }, {
                    "name": regex
            }, {
                    "info": regex
            }, {
                    "tags": {
                        $elemMatch: {
                            name: regex
                        }
                    }
                }]
            });
            break;
        default:
            result = Article.find();
        }
        return {
            articles: result
        };
    },
    onBeforeAction: function () {
        if (!Meteor.userId()) {
            this.render('login');
        } else {
            this.next();
        }
    }
});