const Course = ({ course }) => {
  return(
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total sum={course.parts}/>
    </div>
  )
}

const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ sum }) => {
  const total = sum.map(sums => sums.exercises)
  console.log(total)
  const reduceSum = total.reduce((accumulator, currentValue) => accumulator + currentValue)
  console.log(reduceSum)
  return(
    <b>total of {reduceSum} exercises</b>
  )
}

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => {
  return(
    <div>
      {parts.map(part =>
      <Part key={part.id} part={part} />
      )}
    </div>
  )
}
  
const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  }

  return <Course course={course} />
}

export default App