import { observable, action } from 'mobx';
import { values, random, filter } from 'lodash';

export default class QuizzStore {
  @observable quizzList = [];
  @observable selectedQuizz = {};
  @observable listIsEmpty = false;
  @observable errorCount = 0;
  @observable quizzNumber = 0;
  @observable noErrorQuizzNumber = 0;
  @observable previousErrorCount = 0;

  @action dispatchListIsEmpty() {
    this.listIsEmpty = true;
  }

  @action addError(question) {
    this.errorCount++;
  }

  @action resetErrorCount() {
    this.errorCount = 0;
  }

  @action setQuizzNumber() {
    this.quizzNumber = this.quizzList.length;
  }

  @action updateQuizzList(fetchedQuizzList) {
    const processedFetchedQuizzList = values(fetchedQuizzList)
    this.quizzList.length = 0;
    this.quizzList.push(...processedFetchedQuizzList);
    this.listIsEmpty = !(this.quizzList.length > 0);
  }

  @action updateSelectedQuizz(index) {
    if (index >= 0 && index < this.quizzList.length) {
      this.selectedQuizz = this.quizzList[index];
    }
  }

  @action updateNoErrorQuizzNumber() {
    if(this.errorCount === this.previousErrorCount) {
      this.noErrorQuizzNumber++;
    }
    this.previousErrorCount = this.errorCount;
  }

  @action resetNoErrorQuizzNumber() {
    this.noErrorQuizzNumber = 0;
  }

  selectRandomQuizz() {
    if (this.quizzList.length === 0) {
      this.dispatchListIsEmpty();
    }
    this.updateSelectedQuizz([random(0, this.quizzList.length - 1)]);
    if(this.quizzNumber !== this.quizzList.length) {
      this.updateNoErrorQuizzNumber();
    }
  }

  withdrawCurrentQuizz() {
    const quizzList = filter(this.quizzList, quizz => quizz.question !== this.selectedQuizz.question);
    this.updateQuizzList(quizzList);
  }

  getNextQuizz() {
    this.withdrawCurrentQuizz();
    this.selectRandomQuizz();
  }

  fetchQuizzList(quizzList) {
    this.updateQuizzList(quizzList);
    this.setQuizzNumber();
    this.resetErrorCount();
    this.selectRandomQuizz();
  }
}
