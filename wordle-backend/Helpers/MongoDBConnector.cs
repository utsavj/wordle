using MongoDB.Driver;
namespace Helpers;
public class MongoDBConnector()
{
    const string connectionUri = "mongodb://localhost:27017";
    public static MongoClient client = new MongoClient(connectionUri);
}