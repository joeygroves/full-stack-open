import { useState } from 'react'

const Display = props => <div>{props.heading} {props.statistic}</div>

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => {
    setGood(good + 1);
    console.log('new good value', good + 1);
  }

  const handleNeutral = () => {
    setNeutral(neutral + 1);
    console.log('new neutral value', neutral + 1);
  }

  const handleBad = () => {
    setBad(bad + 1);
    console.log('new bad value', bad + 1);
  }

  return (
    <div>
      <h2>give feedback</h2>
      <Button handleClick={handleGood} text="good"/>
      <Button handleClick={handleNeutral} text="neutral"/>
      <Button handleClick={handleBad} text="bad"/>
      <h2>statistics</h2>
      <Display heading="good" statistic={good} />
      <Display heading="neutral" statistic={neutral} />
      <Display heading="bad" statistic={bad} />
    </div>
  )
}

export default App