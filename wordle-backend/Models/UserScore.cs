using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

public class UserScore
{
    [BsonRepresentation(BsonType.ObjectId)]
    public string id { get; set; }
    public string userGUID { get; set; }
    public List<int> monthlyScore { get; set; }

    public UserScore(string GUID)
    {
        userGUID = GUID;
        monthlyScore = Enumerable.Repeat(0, 7).ToList();
    }
}
