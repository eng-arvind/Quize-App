import { Component } from "react"
import React from 'react';
import './assets/style.css';
import quizService from './quizService';
import QuestionBox from './components/QuestionBox';
import Result from "./components/Result";

class Quizapp extends Component {
    state = {
        questionBAnk: [],
        score : 0,
        responses : 0


    };
    getQuestion = () => {
        quizService().then(question => {
            this.setState({
                questionBAnk: question
            });
        })
    };
    computeAnswer = (answer,correctAnswer) => {
        if(answer===correctAnswer)
        {
            this.setState({
                score : this.state.score+1

            });
        }
        this.setState({
            responses : this.state.responses < 5 ? this.state.responses +1 : 5
        });
    };
    playAgain =() =>
    {
        this.getQuestion();
        this.setState({
            score:0,
            responses:0
        });
    }
    componentDidMount() {
        this.getQuestion();
    }
    render() {
        return (
            <div className="container">
                <div className="title">Quiz App</div>
                {this.state.questionBAnk.length > 0 && 
                this.state.responses <5 &&
                this.state.questionBAnk.map(
                    ({ question, answers, correct, questionId }) => (
                        <QuestionBox 
                        question={question} 
                        options={answers} 
                        key={questionId}
                        selected = {answer =>this.computeAnswer(answer,correct)}
                         />
                    )
                )}
                {this.state.responses === 5 ?
                 (<Result score={this.state.score} playAgain={this.playAgain} ></Result>) : null}
            </div>
        );
    }
}
export default Quizapp;