//  For rendering the main structure of the application
const Course = ({courses}) => {
    var mainHeader= 'Web Development Curriculum'
    //console.log('MainHeader gets these values', courses)
    return (
    <>
        <MainHeader header={mainHeader} />
        <>
            {courses.map(course => 
                <div key={course.id}>
                    <Header header={course.name} />
                    <Content course={course} />
                    <Total course={course} />
                </div>    
            )}
        </>
    </>
    )
}

//Function for rendering main header
const MainHeader = ({header}) => {
    //console.log('MainHeader gets these values', header)
    return (
        <h1>{header}</h1>
    )
}

//Function for rendering header
const Header = (props) => {
    //console.log('Header gets these values', props)
    return (
        <h2>{props.header}</h2>
    )
}

// Content component for organizing and passing data to Part components
const Content = ({course}) => {
    //console.log('Content gets these values', course)
    return (
        <div>
            {course.parts.map(part => 
            <Part key={part.id} part={part.name} exercises={part.exercises}/>
            )}
        </div>
    )
}

//Function for rendering parts of the content
const Part = (props) => {
    //console.log('Part gets these values', props)
    return (
        <p><b>{props.part}</b>, amount of exercises: <b>{props.exercises}</b></p>
    )
}

//Function for rendering total amount of exercises
const Total = ({course}) => {
    //console.log('Total gets these values', course)
    return (
        <b>
            Total amount is exercises is:{" "} 
            {course.parts.reduce((sum, part) => {
                console.log('Does adding of exercises work?', sum, part)
                return sum + part.exercises}, 0)
            }
        </b>
    )
}

export default Course