import React, { Component } from 'react';

import styles from "./App.module.css";
import { Statistics } from '../components/Statistics/Statistics';
import { Section } from '../components/Section/Section';
import { FeedbackOptions } from '../components/FeedbackOptions/FeedbackOptions';
import { Notification } from '../components/Notification/Notification';



export class App extends Component{
 
    
    state = {
        good: 0,
        neutral: 0,
        bad: 0
    };
     
   onLeaveFeedback = state => {
    this.setState(prevState => ({
      [state]: prevState[state] + 1,
    }));
  };


    countTotalFeedback() {
        const { good, neutral, bad } = this.state;
        return good + neutral + bad;
    };

    PositiveFeedbackPercentage() {
    const { good } = this.state;
    return Math.round((good / this.countTotalFeedback()) * 100);
  }
    
   

    render() {
        const { good,neutral,bad} = this.state;
      const options = Object.keys(this.state);
      

        return (
            <div className={styles.feedbackContainer}>
              <Section title="Please leave feadback">
                <FeedbackOptions options={options} onLeaveFeedback={this.onLeaveFeedback}></FeedbackOptions>
              </Section>
               
              <Section title="Statistics">
              {this.countTotalFeedback() > 0 ? (<Statistics good={good} neutral={neutral} bad={bad} total={this.countTotalFeedback()} positivePercentage={this.PositiveFeedbackPercentage()} />) :
                (<Notification message="There is no feedback" />)}
              </Section>
            </div>
        );
       
    };
}

