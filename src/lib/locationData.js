export const bangladeshLocations = {
  Dhaka: {
    districts: {
      Dhaka: [
        "Dhanmondi",
        "Gulshan",
        "Banani",
        "Mirpur",
        "Uttara",
        "Mohammadpur",
        "Tejgaon",
      ],
      Gazipur: ["Gazipur Sadar", "Kaliakair", "Kapasia", "Sreepur", "Kaliganj"],
      Narayanganj: ["Narayanganj Sadar", "Rupganj", "Sonargaon", "Bandar"],
      Tangail: ["Tangail Sadar", "Mirzapur", "Madhupur", "Gopalpur"],
      Manikganj: ["Manikganj Sadar", "Singair", "Saturia", "Harirampur"],
      Munshiganj: ["Munshiganj Sadar", "Sreenagar", "Sirajdikhan", "Tongibari"],
    },
  },
  Chattogram: {
    districts: {
      Chattogram: [
        "Agrabad",
        "Panchlaish",
        "Khulshi",
        "Halishahar",
        "Nasirabad",
        "Pahartali",
      ],
      "Cox's Bazar": [
        "Cox's Bazar Sadar",
        "Chakaria",
        "Teknaf",
        "Ramu",
        "Ukhia",
      ],
      Cumilla: ["Cumilla Sadar", "Daudkandi", "Chandina", "Laksam"],
      Noakhali: ["Noakhali Sadar", "Begumganj", "Senbagh", "Companiganj"],
    },
  },
  Rajshahi: {
    districts: {
      Rajshahi: [
        "Rajshahi Sadar",
        "Boalia",
        "Motihar",
        "Katakhali",
        "Shaheb Bazar",
      ],
      Bogra: ["Bogra Sadar", "Sherpur", "Shibganj", "Adamdighi"],
      Pabna: ["Pabna Sadar", "Ishwardi", "Bera", "Sujanagar"],
      Natore: ["Natore Sadar", "Bagatipara", "Baraigram", "Lalpur"],
    },
  },
  Khulna: {
    districts: {
      Khulna: [
        "Khulna Sadar",
        "Sonadanga",
        "Khalishpur",
        "Doulatpur",
        "Khan Jahan Ali",
      ],
      Jessore: ["Jessore Sadar", "Jhikargachha", "Manirampur", "Benapole"],
      Satkhira: ["Satkhira Sadar", "Kalaroa", "Tala", "Assasuni"],
      Bagerhat: ["Bagerhat Sadar", "Mongla", "Rampal", "Chitalmari"],
    },
  },
  Barishal: {
    districts: {
      Barishal: ["Barishal Sadar", "Kotwali", "Bandar", "Bakerganj"],
      Patuakhali: ["Patuakhali Sadar", "Kalapara", "Galachipa", "Dashmina"],
      Bhola: ["Bhola Sadar", "Daulatkhan", "Borhanuddin", "Charfashion"],
    },
  },
  Sylhet: {
    districts: {
      Sylhet: [
        "Sylhet Sadar",
        "Jalalabad",
        "Zindabazar",
        "Moulvibazar Road",
        "Amberkhana",
      ],
      Moulvibazar: ["Moulvibazar Sadar", "Sreemangal", "Kulaura", "Barlekha"],
      Habiganj: ["Habiganj Sadar", "Nabiganj", "Bahubal", "Chunarughat"],
      Sunamganj: [
        "Sunamganj Sadar",
        "Jagannathpur",
        "Tahirpur",
        "Bishwambarpur",
      ],
    },
  },
  Rangpur: {
    districts: {
      Rangpur: ["Rangpur Sadar", "Tajhat", "Carmichael", "Modern", "Satmatha"],
      Dinajpur: ["Dinajpur Sadar", "Parbatipur", "Birampur", "Chirirbandar"],
      Thakurgaon: ["Thakurgaon Sadar", "Pirganj", "Baliadangi", "Haripur"],
      Kurigram: ["Kurigram Sadar", "Ulipur", "Nageshwari", "Bhurungamari"],
    },
  },
  Mymensingh: {
    districts: {
      Mymensingh: ["Mymensingh Sadar", "Muktagacha", "Bhaluka", "Trishal"],
      Jamalpur: ["Jamalpur Sadar", "Melandaha", "Dewanganj", "Sarishabari"],
      Netrokona: ["Netrokona Sadar", "Kendua", "Atpara", "Mohanganj"],
      Sherpur: ["Sherpur Sadar", "Nakla", "Sreebardi", "Jhenaigati"],
    },
  },
};

export function getDistricts(division) {
  return Object.keys(bangladeshLocations[division]?.districts || {});
}

export function getCities(division, district) {
  return bangladeshLocations[division]?.districts[district] || [];
}
