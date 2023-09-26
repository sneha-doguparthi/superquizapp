import { styled } from '@mui/system';
const TimerContainer = styled('div')`
  position: absolute;
  top: 30px;
  right: 100px;
  font-size: 28px;
  background-color: #ffe;
  color: #000000;
  padding: 5px;
  border: 2px solid #050000;
  border-radius: 50%;
  width: 70px;
  height: 70px;
  display: inline-block;
  text-align: center;
  line-height: 70px;
`;

export function Timer({ timeLeft }) {
  return (
    <TimerContainer>
      {timeLeft !== null && timeLeft >= 0 ? `${timeLeft ?? 0}` : ''}
    </TimerContainer>
  );
}
