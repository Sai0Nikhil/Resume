import { MongoClient } from 'mongodb';

// Fallback default CV configuration if MongoDB is not connected
const DEFAULT_RESUME_DATA = {
  profile: {
    name: "Sai Nikhil Vukka",
    title: "Shaping the Future with Data | Fresher @ IIT Madras | Techno-Optimist",
    email: "25f2005507@ds.study.iitm.ac.in",
    phone: "+91 9381480420",
    linkedin: "https://www.linkedin.com/in/sai-nikhil-vukka-iitm",
    address: "102, Kanuru, Vijayawada 520007"
  },
  summary: "Freshman at IIT Madras (BS Data Science) and B.Tech CSE (Honors) student at KL University with interests in AI, Machine Learning, Data Science, and Research. Currently serving as Research Assistant at iSRL (IITM), Core Research Member at RaSoR, and Associate Director -- Research & Discovery at KL-VEDA. Strong communication, coordination, leadership, and organizational skills with experience in research collaborations, student initiatives, and technical projects, CEFR B2 English Proficiency.",
  experiences: [
    {
      role: "Research Assistant",
      company: "Interdisciplinary Systems Research Lab (iSRL)",
      location: "Remote",
      date: "Feb 2026 -- June 2026",
      bullets: [
        "Contributing to interdisciplinary research projects involving data-driven systems",
        "Assisting in experimentation, analysis, and research documentation"
      ],
      tags: ["Python", "Data Science", "Research", "iSRL"]
    },
    {
      role: "Member",
      company: "Google Developers Group",
      location: "KL University",
      date: "Jan 2026 -- Present",
      bullets: [
        "Actively engaged in developer community discussions, workshops, and student tech events"
      ],
      tags: ["Community", "Teamwork"]
    },
    {
      role: "Associate Director -- Research & Discovery",
      company: "KL-VEDA, KL University",
      location: "Vijayawada, India",
      date: "Nov 2025 -- Present",
      bullets: [
        "Leading student research initiatives and mentoring collaborative teams",
        "Coordinating technical activities, innovation discussions, and organizational events"
      ],
      tags: ["Leadership", "Teamwork", "Research", "Git"]
    },
    {
      role: "Core Research Member",
      company: "RaSoR -- Ramanujan Society of Research",
      location: "Remote",
      date: "Oct 2025 -- Present",
      bullets: [
        "Engaged in algorithmic and mathematical research discussions",
        "Preparing technical reports and structured research summaries"
      ],
      tags: ["Algorithms", "Research", "Technical Writing"]
    },
    {
      role: "Co-Founder",
      company: "DockMeet",
      location: "Remote",
      date: "Feb 2026 -- Present",
      bullets: [
        "Building an Activity centric social networking platform !!"
      ],
      tags: ["React", "Mongodb", "Startup", "Leadership"]
    }
  ],
  projects: [
    {
      title: "Nurve2Voice -- IoT Based Solution for Mute Individuals",
      date: "2025 -- Present",
      role: "Founder",
      type: "Startup Initiative",
      bullets: [
        "Researching TTS models and assistive technologies for speech-impaired individuals",
        "Exploring EMG-based communication systems and AI-driven voice synthesis"
      ],
      tags: ["IoT", "AI", "Python", "Research"]
    },
    {
      title: "Attendance Tracking Application using Face Recognition",
      date: "2025 -- Present",
      role: "Developer",
      type: "Personal Project",
      bullets: [
        "Built an AI-based attendance system capable of capturing and recognizing student faces",
        "Implemented facial recognition concepts using Eigenvalues and Eigenvectors for feature extraction",
        "Developed backend connectivity and deployment workflows using Render",
        "Managed attendance and user data using PostgreSQL database systems"
      ],
      tags: ["Face Recognition", "AI", "Python", "PostgreSQL", "Render"]
    }
  ],
  publications: [
    {
      title: "Regulatory Delta of Food Labelling Laws in India",
      date: "2026",
      doi: "10.5281/zenodo.18719394",
      doiLink: "https://doi.org/10.5281/zenodo.18719394",
      publisher: "iSRL",
      bullets: [
        "Comparative analysis of FSSAI 2011 and 2020 food labelling regulations",
        "Focused on allergen declarations, regulatory changes, and digital ingredient identity systems"
      ],
      tags: ["Research", "iSRL"]
    }
  ],
  education: [
    {
      institution: "Indian Institute of Technology Madras",
      date: "2025 -- 2029",
      degree: "Bachelor of Science in Data Science and Applications (Foundation level completed)",
      location: "Chennai, India",
      tags: ["Python", "Data Science"]
    },
    {
      institution: "KL University",
      date: "2025 -- 2029",
      degree: "B.Tech in Computer Science and Engineering (Honors)",
      location: "Vijayawada, India",
      gpa: "GPA: 9.61",
      tags: ["Java", "React", "PostgreSQL", "Mongodb", "Git", "CSS", "HTML"]
    },
    {
      institution: "Narayana Junior College",
      date: "2023 -- 2025",
      degree: "Intermediate (AP Board of Intermediate Education)",
      location: "Vijayawada, India",
      tags: ["Mathematics"]
    },
    {
      institution: "Narayana High School",
      date: "Completed 2023",
      degree: "Class X (SSC)",
      location: "Vijayawada, India",
      gpa: "95%",
      tags: []
    }
  ],
  achievements: [
    "Campus Ambassador for Techfest IIT Bombay (AIR 6)",
    "Achieved CEFR B2 English Proficiency through Cambridge University Press & Assessment Linguaskill",
    "Assessed in speaking, listening, reading, and writing for academic and professional communication"
  ],
  certifications: [
    "Commonwealth Bank -- Introduction to Data Science Job Simulation",
    "Deloitte Australia -- Data Analytics Job Simulation",
    "Introduction to Programming Using Python",
    "Training Certificate -- IIT Bombay",
    "Data Science & Analytics"
  ],
  languages: [
    { name: "English", level: "Professional Working" },
    { name: "German", level: "Elementary" }
  ]
};

// Cache the MongoDB connection across lambda hot starts
let cachedClient = null;
let cachedDb = null;

async function connectToDatabase() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("MONGODB_URI environment variable is not set.");
  }

  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  const client = new MongoClient(uri);
  await client.connect();
  
  // Extract database name from URI or fallback to resume_db
  const dbName = uri.split('/').pop()?.split('?')[0] || 'resume_db';
  const db = client.db(dbName);

  cachedClient = client;
  cachedDb = db;
  return { client, db };
}

export default async function handler(req, res) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const uri = process.env.MONGODB_URI;

  // Local development / fallback mode when no database URI is configured
  if (!uri) {
    if (req.method === 'GET') {
      return res.status(200).json(DEFAULT_RESUME_DATA);
    } else if (req.method === 'POST') {
      const { passkey, data } = req.body;
      if (passkey !== 'Sainikhil@1') {
        return res.status(401).json({ error: 'Unauthorized' });
      }
      return res.status(200).json({ success: true, message: 'Saved to local fallback (not persisted)' });
    }
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { db } = await connectToDatabase();
    const collection = db.collection('cv_data');

    if (req.method === 'GET') {
      let data = await collection.findOne({ type: 'cv' });
      
      // If collection is empty, initialize it with the default CV document
      if (!data) {
        const initialDoc = { type: 'cv', ...DEFAULT_RESUME_DATA };
        await collection.insertOne(initialDoc);
        data = initialDoc;
      }

      // Strip MongoDB _id key from the response
      const { _id, ...cleanData } = data;
      return res.status(200).json(cleanData);

    } else if (req.method === 'POST') {
      const { passkey, data } = req.body;

      // Verify passkey
      if (passkey !== 'Sainikhil@1') {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      if (!data || !data.profile || !data.summary) {
        return res.status(400).json({ error: 'Invalid CV configuration structure' });
      }

      // Upsert CV document
      const result = await collection.updateOne(
        { type: 'cv' },
        { $set: { ...data } },
        { upsert: true }
      );

      return res.status(200).json({ success: true, result });
    } else {
      return res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error("Database connection/query error:", error);
    return res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
}
