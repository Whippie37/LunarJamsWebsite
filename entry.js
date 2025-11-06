export default function Entry(_id, levelID, levelName, creators, discordUsername, judgeScores, judgeComments, levelVersion, updateDate, objectCount, jamNumber, updateRestricted) {
    this._id = _id;
    this.levelID = levelID;
    this.levelName = levelName;
    this.creators = creators;
    this.discordUsername = discordUsername;
    this.judgeScores = judgeScores;
    this.judgeComments = judgeComments;
    this.levelVersion = levelVersion;
    this.updateDate = updateDate;
    this.objectCount = objectCount;
    this.jamNumber = jamNumber;
    this.updateRestricted = updateRestricted;
}