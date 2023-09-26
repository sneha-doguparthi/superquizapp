export function Summary({correctAnswers,questionsLength}){
    return <div>
          <h2>Results Summary</h2>
          <p>You answered {correctAnswers} out of {questionsLength} questions correctly.</p>
        </div>
}