const { MongoClient } = require("mongodb");

async function main() {
  // Connection URI
  const uri =
    "mongodb://admin:secret@localhost:27017/admin?retryWrites=true&w=majority";

  // Create a new MongoClient
  const client = new MongoClient(uri, {
  });

  try {
    // Connect to the MongoDB cluster
    await client.connect();

    // Make the appropriate DB calls
    await listDatabases(client);
    await createListing(client, {
      name: "Lovely Loft",
      summary: "A charming loft in Paris",
      bedrooms: 1,
      bathrooms: 1,
    });

    await findOneListingByName(client, "Lovely Loft");
  } catch (e) {
    console.error(e);
  } finally {
    // Close the connection to the MongoDB cluster
    await client.close();
  }
}

async function listDatabases(client) {
  const databasesList = await client.db().admin().listDatabases();

  console.log("Databases:");
  databasesList.databases.forEach((db) => console.log(` - ${db.name}`));
}

async function createListing(client, newListing) {
  const result = await client
    .db("sample_airbnb")
    .collection("listingsAndReviews")
    .insertOne(newListing);

  console.log(
    `New listing created with the following id: ${result.insertedId}`
  );
}

async function findOneListingByName(client, nameOfListing) {
  const result = await client
    .db("sample_airbnb")
    .collection("listingsAndReviews")
    .findOne({ name: nameOfListing });

  if (result) {
    console.log(
      `Found a listing in the collection with the name '${nameOfListing}':`
    );
    console.log(result);
  } else {
    console.log(`No listings found with the name '${nameOfListing}'`);
  }
}

main().catch(console.error);
