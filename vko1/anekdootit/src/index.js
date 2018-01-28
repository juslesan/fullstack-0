import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: 0
    }
  }
  

    anecdote = () => {
        this.setState({ selected: Math.floor((Math.random() * 6 )) })
    }

    vote = () => {
        votes[this.state.selected] += 1
        this.setState({ selected: this.state.selected })
    }   
  

    render() {
      return (
        <div>
            {this.props.anecdotes[this.state.selected]}<br/>
            <p>Has {votes[this.state.selected]} votes</p>
            <Button func={this.anecdote} text="next anecdote" />
            <Button func={this.vote} text="vote" /><br/>
            <h4>The anecdote with the most votes</h4>
            {Math.max(...votes) !== 0 ? 
                (<p>{anecdotes[Math.max(votes.indexOf(Math.max(...votes)))]}</p>)
                : (<p>No votes yet</p>)}
        </div>
    )
  }
}
const votes = [0, 0, 0, 0, 0, 0]

const Button = (props) => (
    <button onClick={props.func}>{props.text}</button>
)

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]
ReactDOM.render(
    <App anecdotes={anecdotes} />,
    document.getElementById('root')
  )