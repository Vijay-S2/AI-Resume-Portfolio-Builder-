import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the API with an environment variable.
// Users must create a .env file with VITE_GEMINI_API_KEY=their_key
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = API_KEY ? new GoogleGenerativeAI(API_KEY) : null;

export const tailorResumeContent = async (formData) => {
  if (!genAI) {
    console.warn("No Gemini API key found. Using advanced mock data.");
    return mockTailorContent(formData);
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
      You are an expert Resume Writer and Career Coach. 
      I will provide you with a user's raw input for their resume.
      Please rewrite their "Professional Summary" and format their "Skills" to be highly professional, impactful, and optimized for Applicant Tracking Systems (ATS).

      User Info:
      Name: ${formData.name}
      Desired Role: ${formData.role}
      Raw Summary: ${formData.summary}
      Raw Skills: ${formData.skills}
      Experience: ${formData.experience || 'Not provided'}

      Return a JSON string with EXACTLY this structure (no markdown, no code blocks, just raw JSON):
      {
        "enhancedSummary": "The rewritten, impactful summary (3-4 sentences max).",
        "enhancedSkills": ["Skill 1", "Skill 2", "Skill 3"]
      }
    `;

    const result = await model.generateContent(prompt);
    const text = result.response.text();
    
    // Safely parse JSON from the response (removing any markdown formatting if present)
    const jsonString = text.replace(/```json\n?|\n?```/g, '').trim();
    const parsedData = JSON.parse(jsonString);
    
    return parsedData;

  } catch (error) {
    console.error("Error generating AI content:", error);
    throw new Error("Failed to tailor content with AI.", { cause: error });
  }
};

// Fallback mock function if no API key is present
const mockTailorContent = async (formData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        enhancedSummary: `A highly motivated and results-driven ${formData.role || 'professional'} with a proven track record of delivering innovative solutions. ${formData.summary} Adept at collaborating with cross-functional teams to drive project success and exceed organizational goals. Demonstrates a strong commitment to continuous learning and technical excellence.`,
        enhancedSkills: formData.skills ? formData.skills.split(',').map(s => s.trim()) : ['Strategic Planning', 'Problem Solving', 'Leadership']
      });
    }, 1500);
  });
};

export const parseResumeData = async (rawText) => {
  if (!genAI) {
    console.warn("No Gemini API key found. Using mock parsing.");
    return mockParseResumeData(rawText);
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
      You are an expert Resume Parser.
      I will provide you with a raw, unstructured text dump of a resume.
      Extract the information and structure it into EXACTLY this JSON format (no markdown):
      {
        "name": "Full Name",
        "email": "Email Address",
        "phone": "Phone Number",
        "location": "City, State",
        "role": "Current or Target Job Title",
        "summary": "Professional summary paragraph",
        "experience": "Company - Role\\nDates\\n• Bullet point 1\\n• Bullet point 2",
        "education": "Degree\\nUniversity | Dates",
        "skills": "Comma, separated, skills",
        "projects": "Project Name : Description"
      }

      Raw Text:
      ${rawText}
    `;

    const result = await model.generateContent(prompt);
    const text = result.response.text();
    
    const jsonString = text.replace(/```json\n?|\n?```/g, '').trim();
    return JSON.parse(jsonString);
  } catch (error) {
    console.error("Error parsing resume:", error);
    throw new Error("Failed to parse resume.", { cause: error });
  }
};

const mockParseResumeData = async (rawText) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        name: 'Jane Doe (Parsed)',
        email: 'jane.parsed@example.com',
        phone: '+1 (555) 000-1234',
        location: 'New York, NY',
        role: 'Parsed Software Engineer',
        summary: 'This summary was intelligently extracted from the raw text you pasted. ' + rawText.substring(0, 50) + '...',
        experience: 'Parsed Corp - Developer\nJan 2020 - Present\n• Extracted bullet point 1\n• Extracted bullet point 2',
        education: 'B.S. Computer Science\nTech University | 2015 - 2019',
        skills: 'Parsed Skill 1, Extracted Skill 2, Magic AI Skill',
        projects: 'AI Parser : Automatically extracted from messy text.'
      });
    }, 2000);
  });
};
