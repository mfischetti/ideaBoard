var Idea = React.createClass({
    rawMarkup: function() {
        var md = new Remarkable();
        var rawMarkup = md.render(this.props.children.toString());
        return { __html: rawMarkup };
    },
    render: function() {
        return (
        <div className="idea">
            <h2 className="ideatitle">
            {this.props.title}
            </h2>
            <span dangerouslySetInnerHTML={this.rawMarkup()} />
        </div>
        );
    }
});

var IdeaBox = React.createClass({
    //on submit post json data to server 
    handleIdeaSubmit: function(idea) {
        var ideas = this.state.data;
        idea.id = Date.now();
        var newIdeas = ideas.concat([idea]);
        this.setState({data: newIdeas});
        $.ajax({
        url: this.props.url,
        dataType: 'json',
        type: 'POST',
        data: idea,
        success: function(data) {
            this.setState({data: data});
        }.bind(this),
        error: function(xhr, status, err) {
            this.setState({data: ideas});
            console.error(this.props.url, status, err.toString());
        }.bind(this)
        });
    },
    getInitialState: function() {
        return {data: []};
    },
    render: function() {
        return (
        <div className="ideaBox">
            <h1>New Idea</h1>
            <IdeaForm onIdeaSubmit={this.handleIdeaSubmit} />
        </div>
        );
    }
});

var IdeaForm = React.createClass({
    getInitialState: function() {
        return {title: '', text: ''};
    },
    handletitleChange: function(e) {
        this.setState({title: e.target.value});
    },
    handleTextChange: function(e) {
        this.setState({text: e.target.value});
    },
    handleSubmit: function(e) {
        e.preventDefault();
        var title = this.state.title.trim();
        var text = this.state.text.trim();
        if (!text || !title) {
        return;
        }
        this.props.onIdeaSubmit({title: title, text: text});
        this.setState({title: '', text: ''});
    },
    render: function() {
        return (
        <form className="ideaForm" onSubmit={this.handleSubmit}>
            <input className="inputitle"
            type="text"
            placeholder="Idea Title"
            value={this.state.title}
            onChange={this.handletitleChange}
            />
            <input className="inputtext"
            type="text"
            placeholder="Whats your idea?"
            value={this.state.text}
            onChange={this.handleTextChange}
            />
            <input className="ideaButton" type="submit" value="Post"/>
        </form>
        );
    }
});

ReactDOM.render(
    <IdeaBox url="/idea" pollInterval={2000} />,
    document.getElementById('ideaForm')
);