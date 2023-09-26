import { Paper, Grid } from "@mui/material";
import { styled } from '@mui/system';

const QuestionPaper = styled(Paper)`
  background-color: white;
  padding: ${(props) => props.theme.spacing(2)}; /* Use theme.spacing for consistent spacing */
  border: 1px solid #ccc;
  border-radius: 10px;
  margin-bottom: ${(props) => props.theme.spacing(2)};
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const List = styled('ul')`{
    list-style: none;
    padding: 0;
  
}`
const Option = styled('li')`
font-size: 16px;
padding: 10px;
margin: 10px 0;
cursor: pointer;
transition: background-color 0.2s;
border: 1px solid #ccc;
border-radius: 5px;
background-color: #fff; 

`;
const QuestionImage = styled('img')`
  width: 300px;
  height: 200px;
  margin-bottom: 10px;
`;

export function Question({ currentQuestion, handleOptionSelect, timerElapsed, selectedOption, isCorrect }) {
  const optionSelect = (index) => {
    console.log(index);
    handleOptionSelect(index);
  };

  return (
    <Grid container spacing={2}>
      {currentQuestion.imageUrl && (
        <Grid item xs={12}>
          <QuestionImage
            src={currentQuestion.imageUrl}
            alt="Image"
          />
        </Grid>
      )}
      <Grid item xs={12}>
      <QuestionPaper>
        <p><b>{currentQuestion.question}</b></p>
        <List>
          {currentQuestion.options.map((option, index) => (
            <Option
              key={option}
              onClick={() => optionSelect(index)}
              className={selectedOption === index ? (timerElapsed ? (isCorrect ? 'correct' : 'incorrect') : 'selected') : ''}
            >
              {option}
            </Option>
          ))}
        </List>
      </QuestionPaper>
      </Grid>
    </Grid>
  );
}
