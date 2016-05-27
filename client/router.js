Router.route('/', function () {
     document.title = "bike repair";
    this.layout('frontLayout');
    this.render('index');
});


Router.route('/articles', {
    layoutTemplate: 'frontLayout',
    template: 'articles'
});



Router.route('admin', function () {
    document.title = "bike repair | admin";
    this.layout('ApplicationLayout');
    this.render('main');
});

Router.route('admin/articlelist', {
    layoutTemplate: 'ApplicationLayout',
    template: 'articlelist'
});

Router.route('admin/articlecreate', {
    layoutTemplate: 'ApplicationLayout',
    template: 'articlecreate'
});

Router.route('admin/articleedit/:_id', {
    layoutTemplate: 'ApplicationLayout',
    template: 'articleedit',
    data: function () {
        var article = Article.findOne({
            _id: this.params._id
        });
        Session.set('selectedArticle', article);
        return {
            article: article
        };
    }
});

Router.route('admin/taglist', {
    layoutTemplate: 'ApplicationLayout',
    template: 'taglist'
});

Router.route('admin/tagcreate', {
    layoutTemplate: 'ApplicationLayout',
    template: 'tagcreate'
});

Router.route('admin/tagedit/:_id', {
    layoutTemplate: 'ApplicationLayout',
    template: 'tagedit',
    data: function () {
        return {
            tag: Tag.findOne({
                _id: this.params._id
            }),
        };
    }
});

Router.route('admin/categorylist', {
    layoutTemplate: 'ApplicationLayout',
    template: 'categorylist'
});

Router.route('admin/categorycreate', {
    layoutTemplate: 'ApplicationLayout',
    template: 'categorycreate'
});

Router.route('admin/categoryedit/:_id', {
    layoutTemplate: 'ApplicationLayout',
    template: 'categoryedit',
    data: function () {
        return {
            category: Category.findOne({
                _id: this.params._id
            }),
        };
    }
});