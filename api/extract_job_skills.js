import natural from "natural";

const skill_list = [
  // Programming Languages
  "javascript",
  "dart",
  "Perl",
  "Lua",
  "Haskell",
  "Elixir",
  "python",
  "java",
  "c++",
  "c#",
  "ruby",
  "php",
  "swift",
  "kotlin",
  "go",
  "rust",
  "typescript",
  "scala",
  "perl",
  "r",
  "matlab",
  "bash",
  "powershell",
  "sql",
  "html",
  "css",
  "xml",
  "json",
  "yaml",
  "markdown",
  "regex",

  // Web Development
  "html",
  "css",
  "react",
  "angular",
  "vue",
  "node.js",
  "express",
  "django",
  "flask",
  "spring",
  "asp.net",
  "laravel",
  "jquery",
  "bootstrap",
  "tailwind",
  "sass",
  "less",
  "webpack",
  "babel",
  "graphql",
  "rest api",
  "json",
  "xml",
  "oauth",
  "jwt",
  "websockets",
  "pwa",
  "typescript",
  "next.js",
  "nuxt.js",
  "svelte",
  "remix",
  "astro",
  "electron",
  "three.js",
  "webgl",
  "vite",
  "nestjs",
  "redis",
  "mongodb",
  "postgresql",
  "firebase",
  "figma",

  // Databases
  "mysql",
  "postgresql",
  "mongodb",
  "sqlite",
  "oracle",
  "sql server",
  "redis",
  "elasticsearch",
  "firebase",
  "dynamodb",
  "cassandra",
  "neo4j",
  "mariadb",
  "ibm db2",
  "amazon aurora",
  "couchdb",
  "raven db",
  "influxdb",
  "timescaledb",
  "prometheus",
  "graphite",
  "google spanner",
  "cockroachdb",
  "tidb",
  "nuodb",
  "voltdb",
  "arangodb",
  "janusgraph",
  "orientdb",
  "allegrograph",
  "clickhouse",
  "amazon redshift",
  "google bigquery",
  "apache hbase",
  "scylladb",
  "hazelcast",
  "apache ignite",
  "foundationdb",
  "couchbase",
  "leveldb",
  "berkeley db",
  "h2",
  "db4o",
  "objectdb",
  "bigchaindb",
  "hyperledger fabric",
  "chainlink",
  "supabase",

  // DevOps & Cloud
  "aws",
  "azure",
  "gcp",
  "docker",
  "kubernetes",
  "jenkins",
  "gitlab ci",
  "github actions",
  "terraform",
  "ansible",
  "puppet",
  "chef",
  "prometheus",
  "grafana",
  "nginx",
  "apache",
  "linux",
  "unix",
  "windows server",
  "ci/cd",
  "serverless",
  "microservices",
  "containers",
  "load balancing",
  "dns",
  "ssl",
  "firewall",

  // Data Science & AI
  "data science",
  "ai",
  "machine learning",
  "deep learning",
  "nlp",
  "computer vision",
  "tensorflow",
  "pytorch",
  "keras",
  "scikit-learn",
  "pandas",
  "numpy",
  "data analysis",
  "data visualization",
  "tableau",
  "power bi",
  "statistics",
  "big data",
  "hadoop",
  "spark",
  "data mining",

  // Mobile Development
  "android",
  "ios",
  "react native",
  "flutter",
  "xamarin",
  "swift",
  "objective-c",
  "mobile app development",
  "pwa",

  // Project Management & Methodologies
  "agile",
  "scrum",
  "kanban",
  "waterfall",
  "jira",
  "trello",
  "asana",
  "project management",
  "product management",
  "sdlc",
  "tdd",
  "bdd",

  // Design
  "ui",
  "ux",
  "user interface",
  "user experience",
  "figma",
  "sketch",
  "adobe xd",
  "photoshop",
  "illustrator",
  "indesign",
  "responsive design",
  "wireframing",
  "prototyping",

  // Other Technical Skills
  "git",
  "github",
  "gitlab",
  "bitbucket",
  "svn",
  "testing",
  "unit testing",
  "integration testing",
  "qa",
  "security",
  "seo",
  "accessibility",
  "performance optimization",
  "debugging",
  "blockchain",
  "iot",
  "ar/vr",
  "game development",
  "unity",
  "unreal engine",
  "computer science",
  "algorithms",
  "data structures",
  "design patterns",
  "object-oriented programming",
  "functional programming",
  "database design",
  "restful api",
  "api design",
  "API",
  "APIs",
  "REST",
  "web services",
  "networking",
  "http",
  "artificial intelligence",
  "generative ai",
  "generative artificial intelligence",
  "machine learning",
  "deep learning",
  "neural networks",
  "reinforcement learning",
  "supervised learning",
  "unsupervised learning",
  "computer vision",
  "natural language processing",
  "big data",
  "data mining",
  "data analysis",
  "R",
  "Python",
  "SQL",
  "NoSQL",
  "Scala",

  "data visualization",
  "statistics",
  "engineering",
  "applied mathematics",
  "physics",
  "mobile development",
  "web development",
  "backend development",
  "frontend development",
  "full-stack development",
  "software development",
  "software engineering",
  "software architecture",

  "devops",
  "cloud computing",
  "cybersecurity",
  "information security",
  "network security",
  "penetration testing",
  "ethical hacking",
  "incident response",
  "risk management",
  "compliance",
  "security operations",
  "security architecture",
  "security engineering",
  "security analysis",
  "security assessment",
  "security auditing",
  "security consulting",
  "security awareness",
  "security policies",
  "security procedures",
  "security standards",
  "security controls",
  "security frameworks",
  "security protocols",
  "security technologies",
  "security threats",
  "security vulnerabilities",
  "security incidents",
  "security breaches",
  "security best practices",
  "security trends",
  "security news",
  "security research",
];

const tokenizer = new natural.WordTokenizer();

const extractJobSkills = (jobDescription) => {
  const jobDescriptionTokens = tokenizer.tokenize(jobDescription.toLowerCase());
  const jobSkills = jobDescriptionTokens.filter((token) =>
    skill_list.includes(token)
  );
  return [...new Set(jobSkills)];
};

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { jobDescription } = req.body;
      const jobSkills = extractJobSkills(jobDescription);
      res.status(200).json({ jobSkills });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Something went wrong" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
