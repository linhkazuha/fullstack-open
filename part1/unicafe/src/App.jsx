import { useState } from 'react'


const Button = (props) => {
  return (
    <button onClick={() => props.setButton(current => current + 1)}>
      {props.feedbackType}
    </button>
  )
}

const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.feedbackType}</td>
      <td>{props.numberOfFeedback}{props.unit}</td>
    </tr>

  )

}

const Statistics = (props) => {
  const total = props.good + props.neutral + props.bad
  let avg, pos_percent
  if (total !== 0) {
    avg = (props.good - props.bad) / total
    pos_percent = props.good / total * 100
  } else {
    avg = 0
    pos_percent = 0
  }

  return (
    <table>
      <tbody>
      <StatisticLine feedbackType="Good" numberOfFeedback={props.good} />
      <StatisticLine feedbackType="Neutral" numberOfFeedback={props.neutral} />
      <StatisticLine feedbackType="Bad" numberOfFeedback={props.bad} />
      <StatisticLine feedbackType="All" numberOfFeedback={total} />
      <StatisticLine feedbackType="Average" numberOfFeedback={avg} />
      <StatisticLine feedbackType="Positive" numberOfFeedback={pos_percent} unit = "%" />

      </tbody>
    </table>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const total = good + neutral + bad

  return (
    <div>
      <Button feedbackType="Good" setButton={setGood} />
      <Button feedbackType="Neutral" setButton={setNeutral} />
      <Button feedbackType="Bad" setButton={setBad} />
      {total === 0 ? (
        <p>No feedback given</p>
      ) : (
        <>

          <Statistics
            good={good}
            neutral={neutral}
            bad={bad} />
        </>
      )}

    </div>
  )
}

export default App