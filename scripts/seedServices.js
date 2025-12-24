const { MongoClient } = require("mongodb");

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017";
const dbName = "care-xyz";

const services = [
  {
    name: "Baby Care Service",
    shortDescription: "আপনার শিশুর জন্য trained এবং experienced babysitter",
    description:
      "আমাদের baby care service এ পাবেন highly trained এবং experienced babysitters যারা আপনার শিশুর সম্পূর্ণ যত্ন নিবে। তারা শিশুদের খাওয়ানো, ঘুম পাড়ানো, খেলাধুলা এবং পড়াশোনায় সাহায্য করবে। সব babysitter background verified এবং child safety training প্রাপ্ত।",
    icon: "👶",
    chargePerHour: 200,
    chargePerDay: 1500,
    features: [
      "Trained & Experienced Babysitters",
      "Background Verified",
      "24/7 Available",
      "Emergency Support",
      "Child Development Activities",
      "Meal Preparation",
      "Educational Play",
      "Safety Certified",
    ],
    category: "baby-care",
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Elderly Care Service",
    shortDescription:
      "বয়স্ক ব্যক্তিদের জন্য compassionate এবং professional care",
    description:
      "বয়স্ক ব্যক্তিদের জন্য আমরা প্রদান করি compassionate এবং professional caregiving service। আমাদের caregivers তাদের দৈনন্দিন কাজকর্ম, ওষুধ খাওয়া, এবং সামাজিক সহযোগিতায় সাহায্য করবে। তারা বয়স্ক ব্যক্তিদের শারীরিক এবং মানসিক স্বাস্থ্যের যত্ন নিতে প্রশিক্ষিত।",
    icon: "👴",
    chargePerHour: 250,
    chargePerDay: 1800,
    features: [
      "Compassionate Caregivers",
      "Medical Support",
      "Companion Care",
      "Medication Management",
      "Daily Activities Assistance",
      "Mobility Support",
      "Regular Health Monitoring",
      "Emergency Care",
    ],
    category: "elderly-care",
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Sick People Care Service",
    shortDescription: "অসুস্থ ব্যক্তিদের জন্য specialized medical care",
    description:
      "অসুস্থ ব্যক্তিদের জন্য আমরা প্রদান করি specialized medical care service। আমাদের trained nurses এবং caregivers রোগীর medication, wound care, physiotherapy, এবং daily care এ সাহায্য করবে। তারা doctor এর নির্দেশনা অনুসরণ করে এবং emergency situation handle করতে সক্ষম।",
    icon: "🏥",
    chargePerHour: 300,
    chargePerDay: 2000,
    features: [
      "Trained Medical Nurses",
      "Medical Equipment Support",
      "Doctor Consultation",
      "Emergency Response",
      "Medication Administration",
      "Wound Care",
      "Physiotherapy Assistance",
      "24/7 Monitoring",
    ],
    category: "sick-care",
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Post-Surgery Care Service",
    shortDescription: "অপারেশনের পরবর্তী সময়ে বিশেষ যত্ন সেবা",
    description:
      "অপারেশনের পর রোগীর বিশেষ যত্নের প্রয়োজন হয়। আমাদের post-surgery care service এ থাকবে trained nurses যারা wound dressing, pain management, medication, এবং recovery exercises এ সাহায্য করবে। তারা আপনার দ্রুত recovery নিশ্চিত করতে প্রতিশ্রুতিবদ্ধ।",
    icon: "🩺",
    chargePerHour: 350,
    chargePerDay: 2500,
    features: [
      "Specialized Post-Op Nurses",
      "Wound Care & Dressing",
      "Pain Management",
      "Medication Monitoring",
      "Recovery Exercise Guidance",
      "Infection Prevention",
      "Mobility Assistance",
      "Regular Doctor Coordination",
    ],
    category: "post-surgery",
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Disabled Person Care Service",
    shortDescription: "প্রতিবন্ধী ব্যক্তিদের জন্য dedicated care সেবা",
    description:
      "প্রতিবন্ধী ব্যক্তিদের জন্য আমরা প্রদান করি dedicated এবং respectful care service। আমাদের caregivers তাদের daily activities, mobility, personal hygiene, এবং social interaction এ সাহায্য করবে। তারা প্রতিবন্ধী ব্যক্তিদের স্বাধীনতা এবং মর্যাদা রক্ষা করতে প্রশিক্ষিত।",
    icon: "♿",
    chargePerHour: 280,
    chargePerDay: 2200,
    features: [
      "Compassionate Caregivers",
      "Mobility Assistance",
      "Personal Care Support",
      "Adaptive Equipment Help",
      "Communication Support",
      "Social Activity Facilitation",
      "Specialized Training",
      "Dignity & Respect",
    ],
    category: "disabled-care",
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

async function seedServices() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log("Connected to MongoDB");

    const db = client.db(dbName);
    const servicesCollection = db.collection("services");

    // Clear existing services
    const deleteResult = await servicesCollection.deleteMany({});
    console.log(`Deleted ${deleteResult.deletedCount} existing services`);

    // Insert new services
    const result = await servicesCollection.insertMany(services);
    console.log(`Inserted ${result.insertedCount} services`);

    // Display inserted services
    const insertedServices = await servicesCollection.find({}).toArray();
    console.log("\nInserted Services:");
    insertedServices.forEach((service, index) => {
      console.log(`${index + 1}. ${service.name} (ID: ${service._id})`);
    });

    console.log("\n✅ Services seeded successfully!");
  } catch (error) {
    console.error("Error seeding services:", error);
    process.exit(1);
  } finally {
    await client.close();
  }
}

seedServices();
