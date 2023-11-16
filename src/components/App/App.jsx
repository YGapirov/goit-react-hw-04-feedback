import { GlobalStyle } from '../GlobalStyle';
import { useState } from 'react';
import { Container } from './App.styled';
import { Section } from '../Section/Section';
import { FeedbackOptions } from '../FeedbackOptions/Feedbackoptions';
import { Statistics } from '../Statistics/Statistics';
import { Notification } from '../Notification/Notification';

export const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const updateFeedback = feedback => {
    //перебираємо варіант фідбека свічом, якщо виконується обраний свіч, додаєм 1
    switch (feedback) {
      case 'good':
        setGood(prevGood => prevGood + 1);
        break;

      case 'neutral':
        setNeutral(prevNeutral => prevNeutral + 1);
        break;

      case 'bad':
        setBad(prevBad => prevBad + 1);
        break;

      default:
    }
  };

  const countTotalFeedback = () => {
    return good + neutral + bad;
  };

  const countPositiveFeedbackPercentage = () => {
    const total = countTotalFeedback();
    //обчислюємо сереній % фідбеку, або повертаємо нуль
    return Math.round((good / total) * 100) || 0;
  };

  const total = countTotalFeedback();
  const positivePercentage = countPositiveFeedbackPercentage();

  return (
    <Container>
      <Section title="Please leave feedback">
        <FeedbackOptions
          onLeaveFeedback={updateFeedback}
          options={['good', 'neutral', 'bad']}
        />
      </Section>

      <Section title="Statistics">
        {total > 0 ? (
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={total}
            positivePercentage={positivePercentage}
          />
        ) : (
          <Notification message="There is no feedback" />
        )}
      </Section>

      <GlobalStyle />
    </Container>
  );
};
