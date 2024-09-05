import { useState } from 'react'

//Function for rendering headers
const Header = (props) => {
  return (
    <h1>{props.title}</h1>
  )
}

//Function for rendering anecdotes
const Anecdote = (props) => {
  return (
    <div>{props.anecdotes}</div>
  )
}

//Function for rendering votes
const Votes = (props) => {
  return (
    <div>Has votes: {props.votes}</div>
  )
}

//Function for rendering buttons
const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

// Main application component for handling and displaying anecdotes and votes
const App = () => {
  //variables
  const title = 'Anecdotes to code like a pro'
  const winner = 'Anecdote with most votes'
  const noVotes = 'There is no votes yet'

  //array of anecdotes
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]

  //array of points
  const [points, setPoints] = useState([0, 0, 0, 0, 0, 0, 0, 0])

  //for showing selected anecdote
  const [selected, setSelected] = useState(0)

  //function which gives random integer between given min and max value
  const randomNumberInRange = (min, max) => {
     const randomNum = Math.floor(Math.random() * (max - min + 1)) + min
     //console.log('random number: ', randomNum)
     return randomNum
  }

  //for showing random anecdote and it is called by pushing Next anecdote button 
  const randomAnecdote = () => {
    setSelected(randomNumberInRange(0, 7));
  }

  //function for adding votes for anecdote in array
  const voteAnecdote = () => {
    const copy = [...points]
    copy[selected] += 1
    setPoints(copy)
    //console.log(copy)
  }

  //for getting index for anecdote that has most votes
  const maxPoints = Math.max(...points)
  const maxPointsIndex = points.indexOf(maxPoints)

  // Returning UI components to display headers,anecdotes, buttons and votes
  return (
    <div>
      <Header title={title} />
      <Anecdote anecdotes={anecdotes[selected]} />
      <Votes votes={points[selected]}/>
      <Button
        handleClick={voteAnecdote}
        text={"Vote"}
      />
      <Button
        handleClick={randomAnecdote}
        text={"Next anecdote"}
      />
       <Header title={winner} />
       <Anecdote anecdotes={points.every(value => value === 0) ? noVotes :anecdotes[maxPointsIndex]} />
    </div>
  )
}

export default App
