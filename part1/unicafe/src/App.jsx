import { useState } from 'react'

const Display = (props) => {

  if (props.heading === "positive") {
    return (
      <div>{props.heading} {props.statistic} %</div>
    )
  }

  return (
    <div>{props.heading} {props.statistic}</div>
  )
}



const Button = (props) => {
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}

const Statistics = (props) => {
  const totalFeedback = props.feedback.good + props.feedback.neutral + props.feedback.bad;
  const averageScore = (props.feedback.good + props.feedback.neutral*0 + props.feedback.bad*-1) / totalFeedback;
  const positivePercentage = (props.feedback.good / totalFeedback) * 100;

  if (totalFeedback === 0) {
    return (
      <div>No feedback given</div>
    )
  }

  return(
    <div>
      <table>
        <tbody>
          <Display heading="good" statistic={props.feedback.good} />
          <Display heading="neutral" statistic={props.feedback.neutral} />
          <Display heading="bad" statistic={props.feedback.bad} />
          <Display heading="all" statistic={totalFeedback} />
          <Display heading="average" statistic={averageScore} />
          <Display heading="positive" statistic={positivePercentage} />
        </tbody>
      </table>
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [feedback, setFeedback] = useState({
    good: 0,
    neutral: 0,
    bad: 0
  })

  const handleGood = () => {
    setFeedback({...feedback, good: feedback.good + 1});
  }

  const handleNeutral = () => {
    setFeedback({...feedback, neutral: feedback.neutral + 1});
  }

  const handleBad = () => {
    setFeedback({...feedback, bad: feedback.bad + 1});
  }

  return (
    <div>
      <h2>give feedback</h2>
      <Button handleClick={handleGood} text="good"/>
      <Button handleClick={handleNeutral} text="neutral"/>
      <Button handleClick={handleBad} text="bad"/>
      <h2>statistics</h2>
      <Statistics feedback={feedback} />
      
    </div>
  )
}

export default App