const { MongoClient } = require("mongodb");

const uri = process.env.MONGODB_URI || "your-mongodb-uri-here";

const services = [
  {
    name: "Baby Care Service",
    shortDescription: "আপনার শিশুর জন্য trained এবং experienced babysitter",
    description:
      "আমাদের baby care service এ রয়েছে highly trained এবং experienced babysitters যারা আপনার শিশুর সম্পূর্ণ যত্ন নেবে। তারা শিশুদের সাথে খেলা, খাওয়ানো, ঘুম পাড়ানো এবং সব ধরনের care প্রদান করতে সক্ষম। সব babysitter background verified এবং first aid trained।",
    icon: "👶",
    chargePerHour: 200,
    chargePerDay: 1500,
    features: [
      "Trained এবং Experienced Babysitters",
      "Background Verified",
      "24/7 Available",
      "Emergency Support",
      "First Aid Certified",
      "Age-appropriate Activities",
      "Feeding & Diaper Change",
      "Sleep Training Support",
    ],
    benefits: [
      "আপনার শিশু নিরাপদ হাতে থাকবে",
      "Professional childcare experience",
      "Regular updates about your child",
      "Flexible scheduling options",
    ],
  },
  {
    name: "Elderly Care Service",
    shortDescription:
      "বয়স্ক ব্যক্তিদের জন্য compassionate এবং professional care",
    description:
      "বয়স্ক ব্যক্তিদের জন্য আমরা প্রদান করি compassionate এবং respectful care service। আমাদের caregivers trained এবং experienced যারা elderly মানুষদের সাথে ভালো ব্যবহার করতে জানে। তারা daily activities, medication management, এবং companionship প্রদান করে।",
    icon: "👴",
    chargePerHour: 250,
    chargePerDay: 1800,
    features: [
      "Compassionate Caregivers",
      "Medical Support Available",
      "Medication Management",
      "Daily Activities Assistance",
      "Companion Care",
      "Physiotherapy Support",
      "Nutritious Meal Planning",
      "Regular Health Monitoring",
    ],
    benefits: [
      "বয়স্কদের dignity বজায় রেখে care",
      "Emotional support and companionship",
      "Safe and comfortable environment",
      "Family peace of mind",
    ],
  },
  {
    name: "Sick People Care Service",
    shortDescription: "অসুস্থ ব্যক্তিদের জন্য specialized medical care",
    description:
      "অসুস্থ ব্যক্তিদের জন্য আমাদের রয়েছে trained nurses এবং medical professionals। তারা patient care, medication administration, wound dressing, এবং সব ধরনের medical support প্রদান করতে পারদর্শী। Emergency situation এ immediate response দিতে সক্ষম।",
    icon: "🏥",
    chargePerHour: 300,
    chargePerDay: 2000,
    features: [
      "Trained Nurses & Medical Staff",
      "Medical Equipment Available",
      "Doctor Consultation Support",
      "Emergency Response Team",
      "Wound Care & Dressing",
      "IV & Injection Administration",
      "Post-operative Care",
      "24/7 Medical Monitoring",
    ],
    benefits: [
      "Professional medical care at home",
      "Reduced hospital visits",
      "Comfortable recovery environment",
      "Cost-effective healthcare solution",
    ],
  },
];

async function seedServices() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log("Connected to MongoDB");

    const database = client.db("care-xyz");
    const servicesCollection = database.collection("services");

    // Clear existing services
    await servicesCollection.deleteMany({});
    console.log("Cleared existing services");

    // Insert new services
    const result = await servicesCollection.insertMany(services);
    console.log(`${result.insertedCount} services inserted successfully`);

    // Display inserted services
    const allServices = await servicesCollection.find({}).toArray();
    console.log("\nInserted Services:");
    allServices.forEach((service) => {
      console.log(`- ${service.name} (ID: ${service._id})`);
    });
  } catch (error) {
    console.error("Error seeding services:", error);
  } finally {
    await client.close();
    console.log("\nDatabase connection closed");
  }
}

seedServices();
