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

var IdeaOut = React.createClass({
  loadIdeasFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    this.loadIdeasFromServer();
    setInterval(this.loadIdeasFromServer, this.props.pollInterval);
  },
  render: function() {
    return (
      <div className="ideaOut">
        <h1>Ideas</h1>
        <IdeaList data={this.state.data} />
      </div>
    );
  }
});

var IdeaList = React.createClass({
  render: function() {
    var ideaNodes = this.props.data.map(function(idea) {
      return (
        <Idea title={idea.title} key={idea._id}>
          {idea.text}
        </Idea>
      );
    });
    return (
      <div className="ideaList">
        {ideaNodes}
      </div>
    );
  }
});

ReactDOM.render(
  <IdeaOut url="/idea" pollInterval={2000} />,
  document.getElementById('ideaList')
);