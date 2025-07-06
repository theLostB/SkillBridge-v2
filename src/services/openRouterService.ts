
import { FormData } from "@/components/MultiStepForm";

const API_KEY = "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";
const MODEL = "deepseek/deepseek-chat-v3-0324:free";
const API_ENDPOINT = "https://openrouter.ai/api/v1/chat/completions";

export const generateRoadmap = async (formData: FormData): Promise<string> => {
  const prompt = `You are a career counselor and learning expert. Based on the following information, create a comprehensive, personalized career and learning roadmap. Return ONLY the roadmap content in markdown format, no additional text or explanations.

User Information:
- Age: ${formData.age}
- Education: ${formData.education}
- Interests: ${formData.interests}
- Current Skills: ${formData.currentSkills}
- Career Goals: ${formData.goals}
- Time Availability: ${formData.timeAvailability} per week
- Learning Style: ${formData.preferredLearningStyle}
- Budget: ${formData.budget}

Create a detailed roadmap that includes:
1. Career path analysis and recommendations
2. Skill gaps to address
3. Month-by-month learning plan (6-12 months)
4. Specific resources, courses, and tools
5. Milestones and checkpoints
6. Portfolio/project recommendations
7. Networking and community suggestions
8. Job search strategy (if applicable)

Format the response in clean markdown with proper headers, bullet points, and structure. Make it actionable and specific to their situation.`;

  console.log("Starting roadmap generation...");
  console.log("Form data:", formData);
  
  try {
    console.log("Sending request to OpenRouter API...");
    
    const response = await fetch(API_ENDPOINT, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": window.location.origin,
        "X-Title": "SkillBridge"
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 4000
      })
    });

    console.log("Response status:", response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error("API Error:", response.status, errorText);
      throw new Error(`API request failed: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log("API Response received:", data);

    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      console.error("Invalid response format:", data);
      throw new Error("Invalid response format from API");
    }

    const roadmapContent = data.choices[0].message.content;
    console.log("Roadmap generated successfully, length:", roadmapContent.length);
    
    return roadmapContent;
  } catch (error) {
    console.error("Error generating roadmap:", error);
    if (error instanceof Error) {
      throw new Error(`Failed to generate roadmap: ${error.message}`);
    }
    throw new Error("Failed to generate roadmap. Please try again.");
  }
};
