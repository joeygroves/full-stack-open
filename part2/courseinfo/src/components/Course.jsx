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
    const reduceSum = total.reduce((accumulator, currentValue) => accumulator + currentValue)
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

export default Course