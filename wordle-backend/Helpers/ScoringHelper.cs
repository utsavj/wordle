using Helpers;
using MongoDB.Driver;

public class ScoringHelper()
{
    private IMongoCollection<UserScore> collection;


    public void SetCollection()
    {
        collection = MongoDBConnector.client.GetDatabase("UserScore").GetCollection<UserScore>("Score");
    }

    public void SaveScore(int score, string userGUID)
    {
        SetCollection();
        List<int> monthlyScore = CalculateScoreForMonth(score, userGUID);

        var filter = Builders<UserScore>.Filter
            .Eq(c => c.userGUID, userGUID);

        var update = Builders<UserScore>.Update
            .Set(c => c.monthlyScore, monthlyScore);

        collection.UpdateOne(filter, update);
    }

    public List<int> CalculateScoreForMonth(int currentScore, string userGUID)
    {
        int month = Int32.Parse(DateTime.Now.ToString("MM"));
        List<int> monthlyScore = GetScoreForCurrentUser(userGUID);
        int currentMonthScore = monthlyScore[month - 1];

        int newCurrentMonthScore = currentScore < currentMonthScore || currentMonthScore == 0 ? currentScore : currentMonthScore;
        monthlyScore[month - 1] = newCurrentMonthScore;

        return monthlyScore;
    }

    public List<int> GetScoreForCurrentUser(string userGUID)
    {
        SetCollection();
        return collection.Find(c => c.userGUID == userGUID).FirstOrDefault().monthlyScore;
    }

    public void CreateScoreCollection(string userGUID)
    {
        SetCollection();
        UserScore userScore = new UserScore(userGUID);
        collection.InsertOne(userScore);
    }
}