//Code has every step of the task and those are separated with comment as a header of the step. 
//PART 1.1

//Function for rendering header
const Header = (props) => {
  console.log(props)
  return (
    <h1>{props.course}</h1>
  )
}

//Function for rendering content
const Content = (props) => {
  console.log(props)
  return (
    <p>
      {props.part} {props.exercises}
    </p>
  )
}

//Function for rendering total amount of exercises
const Total = (props) => {
  console.log(props)
  return (
    <p>
      Number of exercises {props.exercises1 + props.exercises2 + props.exercises3}
    </p>
  )
}

// App component for rendering the main structure of the application
const App1 = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <>
      <Header course={course} />
      <Content part={part1} exercises={exercises1} />
      <Content part={part2} exercises={exercises2} />
      <Content part={part3} exercises={exercises3} />
      <Total exercises1={exercises1} exercises2={exercises2} exercises3={exercises3}/>
    </>
  )
}
//====================================================================//

//PART 1.2
//Function for rendering parts of the content
const Part = (props) => {
  console.log('Part gets these values', props)
  return (
    <p>
      {props.part} {props.exercises}
    </p>
  )
}

// Content component for organizing and passing data to Part components
const Content2 = (props) => {
  console.log('Content2 gets these values', props)
  return (
    <div>
      <Part part={props.part1} exercises={props.exercises1} />
      <Part part={props.part2} exercises={props.exercises2} />
      <Part part={props.part3} exercises={props.exercises3} />
    </div>
  )
}

// App component for rendering the main structure of the application
const App2 = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <>
      <Header course={course} />
      <Content2 
        part1={part1} exercises1={exercises1} 
        part2={part2} exercises2={exercises2} 
        part3={part3} exercises3={exercises3} 
      />
      <Total exercises1={exercises1} exercises2={exercises2} exercises3={exercises3} />
    </>
  )
}
//====================================================================//

//PART 1.3
// Content component for organizing and passing data to Part components
const Content3 = ({part1, part2, part3}) => {
  console.log('Content3 gets these values', part1, part2, part3)
  return (
    <div>
      <Part part={part1.name} exercises={part1.exercises} />
      <Part part={part2.name} exercises={part2.exercises} />
      <Part part={part3.name} exercises={part3.exercises} />
    </div>
  )
}

//Function for rendering total amount of exercises
const Total3 = ({part1, part2, part3}) => {
  console.log('Total3 gets these values', part1, part2, part3)
  return (
    <p>
      Number of exercises {part1.exercises + part2.exercises + part3.exercises}
    </p>
  )
}

// App component for rendering the main structure of the application
const App3 = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }
  
  return (
    <>
      <Header course={course} />
      <Content3 part1={part1} part2={part2} part3={part3}/>
      <Total3 part1={part1} part2={part2} part3={part3}/>
    </>
  )
}
//====================================================================//

//PART 1.4
// Content component for organizing and passing data to Part components
const Content4 = ({ parts }) => {
  console.log('Content4 gets these values', parts)
  return (
    <div>
      <Part part={parts[0].name} exercises={parts[0].exercises}/>
      <Part part={parts[1].name} exercises={parts[1].exercises}/>
      <Part part={parts[2].name} exercises={parts[2].exercises}/>
    </div>
  )
}

//Function for rendering total amount of exercises
const Total4 = ({ parts }) => {
  console.log('Total4 gets these values', parts[0].exercises, parts[1].exercises, parts[2].exercises)
  return (
    <p>
      Number of exercises {parts[0].exercises + parts[1].exercises + parts[2].exercises}
    </p>
  )
}

// App component for rendering the main structure of the application
const App4 = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  return (
    <>
      <Header course={course} />
      <Content4 parts={parts}/>
      <Total4 parts={parts}/>
    </>
  )
}
//====================================================================//

//PART 1.5
//Function for rendering header
const Header5 = ({course}) => {
  console.log('Header5 gets these values', course)
  return (
    <h1>{course.name}</h1>
  )
}

// Content component for organizing and passing data to Part components
const Content5 = ({course}) => {
  console.log('Content5 gets these values', course)
  return (
    <div>
      <Part part={course.parts[0].name} exercises={course.parts[0].exercises}/>
      <Part part={course.parts[1].name} exercises={course.parts[1].exercises}/>
      <Part part={course.parts[2].name} exercises={course.parts[2].exercises}/>
    </div>
  )
}

//Function for rendering total amount of exercises
const Total5 = ({course}) => {
  console.log('Total5 gets these values', course.parts[0].exercises, course.parts[1].exercises, course.parts[2].exercises)
  return (
    <p>
      Number of exercises {course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises}
    </p>
  )
}

// App component for rendering the main structure of the application
const App5 = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <>
      <Header5 course={course} />
      <Content5 course={course} />
      <Total5 course={course} />
    </>
  )
}

export default App5