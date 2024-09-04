import { useState } from 'react'

//Function for rendering headers
const Header = (props) => {
  return (
    <h1>{props.title}</h1>
  )
}

//Function for rendering buttons
const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

//Function for rendering statistics
const StatisticLine = ({ text, counter }) => <div>{text}: {counter}</div>


const Statistics = (props) => {
  if (props.total === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }
  return (
    <div>
      <StatisticLine text={props.textGood} counter={props.good}/>
      <StatisticLine text={props.textNeutral} counter={props.neutral}/>
      <StatisticLine text={props.textBad} counter={props.bad}/>
      <StatisticLine text={"Total feedbacks"} counter={props.total}/>
      <StatisticLine text={"Average of the feedbacks"} counter={props.avg}/>
      <StatisticLine text={"Positive feedbacks"} counter={props.positive}/>
    </div>
  )
}



const App = () => {
  const title = 'Give feedback'
  const stats = 'Statistics'
  const goodText = 'Good'
  const [good, setGood] = useState(0)
  const badText = 'Bad'
  const [bad, setBad] = useState(0)
  const neutralText = 'Neutral'
  const [neutral, setNeutral] = useState(0)
  const [total, setTotal] = useState(0)
  const [average, setAvg] = useState(0)
  const [positive, setPositive] = useState(0)

  const addValueGood = () => {
    console.log('increasing, value of good', good, 'and total', total)
    const updatedGood = good + 1
    setGood(updatedGood)
    const updatedTotal = updatedGood + neutral + bad
    setTotal(updatedTotal) 
    setAvg((updatedGood - bad)/updatedTotal)
    setPositive(updatedGood/updatedTotal*100, ' %')
  }
  
  const addValueNeutral = () => {
    console.log('increasing, value of neutral', neutral, 'and total', total)
    const updatedNeutral = neutral + 1
    setNeutral(updatedNeutral)
    const updatedTotal = good + updatedNeutral + bad
    setTotal(updatedTotal) 
    setAvg((good-bad)/updatedTotal)
    setPositive(good/updatedTotal*100, ' %')
  }

  const addValueBad = () => {
    console.log('increasing, value of bad', bad, 'and total', total)
    const updatedBad = bad + 1
    setBad(updatedBad)
    const updatedTotal = good + neutral + updatedBad
    setTotal(updatedTotal) 
    setAvg((good - updatedBad)/updatedTotal)
    setPositive(good/updatedTotal*100, ' %') 
  }

  return (
    <>
      <Header title={title} />
      <Button
        handleClick={addValueGood}
        text={goodText}
      />
      <Button
        handleClick={addValueNeutral}
        text={neutralText}
      />
      <Button
        handleClick={addValueBad}
        text={badText}
      />
      <Header title={stats} />
      <Statistics
        textGood={goodText}
        textBad={badText}
        textNeutral={neutralText}
        good={good}
        bad={bad}
        neutral={neutral}
        total={total}
        avg={average}
        positive={`${positive} %`}
      />
    </>
  )
}

export default App