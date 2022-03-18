import GameObject from './GameObject.js';

class PointsDisplay extends GameObject {
  constructor(ctx, confing) {
    super(ctx, confing);
    this.y = confing.h - confing.h * 0.96;
    this.score = 0;
    this.hiScoreLenght = 1;
    this.hiscoresKey = 'highScores';
    this.hiScoreArray = JSON.parse(localStorage.getItem(this.hiscoresKey)) ?? [];
  }

  render() {
    // Score text
    this.ctx.font = 'bold 2.5vw monospace';
    this.ctx.fillStyle = 'white';
    this.ctx.textAlign = 'center';
    this.ctx.fillText('Score: ' + this.score, this.config.w - this.config.w * 0.15, this.y);

    // Hiscore text
    this.ctx.fillText('Hi-Score: ' + this.hiScoreArray[0], this.config.w * 0.17, this.y)
  }

  increase() {
    this.score++;
  }

  checkHiScore() {
    let lowestScore = this.hiScoreArray[this.hiScoreLenght - 1]?.score ?? 0;

    if (this.score > lowestScore) {
      this.score;

      // Add to list
      this.hiScoreArray.push(this.score);

      // Sort the list
      this.hiScoreArray.sort((a, b) => b - a);

      // Select new list
      this.hiScoreArray.splice(this.hiScoreLenght);

      // Save to local storage
      localStorage.setItem(this.hiscoresKey, JSON.stringify(this.hiScoreArray));
    }
  }
}

export default PointsDisplay;
