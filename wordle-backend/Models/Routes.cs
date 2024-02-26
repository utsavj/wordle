using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

public class Routes
{
    [BsonRepresentation(BsonType.ObjectId)]
    public string id { get; set; }
    public string routeType { get; set; }
    public List<string> routes{ get; set; }
}