import spacy
from spacy.matcher import PhraseMatcher
from flask import Flask, request, jsonify
from flask_cors import CORS
from rapidfuzz import fuzz, process
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()


skill_list = [
    # Programming Languages
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

  # Web Development
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

  # Databases
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

  # DevOps & Cloud
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

  # Data Science & AI
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

  # Mobile Development
  "android",
  "ios",
  "react native",
  "flutter",
  "xamarin",
  "swift",
  "objective-c",
  "mobile app development",
  "pwa",

  # Project Management & Methodologies
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

  # Design
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

  
  # Other Technical Skills
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
  "APIs"  ,
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
]

soft_skill_list = ["analytical", 
                   "collaborative",
                   "communication",
                   "teamwork",
  "leadership",
  "problem solving",
  "critical thinking",
  "time management",
  "creativity",
  "adaptability",
  "collaboration",
  "presentation",
  "effective communication",
  "collaboration",
  "teamwork",
  "team player",
  "adaptability",
  "flexibility",
  "adaptible",
  "flexible",
  "communication skills",
  "interpersonal skills",
  "problem solving",
  "analytical skills",
  "problem solver",
  "critical thinking",
  "problem-solving",
  "decision-making",
  "creativity",
  "innovation",
  "time management",
  "work ethic",
  "responsible",
  "resilience",
  "resilient",
  "attention to detail",
  "professionalism",
  "professional",
  "self-motivation",
  "self-starter",
  "self-motivated",
  "willingness to learn",
  "willing to learn",
  "open-mindedness",
  "open-minded",
  "empathy"]

nlp = spacy.load("en_core_web_sm")
matcher = PhraseMatcher(nlp.vocab, attr="LOWER")
patterns = [nlp(skill) for skill in skill_list]
matcher.add("SKILLS", patterns)


# Extract skills function
def extract_skills(text):
    doc = nlp(text)
    matches = matcher(doc)
    extracted_skills = set([doc[start:end].text for match_id, start, end in matches])
    return list(extracted_skills)

# Pydantic models for request bodies
class ExtractSkillsRequest(BaseModel):
    jobDescription: str

class ExtractCvSkillsRequest(BaseModel):
    cv: str

class GetMatchesRequest(BaseModel):
    jobDescriptionSkills: list
    cvSkills: list

# API endpoint to extract job skills
@app.post("/api/extract_job_skills")
async def get_job_skills(request: ExtractSkillsRequest):
    jobDescription = request.jobDescription
    skills = extract_skills(jobDescription)
    return {"skills": skills}

# API endpoint to extract CV skills
@app.post("/api/extract_cv_skills")
async def get_cv_skills(request: ExtractCvSkillsRequest):
    cv = request.cv
    skills = extract_skills(cv)
    return {"skills": skills}

# Fuzzy matching function for skills
def fuzzy_match_skills(cv_skills, job_skills, threshold=80):
    matched = []
    unmatched = []

    for job_skill in job_skills:
        best_match, score, _ = process.extractOne(job_skill, cv_skills, scorer=fuzz.ratio) or ("", 0)

        if score >= threshold:
            matched.append((job_skill, best_match, score))
        else:
            unmatched.append(job_skill)

    return matched, unmatched

# API endpoint to get matches between job skills and CV skills
@app.post("/api/get-matches")
async def get_matches(request: GetMatchesRequest):
    job_skills = set(request.jobDescriptionSkills)  # Convert to set
    cv_skills = set(request.cvSkills)  # Convert to set

    matched, unmatched = fuzzy_match_skills(cv_skills, job_skills, threshold=80)

    # Calculate match percentage (based only on job skills)
    match_percentage = (len(matched) / len(job_skills) * 100) if job_skills else 0

    return {
        "matchPercentage": round(match_percentage, 2),
        "matchedSkills": matched,
        "unmatchedSkills": unmatched
    }

# For local development, run the Uvicorn app (for production, handled by Vercel)
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)